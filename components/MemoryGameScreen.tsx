import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { AppText } from "@/components/AppText";
import { MemoryCard } from "@/components/MemoryCard";
import { ScreenLayout } from "@/components/ScreenLayout";
import { errorFeedback, successFeedback, tapFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import type { MemoryCard as MemoryCardType } from "@/types/memory";
import { gameScreenStyles } from "@/theme/gameScreen";
import { getGameBoardMaxWidth, getMemoryCardMaxSize } from "@/theme/responsive";
import { generateMemoryBoard } from "@/utils/generateMemoryBoard";

const PAIR_COUNT = 4;
const COLUMNS = 2;
const ROWS = (PAIR_COUNT * 2) / COLUMNS;
const CARD_GAP = 8;
const CARD_MARGIN = 8;

export const MemoryGameScreen = () => {
  const { width, height } = useWindowDimensions();
  const [board, setBoard] = useState<MemoryCardType[]>(() =>
    generateMemoryBoard(PAIR_COUNT)
  );
  const [faceUpIds, setFaceUpIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [locked, setLocked] = useState(false);
  const { triggerCelebration, celebrationOverlay } = useCelebration();
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cardSize = useMemo(() => {
    const boardWidth = getGameBoardMaxWidth(width);
    const cellGap = CARD_GAP + CARD_MARGIN;
    const byWidth = Math.floor((boardWidth - 28 - CARD_GAP) / COLUMNS - CARD_MARGIN);
    const byHeight = Math.floor(
      (height - 210 - (ROWS - 1) * cellGap) / ROWS - CARD_MARGIN
    );
    const maxSize = getMemoryCardMaxSize(width);

    return Math.max(72, Math.min(byWidth, byHeight, maxSize));
  }, [height, width]);

  const boardWidth = useMemo(
    () => COLUMNS * (cardSize + CARD_MARGIN * 2),
    [cardSize]
  );

  const startNewBoard = useCallback(() => {
    setBoard(generateMemoryBoard(PAIR_COUNT));
    setFaceUpIds([]);
    setMatchedPairIds(new Set());
    setLocked(false);
  }, []);

  useEffect(() => {
    speak("Find the pairs");
  }, [board]);

  const handleBoardComplete = useCallback(() => {
    triggerCelebration();
    speak("Great job", undefined, () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(startNewBoard, 550);
    });
  }, [startNewBoard, triggerCelebration]);

  const handleCardPress = useCallback(
    (cardId: string) => {
      if (locked) return;

      const card = board.find((item) => item.id === cardId);
      if (!card) return;
      if (matchedPairIds.has(card.pairId) || faceUpIds.includes(cardId)) return;

      tapFeedback();
      const nextFaceUp = [...faceUpIds, cardId];
      setFaceUpIds(nextFaceUp);

      if (nextFaceUp.length < 2) return;

      setLocked(true);
      const [first, second] = nextFaceUp.map(
        (id) => board.find((item) => item.id === id)!
      );

      if (first.pairId === second.pairId) {
        successFeedback();
        speak(first.name);

        const nextMatched = new Set(matchedPairIds);
        nextMatched.add(first.pairId);
        setMatchedPairIds(nextMatched);
        setFaceUpIds([]);
        setLocked(false);

        if (nextMatched.size === PAIR_COUNT) {
          handleBoardComplete();
        }
        return;
      }

      errorFeedback();
      setTimeout(() => {
        setFaceUpIds([]);
        setLocked(false);
      }, 850);
    },
    [board, faceUpIds, handleBoardComplete, locked, matchedPairIds]
  );

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  return (
    <ScreenLayout
      theme="memory"
      scrollable={false}
      centerChildren
      contentStyle={gameScreenStyles.layout}
    >
      <View style={[gameScreenStyles.playfield, { width: boardWidth }]}>
        <View style={styles.grid}>
          {board.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              size={cardSize}
              isFaceUp={faceUpIds.includes(card.id)}
              isMatched={matchedPairIds.has(card.pairId)}
              disabled={locked}
              onPress={() => handleCardPress(card.id)}
            />
          ))}
        </View>
      </View>

      <AppText weight="semiBold" style={gameScreenStyles.progress}>
        {matchedPairIds.size} / {PAIR_COUNT}
      </AppText>

      {celebrationOverlay}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
