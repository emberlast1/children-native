import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/components/AppText";
import { BackButton } from "@/components/BackButton";
import { LetterTracingCanvas } from "@/components/LetterTracingCanvas";
import { NotebookBackground } from "@/components/NotebookBackground";
import { errorFeedback, tapFeedback } from "@/features/haptics";
import { speak } from "@/features/speak";
import { useCelebration } from "@/hooks/useCelebration";
import type { Letter } from "@/types/letter";
import { getLetterCanvasMaxSize } from "@/theme/responsive";
import { getTracingLetter, pickRandomLetter } from "@/utils/pickRandomLetter";

export const LetterTracingScreen = () => {
  const { width } = useWindowDimensions();
  const [letter, setLetter] = useState<Letter>(() => pickRandomLetter());
  const [resetKey, setResetKey] = useState(0);
  const [locked, setLocked] = useState(false);
  const { triggerCelebration, celebrationOverlay } = useCelebration();

  const canvasSize = useMemo(
    () => Math.min(width - 32, getLetterCanvasMaxSize(width)),
    [width]
  );

  const tracingLetter = getTracingLetter(letter);

  useEffect(() => {
    speak(letter.name);
  }, [letter.name]);

  const nextLetter = useCallback(() => {
    setLetter(pickRandomLetter());
    setResetKey((value) => value + 1);
    setLocked(false);
  }, []);

  const handleClear = () => {
    tapFeedback();
    setResetKey((value) => value + 1);
    setLocked(false);
  };

  const handleTraceComplete = useCallback(
    (result: { success: boolean; attempted: boolean }) => {
      if (locked) return;

      if (result.success) {
        setLocked(true);
        triggerCelebration();
        speak("Correct", undefined, () => {
          setTimeout(nextLetter, 700);
        });
        return;
      }

      if (!result.attempted) return;

      errorFeedback();
      speak("Try again");
    },
    [locked, nextLetter, triggerCelebration]
  );

  return (
    <View style={styles.root}>
      <NotebookBackground />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <BackButton />
        </View>
        <View style={styles.content}>
          <LetterTracingCanvas
            letter={tracingLetter}
            canvasSize={canvasSize}
            resetKey={resetKey}
            disabled={locked}
            onTraceComplete={handleTraceComplete}
          />

          <Pressable
            onPress={handleClear}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Clear drawing"
          >
            <AppText weight="semiBold" style={styles.clearText}>
              Clear
            </AppText>
          </Pressable>
        </View>
        {celebrationOverlay}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFDF7",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  clearButton: {
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 2,
    borderColor: "#CBD5E0",
  },
  clearText: {
    fontSize: 18,
    color: "#4A5568",
  },
});
