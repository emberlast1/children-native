import { colorData } from "@/data/colorData";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import type { Color } from "../../types/color";
import { ColorsItem } from "./ColorsItem";

export const Colors: React.FC = () => {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require("../../assets/images/back.png")}
          style={styles.backButton}
        />
      </Pressable>

      <View style={styles.colorBlock}>
        {colorData.map((item: Color) => (
          <ColorsItem
            key={item.name}
            item={item}
            active={active}
            setActive={setActive}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#CDE097",
  },

  backButton: {
    marginTop: 40,
    width: 60,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },

  colorBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
});
