import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { AppText } from "@/components/AppText";
import { ParentFooterLinks } from "@/components/ParentFooterLinks";
import { ThemedAnimatedBackground } from "@/components/ThemedAnimatedBackground";
import { WELCOME_MESSAGE } from "@/data/welcomeContent";
import { speak } from "@/features/speak";
import { playWelcomeMelody, stopWelcomeMelody } from "@/features/welcomeMelody";
import { colors } from "@/theme/colors";
import { gameScreenStyles } from "@/theme/gameScreen";
import {
  iconFrameShadowStyle,
  iconFrameStrongBorderColor,
  iconFrameStrongBorderWidth,
} from "@/theme/iconFrame";
import { isTabletWidth, scaleFont } from "@/theme/responsive";
import { getThemeBackdropColor } from "@/theme/screenThemes";

const SPEECH_DELAY_MS = 700;
const BUBBLE_RADIUS = 28;

type Props = {
  onComplete: () => void;
};

export const WelcomeScreen = ({ onComplete }: Props) => {
  const { width } = useWindowDimensions();
  const isTablet = isTabletWidth(width);
  const finishedRef = useRef(false);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const bounce = useSharedValue(0);

  onCompleteRef.current = onComplete;

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    stopWelcomeMelody();
    onCompleteRef.current();
  };

  useEffect(() => {
    bounce.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 900, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, [bounce]);

  useEffect(() => {
    let cancelled = false;

    void playWelcomeMelody();

    speechTimerRef.current = setTimeout(() => {
      if (cancelled || finishedRef.current) return;
      speak(WELCOME_MESSAGE, undefined, finish);
    }, SPEECH_DELAY_MS);

    return () => {
      cancelled = true;
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      Speech.stop();
      stopWelcomeMelody();
    };
  }, []);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  const handleSkip = () => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    Speech.stop();
    finish();
  };

  const messageSize = scaleFont(width, 24, 28);
  const bubbleShadow = iconFrameShadowStyle(isTablet ? 140 : 120);

  return (
    <View style={[styles.root, { backgroundColor: getThemeBackdropColor("home") }]}>
      <ThemedAnimatedBackground theme="home" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
        <Pressable
          style={styles.content}
          onPress={handleSkip}
          accessibilityRole="button"
          accessibilityLabel="Skip welcome"
        >
          <Animated.View
            entering={FadeInDown.duration(420).springify()}
            style={[styles.stack, isTablet && styles.stackTablet]}
          >
            <Animated.View style={[styles.mascotWrap, mascotStyle]}>
              <View style={[styles.mascotGlow, bubbleShadow]}>
                <Image
                  source={require("../assets/images/whereIs/boy.png")}
                  style={isTablet ? styles.mascotTablet : styles.mascot}
                  resizeMode="contain"
                  accessibilityLabel="App mascot"
                />
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeIn.delay(180).duration(320)}
              style={[styles.bubbleOuter, bubbleShadow]}
            >
              <View style={styles.bubbleFrame}>
                  {Platform.OS === "web" ? null : (
                    <BlurView
                      intensity={55}
                      tint="light"
                      style={StyleSheet.absoluteFillObject}
                    />
                  )}

                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.42)", "rgba(255, 255, 255, 0)"]}
                    style={[
                      styles.bubbleGloss,
                      {
                        borderTopLeftRadius: BUBBLE_RADIUS,
                        borderTopRightRadius: BUBBLE_RADIUS,
                      },
                    ]}
                    pointerEvents="none"
                  />
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.08)"]}
                    style={[
                      styles.bubbleDepth,
                      {
                        borderBottomLeftRadius: BUBBLE_RADIUS,
                        borderBottomRightRadius: BUBBLE_RADIUS,
                      },
                    ]}
                    pointerEvents="none"
                  />

                  <AppText
                    weight="bold"
                    style={[
                      styles.message,
                      {
                        fontSize: messageSize,
                        lineHeight: messageSize + 8,
                      },
                    ]}
                  >
                    {WELCOME_MESSAGE}
                  </AppText>
              </View>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(320).duration(280)}>
              <AppText weight="semiBold" style={gameScreenStyles.subtitle}>
                Tap anywhere to continue
              </AppText>
            </Animated.View>
          </Animated.View>
        </Pressable>
        <ParentFooterLinks style={styles.parentFooter} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  stack: {
    alignItems: "center",
    maxWidth: 360,
  },
  stackTablet: {
    maxWidth: 480,
  },
  mascotWrap: {
    marginBottom: 28,
  },
  mascotGlow: {
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    width: 220,
    height: 280,
  },
  mascotTablet: {
    width: 280,
    height: 360,
  },
  bubbleOuter: {
    alignSelf: "stretch",
    marginBottom: 12,
  },
  bubbleFrame: {
    overflow: "hidden",
    borderRadius: BUBBLE_RADIUS,
    borderWidth: iconFrameStrongBorderWidth,
    borderColor: iconFrameStrongBorderColor,
    backgroundColor: Platform.select({
      web: "rgba(255, 255, 255, 0.38)",
      default: "rgba(255, 255, 255, 0.14)",
    }),
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  bubbleGloss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "42%",
    zIndex: 1,
  },
  bubbleDepth: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "28%",
    zIndex: 1,
  },
  message: {
    color: colors.primary,
    textAlign: "center",
    zIndex: 2,
  },
  parentFooter: {
    paddingBottom: 8,
  },
});
