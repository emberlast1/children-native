import { Color } from "@/types/color";
import React from "react";
import { Dimensions, Pressable, StyleSheet,} from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { speak } from "../../features/speak";

type Props = {
  item: Color,
  active: string | null,
  setActive: (arg0: string | null) => void,
}

const screenWidth = Dimensions.get("window").width;

export const ColorsItem: React.FC<Props> = ({ item, active, setActive }) => {
  const translateY = useSharedValue(0);

  const handlePress = () => {
    translateY.value = withSequence(
      withTiming(-10, { duration: 150 }),
      withTiming(0, { duration: 150 })
    );

    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  const size = screenWidth <= 429 ? screenWidth * 0.4 : 180;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.colorBlock,
          { width: size, height: size },
          { backgroundColor: item.colorHash },
          active === item.name && styles.playing,
        ]}
      >
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  colorBlock: {
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#D95F70",
  },

  playing: {
    opacity: 0.6,
  },
});

