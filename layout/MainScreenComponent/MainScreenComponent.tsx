import { useRouter, type Href } from "expo-router";
import React from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { tapFeedback } from "@/features/haptics";
import type { MenuItem } from "@/types/menuItem";
import { getTileSize } from "@/theme/layout";
import { iconInnerSize } from "@/theme/iconFrame";

type Props = Pick<MenuItem, "imageUrl" | "nameEng" | "route">;

export const MainScreenComponent = ({ imageUrl, nameEng, route }: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const size = getTileSize(width);
  const imageSize = iconInnerSize(size);

  const handlePress = () => {
    tapFeedback();
    router.push(route as Href);
  };

  return (
    <AnimatedTile
      style={[styles.tile, { width: size }]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={nameEng}
    >
      <IconFrame size={size}>
        <Image
          source={imageUrl}
          style={{ width: imageSize, height: imageSize }}
          resizeMode="contain"
        />
      </IconFrame>
      <AppText weight="bold" style={styles.nameEng}>
        {nameEng}
      </AppText>
    </AnimatedTile>
  );
};

const styles = StyleSheet.create({
  tile: {
    margin: 8,
    alignItems: "center",
  },
  nameEng: {
    fontSize: 18,
    marginTop: 4,
  },
});
