import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const tapFeedback = () => {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const successFeedback = () => {
  if (Platform.OS === "web") return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const errorFeedback = () => {
  if (Platform.OS === "web") return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
