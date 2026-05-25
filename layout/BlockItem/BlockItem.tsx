import React from "react";
import { Pressable, Image, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { speak } from "../../features/speak";
import { Animal } from "@/types/animal";

type Props = {
  item: Animal,
  active: string | null,
  setActive: (arg0: string | null) => void,
}

const screenWidth = Dimensions.get("window").width;

export const BlockItem: React.FC<Props> = ({ item, active, setActive }) => {
  const translateY = useSharedValue(0);

  const handlePress = () => {
    translateY.value = withSequence(
      withTiming(-10, { duration: 150 }),
      withTiming(0, { duration: 150 })
    );

    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: active === item.name ? 0.6 : 1,
  }));

  const size = screenWidth <= 429 ? screenWidth * 0.4 : 180;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable onPress={handlePress} style={styles.block}>
        <Image source={item.imageUrl} style={[styles.img, { width: size, height: size }]} />
        <Text style={styles.name}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    alignItems: "center",
  },

  block: {
    alignItems: "center",
  },

  img: {
    borderWidth: 2,
    borderColor: "#D95F70",
    borderRadius: 999,
  },

  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F28190",
    fontFamily: "serif",
  },
});

