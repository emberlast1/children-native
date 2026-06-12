import { DeviceMotion } from "expo-sensors";
import { useEffect } from "react";
import { Platform } from "react-native";
import {
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

const UPDATE_INTERVAL_MS = 32;
const MAX_TILT = 0.32;
const STRENGTH_X = 38;
const STRENGTH_Y = 30;

const springConfig = { damping: 22, stiffness: 140 };

export type DeviceParallaxMotion = {
  offsetX: SharedValue<number>;
  offsetY: SharedValue<number>;
  enabled: boolean;
};

export const useDeviceParallax = (): DeviceParallaxMotion => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const enabled = Platform.OS !== "web";

  useEffect(() => {
    if (!enabled) return;

    let subscription: { remove: () => void } | null = null;
    let active = true;

    const start = async () => {
      const available = await DeviceMotion.isAvailableAsync();
      if (!available || !active) return;

      DeviceMotion.setUpdateInterval(UPDATE_INTERVAL_MS);

      subscription = DeviceMotion.addListener((measurement) => {
        const gamma = measurement.rotation?.gamma ?? 0;
        const beta = measurement.rotation?.beta ?? 0;

        const clampedGamma = Math.max(-MAX_TILT, Math.min(MAX_TILT, gamma));
        const clampedBeta = Math.max(-MAX_TILT, Math.min(MAX_TILT, beta));

        offsetX.value = withSpring(clampedGamma * STRENGTH_X, springConfig);
        offsetY.value = withSpring(clampedBeta * STRENGTH_Y, springConfig);
      });
    };

    void start();

    return () => {
      active = false;
      subscription?.remove();
      offsetX.value = withSpring(0, springConfig);
      offsetY.value = withSpring(0, springConfig);
    };
  }, [enabled, offsetX, offsetY]);

  return { offsetX, offsetY, enabled };
};
