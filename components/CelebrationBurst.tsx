import React, { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const PARTICLES = ["⭐", "✨", "🌟", "💫", "🎈", "🎊"];
const BUBBLE_COLORS = ["#FFD93D", "#FF6B6B", "#6BCB77", "#4D96FF", "#FF922B", "#C77DFF"];

type Depth = 0 | 1 | 2;

type ParallaxItem = {
  id: number;
  depth: Depth;
  kind: "emoji" | "bubble";
  startX: number;
  startY: number;
  driftX: number;
  liftY: number;
  delay: number;
  size: number;
  emoji?: string;
  color?: string;
};

const DEPTH = {
  0: { speed: 0.55, opacity: 0.45 },
  1: { speed: 0.8, opacity: 0.65 },
  2: { speed: 1, opacity: 0.9 },
} as const;

const buildItems = (): ParallaxItem[] =>
  Array.from({ length: 18 }, (_, index) => {
    const depth = (index % 3) as Depth;
    const kind = index % 2 === 0 ? "emoji" : "bubble";

    return {
      id: index,
      depth,
      kind,
      startX: (index / 18) * SCREEN_W * 0.9 + SCREEN_W * 0.05,
      startY: SCREEN_H * 0.35 + (index % 5) * 36,
      driftX: (index % 2 === 0 ? 1 : -1) * (40 + (index % 4) * 22),
      liftY: 120 + (index % 6) * 28,
      delay: index * 40,
      size: kind === "emoji" ? 22 + depth * 8 : 28 + depth * 14,
      emoji: PARTICLES[index % PARTICLES.length],
      color: BUBBLE_COLORS[index % BUBBLE_COLORS.length],
    };
  });

type ParallaxPieceProps = {
  item: ParallaxItem;
  visible: boolean;
};

const ParallaxPiece = ({ item, visible }: ParallaxPieceProps) => {
  const progress = useSharedValue(0);
  const depth = DEPTH[item.depth];

  useEffect(() => {
    progress.value = 0;
    if (!visible) return;

    progress.value = withDelay(
      item.delay,
      withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) })
    );
  }, [item.delay, progress, visible]);

  const style = useAnimatedStyle(() => {
    const travel = progress.value * depth.speed;
    return {
      opacity: depth.opacity * (1 - progress.value * 0.85),
      transform: [
        { translateX: item.driftX * travel },
        { translateY: -item.liftY * travel },
        { scale: (0.7 + item.depth * 0.15) * (1 + travel * 0.25) },
        { rotate: `${travel * (item.id % 2 === 0 ? 40 : -40)}deg` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          left: item.startX,
          top: item.startY,
        },
        style,
      ]}
    >
      {item.kind === "emoji" ? (
        <Text style={{ fontSize: item.size }}>{item.emoji}</Text>
      ) : (
        <View
          style={[
            styles.bubble,
            {
              width: item.size,
              height: item.size,
              borderRadius: item.size / 2,
              backgroundColor: item.color,
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

type Props = {
  visible: boolean;
  onComplete?: () => void;
};

export const CelebrationBurst = ({ visible, onComplete }: Props) => {
  const items = useMemo(() => buildItems(), []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onComplete?.(), 1300);
    return () => clearTimeout(timer);
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      {items.map((item) => (
        <ParallaxPiece key={item.id} item={item} visible={visible} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    overflow: "visible",
  },
  piece: {
    position: "absolute",
  },
  bubble: {
    opacity: 0.85,
  },
});
