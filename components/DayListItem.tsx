import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { speak } from "@/features/speak";
import { tapFeedback } from "@/features/haptics";
import type { DayItem } from "@/types/labeledItem";

type Props = {
  item: DayItem;
  active: string | null;
  setActive: (value: string | null) => void;
};

export const DayListItem = ({ item, active, setActive }: Props) => {
  const isActive = active === item.name;
  const label = item.displayName ?? item.name;

  const handlePress = () => {
    tapFeedback();
    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  return (
    <AnimatedTile
      style={styles.wrap}
      contentStyle={[
        styles.pill,
        { backgroundColor: item.colorHash },
        isActive && styles.pillActive,
      ]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      accessibilityState={{ selected: isActive }}
    >
      <AppText weight="semiBold" style={styles.dayName}>
        {label}
      </AppText>

      <Image
        source={item.imageUrl}
        style={styles.icon}
        contentFit="contain"
      />
    </AnimatedTile>
  );
};

const PILL_HEIGHT = 64;

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    maxWidth: 360,
    marginVertical: 7,
  },
  pill: {
    width: "100%",
    minHeight: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    paddingLeft: 28,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#4A5568",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    elevation: 4,
  },
  pillActive: {
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 6,
  },
  dayName: {
    flex: 1,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    paddingRight: 8,
  },
  icon: {
    width: 56,
    height: 56,
  },
});
