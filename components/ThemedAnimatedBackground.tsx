import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useDeviceParallax } from "@/features/useDeviceParallax";
import {
  getScreenTheme,
  getThemeBackdropColor,
  type ScreenThemeKey,
  type ScreenTheme,
} from "@/theme/screenThemes";

type Props = {
  theme: ScreenThemeKey;
};

type BlobProps = {
  blob: ScreenTheme["blobs"][number];
  width: number;
  height: number;
  offsetX: SharedValue<number>;
  offsetY: SharedValue<number>;
};

const FloatingBlob = ({ blob, width, height, offsetX, offsetY }: BlobProps) => {
  const progress = useSharedValue(0);
  const depth = 0.65 + blob.sizeRatio * 0.55;

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 7000 + blob.phase * 900,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );
  }, [blob.phase, progress]);

  const size = width * blob.sizeRatio;
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          interpolate(progress.value, [0, 1], [-18, 18]) + offsetX.value * depth,
      },
      {
        translateY:
          interpolate(progress.value, [0, 1], [14, -14]) + offsetY.value * depth,
      },
      { scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.06, 1]) },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.blob,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: blob.color,
          left: width * blob.leftRatio,
          top: height * blob.topRatio,
        },
        style,
      ]}
    />
  );
};

type ParticleProps = {
  particle: ScreenTheme["particles"][number];
  width: number;
  height: number;
  offsetX: SharedValue<number>;
  offsetY: SharedValue<number>;
};

const FloatingParticle = ({
  particle,
  width,
  height,
  offsetX,
  offsetY,
}: ParticleProps) => {
  const drift = useSharedValue(0);
  const depth = 1.1 + particle.leftRatio * 0.35;

  useEffect(() => {
    drift.value = withDelay(
      particle.delay,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: particle.duration,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      )
    );
  }, [drift, particle.delay, particle.duration]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(drift.value, [0, 0.15, 0.85, 1], [0, 0.55, 0.55, 0]),
    transform: [
      {
        translateY:
          interpolate(drift.value, [0, 1], [0, -height * 0.22]) +
          offsetY.value * depth,
      },
      {
        translateX:
          interpolate(drift.value, [0, 0.5, 1], [0, particle.leftRatio > 0.5 ? -12 : 12, 0]) +
          offsetX.value * depth,
      },
      { rotate: `${interpolate(drift.value, [0, 1], [-8, 8])}deg` },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          left: width * particle.leftRatio,
          top: height * particle.topRatio,
        },
        style,
      ]}
    >
      <Text style={styles.particleText}>{particle.emoji}</Text>
    </Animated.View>
  );
};

export const ThemedAnimatedBackground = ({ theme }: Props) => {
  const { width, height } = useWindowDimensions();
  const config = getScreenTheme(theme);
  const backdropColor = getThemeBackdropColor(theme);
  const { offsetX, offsetY } = useDeviceParallax();

  return (
    <View
      pointerEvents="none"
      style={[styles.backdrop, { backgroundColor: backdropColor }]}
    >
      <LinearGradient
        colors={[...config.gradient]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {config.blobs.map((blob, index) => (
        <FloatingBlob
          key={`blob-${index}`}
          blob={blob}
          width={width}
          height={height}
          offsetX={offsetX}
          offsetY={offsetY}
        />
      ))}
      {config.particles.map((particle, index) => (
        <FloatingParticle
          key={`particle-${index}`}
          particle={particle}
          width={width}
          height={height}
          offsetX={offsetX}
          offsetY={offsetY}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    opacity: 0.32,
  },
  particle: {
    position: "absolute",
  },
  particleText: {
    fontSize: 28,
    lineHeight: 32,
  },
});
