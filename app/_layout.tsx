import "react-native-reanimated";
import { Stack, usePathname } from "expo-router";
import { TransitionPresets } from "@react-navigation/stack";
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts,
} from "@expo-google-fonts/fredoka";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { lockPortrait } from "@/features/orientation";
import { WebStack } from "@/navigation/WebStack";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const webStackBase = {
  headerShown: false as const,
  cardStyle: { flex: 1 },
  gestureEnabled: false,
};

const webCategoryOptions = {
  ...TransitionPresets.FadeFromBottomAndroid,
  ...webStackBase,
};

const webGameOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  ...webStackBase,
};

const webIndexOptions = {
  ...TransitionPresets.ModalFadeTransition,
  ...webStackBase,
};

const nativeCategoryOptions = {
  headerShown: false as const,
  animation: "fade_from_bottom" as const,
  animationDuration: 280,
};

const nativeGameOptions = {
  animation: "slide_from_right" as const,
  animationDuration: 320,
};

const nativeIndexOptions = {
  animation: "fade" as const,
  animationDuration: 220,
};

function WebLayout() {
  return (
    <WebStack screenOptions={webCategoryOptions}>
      <WebStack.Screen name="index" options={webIndexOptions} />
      <WebStack.Screen name="learn-words" options={webCategoryOptions} />
      <WebStack.Screen name="games" options={webCategoryOptions} />
      <WebStack.Screen name="math-game" options={webGameOptions} />
      <WebStack.Screen name="count-animals" options={webGameOptions} />
      <WebStack.Screen name="letter-tracing" options={webGameOptions} />
      <WebStack.Screen name="memory-game" options={webGameOptions} />
      <WebStack.Screen name="listen-and-tap" options={webGameOptions} />
      <WebStack.Screen name="where-is" options={webGameOptions} />
      <WebStack.Screen name="sort-it" options={webGameOptions} />
    </WebStack>
  );
}

function NativeLayout() {
  return (
    <Stack screenOptions={nativeCategoryOptions}>
      <Stack.Screen name="index" options={nativeIndexOptions} />
      <Stack.Screen name="learn-words" options={nativeCategoryOptions} />
      <Stack.Screen name="games" options={nativeCategoryOptions} />
      <Stack.Screen name="math-game" options={nativeGameOptions} />
      <Stack.Screen name="count-animals" options={nativeGameOptions} />
      <Stack.Screen name="letter-tracing" options={nativeGameOptions} />
      <Stack.Screen name="memory-game" options={nativeGameOptions} />
      <Stack.Screen name="listen-and-tap" options={nativeGameOptions} />
      <Stack.Screen name="where-is" options={nativeGameOptions} />
      <Stack.Screen name="sort-it" options={nativeGameOptions} />
    </Stack>
  );
}

export default function Layout() {
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (pathname === "/where-is") return;
    void lockPortrait();
  }, [pathname]);

  useEffect(() => {
    void lockPortrait();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      {Platform.OS === "web" ? <WebLayout /> : <NativeLayout />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...(Platform.OS === "web" ? null : { overflow: "hidden" }),
  },
});
