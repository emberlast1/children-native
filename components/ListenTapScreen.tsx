import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { AppText } from "@/components/AppText";
import { GamePillButton } from "@/components/GamePillButton";
import { ListenTapOption } from "@/components/ListenTapOption";
import { ScreenLayout } from "@/components/ScreenLayout";
import { errorFeedback, successFeedback, tapFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import type { ListenTapOption as ListenTapOptionType } from "@/types/listenTap";
import { gameScreenStyles } from "@/theme/gameScreen";
import { getGameBoardMaxWidth, getListenTapTileMaxSize } from "@/theme/responsive";
import {
  generateListenTapRound,
  isCorrectListenTapAnswer,
} from "@/utils/generateListenTapRound";

const COLUMNS = 2;
const OPTION_COUNT = 4;
const TILE_GAP = 22;

export const ListenTapScreen = () => {
  const { width, height } = useWindowDimensions();
  const [round, setRound] = useState(() => generateListenTapRound());
  const [locked, setLocked] = useState(false);
  const [shakeKeys, setShakeKeys] = useState<Record<string, number>>({});
  const { triggerCelebration, celebrationOverlay } = useCelebration();

  const tileSize = useMemo(() => {
    const boardWidth = getGameBoardMaxWidth(width);
    const horizontalPadding = 48;
    const byWidth = Math.floor(
      (boardWidth - horizontalPadding - TILE_GAP * (COLUMNS - 1)) / COLUMNS
    );
    const byHeight = Math.floor((height - 300 - TILE_GAP) / 2);
    const maxSize = getListenTapTileMaxSize(width);

    return Math.max(92, Math.min(byWidth, byHeight, maxSize));
  }, [height, width]);

  const speakPrompt = useCallback((name: string) => {
    speak(name);
  }, []);

  const nextRound = useCallback(() => {
    setRound(generateListenTapRound());
    setShakeKeys({});
    setLocked(false);
  }, []);

  useEffect(() => {
    speakPrompt(round.targetName);
  }, [round, speakPrompt]);

  const handleReplay = () => {
    tapFeedback();
    speakPrompt(round.targetName);
  };

  const handleOptionPress = (option: ListenTapOptionType) => {
    if (locked) return;

    tapFeedback();

    if (isCorrectListenTapAnswer(round, option)) {
      setLocked(true);
      successFeedback();
      triggerCelebration();
      speak("Correct", undefined, () => {
        setTimeout(nextRound, 450);
      });
      return;
    }

    errorFeedback();
    speak("Try again");
    setShakeKeys((prev) => ({
      ...prev,
      [option.id]: (prev[option.id] ?? 0) + 1,
    }));
  };

  return (
    <ScreenLayout
      theme="listen"
      scrollable={false}
      centerChildren
      contentStyle={gameScreenStyles.layout}
    >
      <GamePillButton
        onPress={handleReplay}
        accessibilityLabel="Listen again"
        style={styles.replayButton}
      >
        <AppText weight="bold" style={styles.replayEmoji}>
          🔊
        </AppText>
        <AppText weight="semiBold" style={styles.replayText}>
          Listen again
        </AppText>
      </GamePillButton>

      <View
        style={[
          styles.grid,
          {
            gap: TILE_GAP,
            maxWidth: COLUMNS * tileSize + TILE_GAP * (COLUMNS - 1),
          },
        ]}
      >
        {round.options.slice(0, OPTION_COUNT).map((option) => (
          <ListenTapOption
            key={option.id}
            option={option}
            size={tileSize}
            shakeKey={shakeKeys[option.id] ?? 0}
            disabled={locked}
            onPress={() => handleOptionPress(option)}
          />
        ))}
      </View>

      {celebrationOverlay}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  replayButton: {
    marginBottom: 16,
  },
  replayEmoji: {
    fontSize: 22,
    lineHeight: 26,
  },
  replayText: {
    fontSize: 16,
    color: "#4A5568",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
});
