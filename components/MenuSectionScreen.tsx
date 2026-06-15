import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/BackButton";
import { ParentFooterLinks } from "@/components/ParentFooterLinks";
import { StaggeredEntrance } from "@/components/StaggeredEntrance";
import { ThemedAnimatedBackground } from "@/components/ThemedAnimatedBackground";
import { MainScreenComponent } from "@/layout/MainScreenComponent/MainScreenComponent";
import type { MenuSection } from "@/types/menuItem";
import { getMenuGridMaxWidth } from "@/theme/responsive";
import { getThemeBackdropColor } from "@/theme/screenThemes";

type Props = {
  section: MenuSection;
};

export const MenuSectionScreen = ({ section }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.root, { backgroundColor: getThemeBackdropColor("home") }]}>
      <ThemedAnimatedBackground theme="home" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
        >
          <BackButton />

          <View style={[styles.grid, { maxWidth: getMenuGridMaxWidth(width) }]}>
            {section.items.map((item, index) => (
              <StaggeredEntrance key={item.route} index={index + 1}>
                <MainScreenComponent
                  imageUrl={item.imageUrl}
                  nameEng={item.nameEng}
                  route={item.route}
                />
              </StaggeredEntrance>
            ))}
          </View>
          <ParentFooterLinks style={styles.footer} />
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
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 48,
    backgroundColor: "transparent",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  footer: {
    marginTop: 24,
  },
});
