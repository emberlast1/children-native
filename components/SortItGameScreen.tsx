import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { AppText } from "@/components/AppText";
import { DraggableSortItem } from "@/components/DraggableSortItem";
import { ScreenLayout } from "@/components/ScreenLayout";
import { SortBasketZone } from "@/components/SortBasketZone";
import { errorFeedback, successFeedback, tapFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import type { SortCategory, SortItItem } from "@/types/sortIt";
import { computeSortItLayout } from "@/utils/computeSortItLayout";
import {
  findBasketAtPoint,
  generateSortItRound,
  getSortItPrompt,
} from "@/utils/generateSortItRound";

const EMPTY_SORTED: Record<SortCategory, SortItItem[]> = {
  fruits: [],
  vegetables: [],
  animals: [],
};

export const SortItGameScreen = () => {
  const { width } = useWindowDimensions();
  const layout = useMemo(() => computeSortItLayout(width), [width]);
  const [round, setRound] = useState(() => generateSortItRound());
  const [pendingIds, setPendingIds] = useState<Set<string>>(
    () => new Set(round.items.map((item) => item.id))
  );
  const [sortedItems, setSortedItems] =
    useState<Record<SortCategory, SortItItem[]>>(EMPTY_SORTED);
  const [resetCounts, setResetCounts] = useState<Record<string, number>>({});
  const [shakeKeys, setShakeKeys] = useState<Record<string, number>>({});
  const { triggerCelebration, celebrationOverlay } = useCelebration();
  const nextRoundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startNewRound = useCallback(() => {
    const nextRound = generateSortItRound();
    setRound(nextRound);
    setPendingIds(new Set(nextRound.items.map((item) => item.id)));
    setSortedItems(EMPTY_SORTED);
    setResetCounts({});
    setShakeKeys({});
  }, []);

  useEffect(() => {
    speak(getSortItPrompt());
  }, [round]);

  useEffect(
    () => () => {
      if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
    },
    []
  );

  const pendingItems = useMemo(
    () => round.items.filter((item) => pendingIds.has(item.id)),
    [pendingIds, round.items]
  );

  const handleBoardComplete = useCallback(() => {
    triggerCelebration();
    speak("Great job", undefined, () => {
      if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
      nextRoundTimerRef.current = setTimeout(startNewRound, 550);
    });
  }, [startNewRound, triggerCelebration]);

  const handleDrop = useCallback(
    ({ item, dropX, dropY }: { item: SortItItem; dropX: number; dropY: number }) => {
      const basketId = findBasketAtPoint(
        dropX,
        dropY,
        layout.itemSize,
        layout.baskets
      );

      if (!basketId) {
        errorFeedback();
        speak("Try again");
        setResetCounts((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] ?? 0) + 1,
        }));
        return;
      }

      if (basketId !== item.category) {
        errorFeedback();
        speak("Try again");
        setShakeKeys((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] ?? 0) + 1,
        }));
        setResetCounts((prev) => ({
          ...prev,
          [item.id]: (prev[item.id] ?? 0) + 1,
        }));
        return;
      }

      successFeedback();
      speak(item.name);

      const willComplete = pendingIds.size === 1;

      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });

      setSortedItems((prev) => ({
        ...prev,
        [basketId]: [...prev[basketId], item],
      }));

      if (willComplete) {
        handleBoardComplete();
      }
    },
    [handleBoardComplete, layout.baskets, layout.itemSize, pendingIds.size]
  );

  const playfieldHeight = layout.getItemPosition(5).y + layout.itemSize + 24;

  return (
    <ScreenLayout theme="sort" scrollable={false} contentStyle={styles.layout}>
      <View
        style={[
          styles.playfield,
          { height: playfieldHeight, width: layout.boardWidth },
        ]}
      >
        {pendingItems.map((item) => {
          const position = layout.getItemPosition(item.slotIndex);

          return (
            <DraggableSortItem
              key={item.id}
              item={item}
              x={position.x}
              y={position.y}
              size={layout.itemSize}
              disabled={false}
              resetCount={resetCounts[item.id] ?? 0}
              shakeKey={shakeKeys[item.id] ?? 0}
              onDrop={handleDrop}
              onDragStart={tapFeedback}
            />
          );
        })}

        {layout.baskets.map((basket) => (
          <SortBasketZone
            key={basket.id}
            basket={basket}
            sortedItems={sortedItems[basket.id]}
            itemSize={layout.itemSize}
          />
        ))}
      </View>

      <AppText weight="semiBold" style={styles.progress}>
        {round.items.length - pendingIds.size} / {round.items.length}
      </AppText>

      {celebrationOverlay}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingBottom: 16,
  },
  playfield: {
    width: "100%",
    maxWidth: "100%",
    position: "relative",
    alignSelf: "center",
  },
  progress: {
    marginTop: 12,
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
  },
});
