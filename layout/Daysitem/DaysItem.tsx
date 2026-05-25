import { Color } from "@/types/color";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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

export const DayItem: React.FC<Props> = ({ item, active, setActive }) => {
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
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.dayBlock,
          { backgroundColor: item.colorHash },
          active === item.name && styles.playing,
        ]}
      >
        <Text style={styles.dayName}>{item.name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#B63C89",
  },

  backButton: {
    marginTop: 20,
    width: 40,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },

  daysBlock: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dayBlock: {
    width: 250,
    height: 60,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  dayName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  playing: {
    opacity: 0.6,
  },
});

