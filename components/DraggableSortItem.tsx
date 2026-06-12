import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SortItItemImage } from "@/components/SortItItemImage";
import { tapFeedback } from "@/features/haptics";
import type { SortItItem } from "@/types/sortIt";

type DropPayload = {
  item: SortItItem;
  dropX: number;
  dropY: number;
};

type Props = {
  item: SortItItem;
  x: number;
  y: number;
  size: number;
  disabled: boolean;
  resetCount: number;
  shakeKey: number;
  onDrop: (payload: DropPayload) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export const DraggableSortItem = ({
  item,
  x,
  y,
  size,
  disabled,
  resetCount,
  shakeKey,
  onDrop,
  onDragStart,
  onDragEnd,
}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const dragging = useSharedValue(false);

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
  }, [item.id, scale, translateX, translateY]);

  useEffect(() => {
    if (resetCount === 0) return;
    translateX.value = withSpring(0, { damping: 12, stiffness: 220 });
    translateY.value = withSpring(0, { damping: 12, stiffness: 220 });
    scale.value = withSpring(1);
  }, [resetCount, scale, translateX, translateY]);

  useEffect(() => {
    if (shakeKey === 0) return;
    translateX.value = withSequence(
      withTiming(-10, { duration: 45 }),
      withTiming(10, { duration: 45 }),
      withTiming(-8, { duration: 45 }),
      withTiming(8, { duration: 45 }),
      withTiming(0, { duration: 45 })
    );
  }, [shakeKey, translateX]);

  const finishDrop = (dropX: number, dropY: number) => {
    onDrop({ item, dropX, dropY });
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onBegin(() => {
      dragging.value = true;
      scale.value = withSpring(1.08, { damping: 12, stiffness: 320 });
      runOnJS(tapFeedback)();
      if (onDragStart) runOnJS(onDragStart)();
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      dragging.value = false;
      scale.value = withSpring(1);
      const dropX = x + translateX.value;
      const dropY = y + translateY.value;
      runOnJS(finishDrop)(dropX, dropY);
      if (onDragEnd) runOnJS(onDragEnd)();
    })
    .onFinalize(() => {
      dragging.value = false;
      if (onDragEnd) runOnJS(onDragEnd)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: dragging.value ? 50 : 1,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.item,
          { left: x, top: y, width: size, height: size },
          animatedStyle,
        ]}
      >
        <SortItItemImage source={item.imageUrl} size={size} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  item: {
    position: "absolute",
  },
});
