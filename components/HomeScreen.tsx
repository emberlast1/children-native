import React, { useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { MainScreen } from "@/layout/MainScreen/MainScreen";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import {
  markWelcomeComplete,
  shouldShowWelcome,
} from "@/features/welcomeSession";

export const HomeScreen = () => {
  const [showMenu, setShowMenu] = useState(() => !shouldShowWelcome());

  const handleWelcomeComplete = () => {
    markWelcomeComplete();
    setShowMenu(true);
  };

  if (!showMenu) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <Animated.View entering={FadeIn.duration(320)} style={{ flex: 1 }}>
      <MainScreen />
    </Animated.View>
  );
};
