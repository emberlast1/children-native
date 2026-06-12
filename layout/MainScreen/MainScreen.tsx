import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StaggeredEntrance } from "@/components/StaggeredEntrance";
import { ThemedAnimatedBackground } from "@/components/ThemedAnimatedBackground";
import { menuHubItems } from "@/data/mainScreenData";
import { MenuHubTile } from "@/layout/MenuHubTile/MenuHubTile";
import { getMenuGridMaxWidth, isTabletWidth } from "@/theme/responsive";
import { getThemeBackdropColor } from "@/theme/screenThemes";

export const MainScreen = () => {
  const { width } = useWindowDimensions();
  const isTablet = isTabletWidth(width);

  return (
    <View style={[styles.root, { backgroundColor: getThemeBackdropColor("home") }]}>
      <ThemedAnimatedBackground theme="home" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
        >
          <View
            style={[
              styles.hub,
              isTablet && styles.hubTablet,
              { maxWidth: getMenuGridMaxWidth(width) },
            ]}
          >
            {menuHubItems.map((item, index) => (
              <StaggeredEntrance key={item.route} index={index}>
                <MenuHubTile
                  imageUrl={item.imageUrl}
                  title={item.title}
                  route={item.route}
                />
              </StaggeredEntrance>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    backgroundColor: "transparent",
  },
  hub: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 28,
  },
  hubTablet: {
    flexDirection: "row",
    gap: 40,
    paddingHorizontal: 16,
  },
});
