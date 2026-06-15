import React from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { AppText } from "@/components/AppText";
import { PrivacyPolicyLink } from "@/components/PrivacyPolicyLink";

type Props = {
  style?: StyleProp<ViewStyle>;
};

/** Small footer for parents — privacy policy link (store compliance). */
export const ParentFooterLinks = ({ style }: Props) => (
  <View style={[styles.wrap, style]} accessibilityRole="summary">
    <AppText weight="semiBold" outlined={false} style={styles.caption}>
      For parents
    </AppText>
    <PrivacyPolicyLink />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  caption: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 2,
  },
});
