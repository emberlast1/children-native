import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";

export const lockPortrait = async () => {
  if (Platform.OS === "web") return;

  try {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  } catch {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    } catch {
      // Ignore unsupported platforms or simulators.
    }
  }
};

export const lockLandscape = async () => {
  if (Platform.OS === "web") return;

  try {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  } catch {
    // Ignore unsupported platforms or simulators.
  }
};
