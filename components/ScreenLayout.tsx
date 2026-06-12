import React, { type ReactNode } from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View, type ViewStyle } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "./BackButton";
import { ThemedAnimatedBackground } from "./ThemedAnimatedBackground";
import { getContentMaxWidth } from "@/theme/responsive";
import { getThemeBackdropColor, type ScreenThemeKey } from "@/theme/screenThemes";

type Props = {
  children: ReactNode;
  theme: ScreenThemeKey;
  contentStyle?: ViewStyle;
  centerChildren?: boolean;
  scrollable?: boolean;
};

export const ScreenLayout = ({
  children,
  theme,
  contentStyle,
  centerChildren = false,
  scrollable = true,
}: Props) => {
  const { width } = useWindowDimensions();
  const contentMaxWidth = getContentMaxWidth(width);

  const content = (
    <>
      <BackButton />
      <Animated.View
        entering={FadeIn.duration(320)}
        style={[
          styles.content,
          { maxWidth: contentMaxWidth },
          centerChildren && styles.contentGrow,
        ]}
      >
        {children}
      </Animated.View>
    </>
  );

  return (
    <View
      style={[styles.root, { backgroundColor: getThemeBackdropColor(theme) }]}
    >
      <ThemedAnimatedBackground theme={theme} />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {scrollable ? (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.container,
              centerChildren && styles.containerGrow,
              contentStyle,
            ]}
          >
            {content}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.container,
              styles.containerFill,
              centerChildren && styles.containerGrow,
              contentStyle,
            ]}
          >
            {content}
          </View>
        )}
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
    paddingVertical: 20,
    alignItems: "center",
    overflow: "visible",
    backgroundColor: "transparent",
  },
  containerGrow: {
    flexGrow: 1,
  },
  containerFill: {
    flex: 1,
  },
  content: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  contentGrow: {
    flex: 1,
    justifyContent: "center",
  },
});
