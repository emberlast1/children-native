import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { AppText } from "@/components/AppText";
import { IconFrame } from "@/components/IconFrame";
import { generateExample } from "@/utils/generateExample";
import { tapFeedback, errorFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import { GameAnswerButton, gameAnswerOptionsStyle } from "./GameAnswerButton";
import { getContentMaxWidth, scaleFont } from "@/theme/responsive";
import { gameScreenStyles } from "@/theme/gameScreen";
import { getTilePalette } from "@/theme/tilePalette";
import { ScreenLayout } from "./ScreenLayout";

const getMathPrompt = (a: number, b: number, operator: "plus" | "minus") => {
  const operatorWord = operator === "plus" ? "plus" : "minus";
  return `${a} ${operatorWord} ${b}`;
};

type QuestionChipProps = {
  label: string;
  colorIndex: number;
  size: number;
  fontScale?: number;
};

const MathQuestionChip = ({
  label,
  colorIndex,
  size,
  fontScale = 0.34,
}: QuestionChipProps) => {
  const palette = getTilePalette(colorIndex);

  return (
    <IconFrame
      size={size}
      backgroundColor={palette.background}
      borderWidth={3}
      borderColor={palette.border}
    >
      <AppText
        weight="bold"
        style={[
          styles.chipText,
          { color: palette.text, fontSize: Math.round(size * fontScale) },
        ]}
      >
        {label}
      </AppText>
    </IconFrame>
  );
};

export const MathGameScreen = () => {
  const { width } = useWindowDimensions();
  const [task, setTask] = useState(() => generateExample());
  const { triggerCelebration, celebrationOverlay } = useCelebration();
  const chipSize = scaleFont(width, 84, 96);
  const answerSize = scaleFont(width, 104, 112);

  const nextTask = useCallback(() => {
    setTask(generateExample());
  }, []);

  useEffect(() => {
    speak(getMathPrompt(task.a, task.b, task.operator));
  }, [task]);

  const handleAnswer = (option: number) => {
    tapFeedback();
    if (option === task.correct) {
      triggerCelebration();
      speak("Correct", undefined, () => {
        setTimeout(nextTask, 400);
      });
      return;
    }
    errorFeedback();
    speak("Try again");
  };

  const operatorSymbol = task.operator === "plus" ? "+" : "−";

  return (
    <ScreenLayout
      theme="math"
      scrollable={false}
      centerChildren
      contentStyle={gameScreenStyles.layout}
    >
      <View style={[gameScreenStyles.game, { maxWidth: getContentMaxWidth(width) }]}>
        <View style={styles.questionRow} accessibilityLabel="Math question">
          <MathQuestionChip label={String(task.a)} colorIndex={0} size={chipSize} />
          <MathQuestionChip
            label={operatorSymbol}
            colorIndex={1}
            size={chipSize}
            fontScale={0.3}
          />
          <MathQuestionChip label={String(task.b)} colorIndex={2} size={chipSize} />
          <MathQuestionChip label="=" colorIndex={3} size={chipSize} fontScale={0.3} />
          <MathQuestionChip label="?" colorIndex={4} size={chipSize} />
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
  questionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    gap: 10,
  },
  chipText: {
    textAlign: "center",
  },
});
