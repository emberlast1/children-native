import { Image } from "expo-image";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { speak } from "@/features/speak";
import { tapFeedback } from "@/features/haptics";
import type { VocabularyItem as VocabularyItemType } from "@/types/vocabulary";
import { getTileSize } from "@/theme/layout";
import { iconInnerSize } from "@/theme/iconFrame";

type Props = {
  item: VocabularyItemType;
  active: string | null;
  setActive: (value: string | null) => void;
  imageScale?: number;
};

export const VocabularyItem = ({
  item,
  active,
  setActive,
  imageScale: screenImageScale,
}: Props) => {
  const { width } = useWindowDimensions();
  const size = getTileSize(width);
  const imageSize = iconInnerSize(size);
  const isActive = active === item.name;
  const imageScale = item.imageScale ?? screenImageScale ?? 1;

  const handlePress = () => {
    tapFeedback();
    speak(item.name, () => setActive(item.name), () => setActive(null));
  };

  return (
    <AnimatedTile
      style={styles.container}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      accessibilityState={{ selected: isActive }}
    >
      <IconFrame size={size}>
        <Image
          source={item.imageUrl}
          style={{
            width: imageSize * imageScale,
            height: imageSize * imageScale,
          }}
          contentFit="contain"
        />
      </IconFrame>
      <AppText weight="semiBold" style={styles.name}>{item.name}</AppText>
    </AnimatedTile>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    alignItems: "center",
  },
  name: {
    marginTop: 10,
    fontSize: 20,
  },
});
