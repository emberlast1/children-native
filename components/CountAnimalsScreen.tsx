import { Image } from "expo-image";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { IconFrame } from "@/components/IconFrame";
import { generateCountTask } from "@/utils/generateCountTask";
import { tapFeedback, errorFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import { getTileSize } from "@/theme/layout";
import { gameScreenStyles } from "@/theme/gameScreen";
import { getTilePalette } from "@/theme/tilePalette";
import { getContentMaxWidth, isTabletWidth, scaleFont } from "@/theme/responsive";
import { GameAnswerButton, gameAnswerOptionsStyle } from "./GameAnswerButton";
import { ScreenLayout } from "./ScreenLayout";

const getCountPrompt = (count: number, name: string, plural: string) => {
  const label = count === 1 ? name : plural;
  return `How many ${label.toLowerCase()}?`;
};

export const CountAnimalsScreen = () => {
  const { width } = useWindowDimensions();
  const [task, setTask] = useState(() => generateCountTask());
  const { triggerCelebration, celebrationOverlay } = useCelebration();
  const maxAnimal = isTabletWidth(width) ? 120 : 96;
  const tileSize = Math.min(getTileSize(width) * 0.58, maxAnimal);
  const answerSize = scaleFont(width, 104, 112);

  const nextTask = useCallback(() => {
    setTask(generateCountTask());
  }, []);

  useEffect(() => {
    speak(getCountPrompt(task.count, task.animal.name, task.animal.plural));
  }, [task]);

  const handleAnswer = (option: number) => {
    tapFeedback();
    if (option === task.count) {
      triggerCelebration();
      speak("Correct", undefined, () => {
        setTimeout(nextTask, 400);
      });
      return;
    }
    errorFeedback();
    speak("Try again");
  };

  return (
    <ScreenLayout
      theme="count"
      scrollable={false}
      centerChildren
      contentStyle={gameScreenStyles.layout}
    >
      <View style={[gameScreenStyles.game, { maxWidth: getContentMaxWidth(width) }]}>
        <View style={styles.animalsRow}>
          {Array.from({ length: task.count }).map((_, index) => {
            const palette = getTilePalette(index);

            return (
              <IconFrame
                key={`${task.animal.name}-${index}`}
                size={tileSize}
                backgroundColor={palette.background}
                borderColor={palette.border}
                borderWidth={3}
              >
                <Image
                  source={task.animal.imageUrl}
                  style={{ width: tileSize * 0.72, height: tileSize * 0.72 }}
                  contentFit="contain"
                />
              </IconFrame>
            );
          })}
        </View>

        <View style={gameAnswerOptionsStyle}>
          {task.options.map((option, index) => (
            <GameAnswerButton
              key={option}
              value={option}
              colorIndex={index}
              size={answerSize}
              onPress={() => handleAnswer(option)}
            />
          ))}
        </View>
      </View>

      {celebrationOverlay}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  animalsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    marginBottom: 28,
    gap: 8,
  },
});
