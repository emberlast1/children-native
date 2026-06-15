import * as Linking from "expo-linking";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { AppText } from "@/components/AppText";
import { PRIVACY_POLICY_URL } from "@/constants/legal";
import { tapFeedback } from "@/features/haptics";

type Props = {
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export const PrivacyPolicyLink = ({
  label = "Privacy Policy",
  style,
}: Props) => {
  const handlePress = async () => {
    tapFeedback();
    try {
      await Linking.openURL(PRIVACY_POLICY_URL);
    } catch {
      Alert.alert(
        "Unable to open link",
        "Please visit the privacy policy in your browser.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <Pressable
      style={[styles.link, style]}
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityLabel={label}
      accessibilityHint="Opens privacy policy in browser"
      hitSlop={8}
    >
      <AppText weight="semiBold" outlined={false} style={styles.text}>
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 14,
    color: "#2E8594",
    textDecorationLine: "underline",
  },
});
