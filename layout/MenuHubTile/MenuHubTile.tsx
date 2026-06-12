import { useRouter, type Href } from "expo-router";
import React from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { AppText } from "@/components/AppText";
import { AnimatedTile } from "@/components/AnimatedTile";
import { IconFrame } from "@/components/IconFrame";
import { tapFeedback } from "@/features/haptics";
import type { MenuHubItem } from "@/types/menuItem";
import { getHubTileSize, scaleFont } from "@/theme/responsive";
import { iconInnerSize } from "@/theme/iconFrame";

type Props = Pick<MenuHubItem, "imageUrl" | "title" | "route">;

export const MenuHubTile = ({ imageUrl, title, route }: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const tileSize = getHubTileSize(width);
  const imageSize = iconInnerSize(tileSize);

  const handlePress = () => {
    tapFeedback();
    router.push(route as Href);
  };

  return (
    <AnimatedTile
      style={[styles.tile, { width: tileSize }]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <IconFrame size={tileSize}>
        <Image
          source={imageUrl}
          style={{ width: imageSize, height: imageSize }}
          resizeMode="contain"
        />
      </IconFrame>
      <AppText
        weight="bold"
        style={[styles.title, { fontSize: scaleFont(width, 24, 28) }]}
      >
        {title}
      </AppText>
    </AnimatedTile>
  );
};

const styles = StyleSheet.create({
  tile: {
    marginVertical: 4,
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    textAlign: "center",
  },
});
