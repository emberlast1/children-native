import { Image } from "expo-image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated as RNAnimated,
  Easing,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing as ReEasing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AppText } from "@/components/AppText";
import { useRouter } from "expo-router";
import { DraggableWhereIsItem } from "@/components/DraggableWhereIsItem";
import { BackButton } from "@/components/BackButton";
import { speak } from "@/features/speak";
import * as Speech from "expo-speech";
import { tapFeedback, errorFeedback } from "@/features/haptics";
import { useCelebration } from "@/hooks/useCelebration";
import {
  generateWhereIsRound,
  getWhereIsPrompt,
  type WhereIsRound,
} from "@/utils/generateWhereIsRound";

const ITEM_COUNT = 6;
const useNativeDriver = Platform.OS !== "web";

const webRootStyle =
  Platform.OS === "web"
    ? ({
        overflow: "hidden",
      } as const)
    : undefined;

export const WhereIsGameScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { triggerCelebration, celebrationOverlay } = useCelebration();

  const [round, setRound] = useState<WhereIsRound | null>(null);
  const [locked, setLocked] = useState(false);
  const [resetCounts, setResetCounts] = useState<Record<string, number>>({});
  const [shakeKeys, setShakeKeys] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState(false);

  const viewportStyle =
    Platform.OS === "web" ? { width, height, overflow: "hidden" as const } : null;
  const isLandscape = width >= height;

  const layoutW = isLandscape ? width : height;
  const layoutH = isLandscape ? height : width;

  const itemSize = round?.itemSize ?? 0;
  const boyWidth = layoutW * 0.22;
  const boyHeight = layoutH * 0.58;
  const beeSize = Math.min(layoutW, layoutH) * 0.11;

  const beeFloat = useRef(new RNAnimated.Value(0)).current;
  const boyJump = useRef(new RNAnimated.Value(0)).current;
  const layoutKeyRef = useRef<string | null>(null);
  const nextRoundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dropZonePulse = useSharedValue(0.35);

  const boyZone = useMemo(
    () => ({
      x: layoutW * 0.02,
      y: layoutH * 0.38,
      width: boyWidth,
      height: boyHeight,
    }),
    [boyWidth, boyHeight, layoutH, layoutW]
  );

  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(beeFloat, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver,
        }),
        RNAnimated.timing(beeFloat, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [beeFloat]);

  useEffect(() => {
    if (!isLandscape) {
      layoutKeyRef.current = null;
      return;
    }

    const layoutKey = `${Math.round(layoutW)}x${Math.round(layoutH)}`;
    if (layoutKeyRef.current === layoutKey) return;

    layoutKeyRef.current = layoutKey;
    setRound(generateWhereIsRound(layoutW, layoutH, ITEM_COUNT));
    setResetCounts({});
    setShakeKeys({});
    setLocked(false);
  }, [layoutW, layoutH, isLandscape]);

  useEffect(() => {
    if (!round) return;
    speak(getWhereIsPrompt(round.targetName));
  }, [round?.targetId]);

  useEffect(() => {
    if (isDragging) {
      dropZonePulse.value = withRepeat(
        withSequence(
          withTiming(0.75, { duration: 700, easing: ReEasing.inOut(ReEasing.sin) }),
          withTiming(0.35, { duration: 700, easing: ReEasing.inOut(ReEasing.sin) })
        ),
        -1,
        true
      );
      return;
    }

    dropZonePulse.value = withTiming(0, { duration: 200 });
  }, [dropZonePulse, isDragging]);

  useEffect(
    () => () => {
      if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
    },
    []
  );

  const dropZoneStyle = useAnimatedStyle(() => ({
    opacity: dropZonePulse.value,
  }));

  const jumpBoy = useCallback(() => {
    boyJump.stopAnimation();
    boyJump.setValue(0);
    RNAnimated.sequence([
      RNAnimated.timing(boyJump, {
        toValue: -32,
        duration: 170,
        easing: Easing.out(Easing.quad),
        useNativeDriver,
      }),
      RNAnimated.spring(boyJump, {
        toValue: 0,
        friction: 4,
        tension: 120,
        useNativeDriver,
      }),
    ]).start();
  }, [boyJump]);

  const replayPrompt = useCallback(() => {
    if (!round || locked) return;
    tapFeedback();
    speak(getWhereIsPrompt(round.targetName));
  }, [locked, round]);

  const isOverBoy = useCallback(
    (localX: number, localY: number) => {
      const centerX = localX + itemSize / 2;
      const centerY = localY + itemSize / 2;
      const padding = 40;

      return (
        centerX >= boyZone.x - padding &&
        centerX <= boyZone.x + boyZone.width + padding &&
        centerY >= boyZone.y - padding &&
        centerY <= boyZone.y + boyZone.height + padding
      );
    },
    [boyZone, itemSize]
  );

  const nextRound = useCallback(() => {
    setLocked(false);
    setResetCounts({});
    setShakeKeys({});
    setRound(generateWhereIsRound(layoutW, layoutH, ITEM_COUNT));
  }, [layoutW, layoutH]);

  const bumpReset = useCallback((itemId: string) => {
    setResetCounts((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? 0) + 1,
    }));
  }, []);

  const bumpShake = useCallback((itemId: string) => {
    setShakeKeys((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? 0) + 1,
    }));
  }, []);

  const handleDrop = ({
    item,
    dropX,
    dropY,
  }: {
    item: { id: string; name: string };
    dropX: number;
    dropY: number;
  }) => {
    if (locked) return;

    if (!isOverBoy(dropX, dropY)) {
      bumpReset(item.id);
      return;
    }

    if (item.id === round?.targetId) {
      setLocked(true);
      jumpBoy();
      triggerCelebration();
      speak("Correct");
      if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
      nextRoundTimerRef.current = setTimeout(nextRound, 1500);
      return;
    }

    setLocked(true);
    errorFeedback();
    bumpShake(item.id);
    bumpReset(item.id);
    speak("Try again", undefined, () => {
      setLocked(false);
    });
  };

  const handleBack = useCallback(() => {
    tapFeedback();
    Speech.stop();
    if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
    router.replace("/");
  }, [router]);

  const beeTranslateY = beeFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -4],
  });

  const targetLabel = round?.targetName.toLowerCase() ?? "";

  if (!isLandscape) {
    return (
      <View style={[styles.rotateScreen, webRootStyle, viewportStyle]}>
        <ImageBackground
          source={require("../assets/images/whereIs/background.png")}
          style={styles.rotateBackground}
          resizeMode="cover"
        >
          <BackButton variant="overlay" style={styles.backButton} onPress={handleBack} />
          <AppText weight="bold" style={styles.rotateTitle}>Where is</AppText>
          <AppText weight="semiBold" style={styles.rotateHint}>
            Turn your device sideways to play
          </AppText>
          {Platform.OS === "web" ? (
            <AppText weight="medium" style={styles.rotateWebHint}>
              Or widen the browser window
            </AppText>
          ) : null}
        </ImageBackground>
      </View>
    );
  }

  if (!round) {
    return <View style={[styles.root, webRootStyle, viewportStyle]} />;
  }

  return (
    <View style={[styles.root, webRootStyle, viewportStyle]}>
      <ImageBackground
        source={require("../assets/images/whereIs/background.png")}
        style={styles.background}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <BackButton variant="overlay" style={styles.backButton} onPress={handleBack} />

        <Pressable
          onPress={replayPrompt}
          style={[styles.questionOverlay, { top: layoutH * 0.04 }]}
          accessibilityRole="button"
          accessibilityLabel={`Where is ${targetLabel}? Tap to hear again.`}
        >
          <View style={styles.questionCard}>
            <View style={styles.beeSlot}>
              <RNAnimated.View
                style={[
                  styles.beeWrap,
                  { transform: [{ translateY: beeTranslateY }] },
                ]}
              >
                <Image
                  source={require("../assets/images/whereIs/bee.png")}
                  style={{ width: beeSize, height: beeSize }}
                  contentFit="contain"
                />
              </RNAnimated.View>
            </View>
            <View style={styles.promptRow}>
              <AppText weight="bold" style={styles.promptLead}>
                Where is
              </AppText>
              <View style={styles.targetBadge}>
                <AppText weight="bold" style={styles.targetText}>
                  {targetLabel}
                </AppText>
              </View>
              <AppText weight="bold" style={styles.promptLead}>
                ?
              </AppText>
            </View>
          </View>
        </Pressable>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.dropZone,
            {
              left: boyZone.x - 16,
              top: boyZone.y - 16,
              width: boyZone.width + 32,
              height: boyZone.height + 32,
              borderRadius: (boyZone.width + 32) / 2,
            },
            dropZoneStyle,
          ]}
        />

        <RNAnimated.View
          style={[
            styles.boyWrap,
            {
              left: boyZone.x,
              top: boyZone.y,
              width: boyWidth,
              height: boyHeight,
              transform: [{ translateY: boyJump }],
            },
          ]}
        >
          <Image
            source={require("../assets/images/whereIs/boy.png")}
            style={styles.boyImage}
            contentFit="contain"
          />
        </RNAnimated.View>

        {round.items.map((item) => (
          <DraggableWhereIsItem
            key={item.id}
            item={item}
            size={itemSize}
            disabled={locked}
            resetCount={resetCounts[item.id] ?? 0}
            shakeKey={shakeKeys[item.id] ?? 0}
            onDrop={handleDrop}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          />
        ))}

        {celebrationOverlay}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#87C55F",
    overflow: "hidden",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  rotateScreen: {
    flex: 1,
    backgroundColor: "#87C55F",
    overflow: "hidden",
  },
  rotateBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  rotateTitle: {
    fontSize: 32,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    marginBottom: 12,
  },
  rotateHint: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  rotateWebHint: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "web" ? 16 : 20,
    left: 16,
    zIndex: 100,
  },
  questionOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
    paddingHorizontal: 72,
  },
  questionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    maxWidth: "100%",
  },
  beeSlot: {
    height: 56,
    justifyContent: "center",
    overflow: "hidden",
  },
  beeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  promptRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    flexShrink: 1,
  },
  promptLead: {
    fontSize: 22,
    color: "#5C4A6A",
    textAlign: "center",
  },
  targetBadge: {
    backgroundColor: "#FFD93D",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "#E6C235",
  },
  targetText: {
    fontSize: 24,
    color: "#5C4A00",
    textTransform: "lowercase",
  },
  dropZone: {
    position: "absolute",
    zIndex: 4,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderStyle: "dashed",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  boyWrap: {
    position: "absolute",
    zIndex: 5,
  },
  boyImage: {
    width: "100%",
    height: "100%",
  },
});
