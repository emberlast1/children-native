import React, { useState } from "react";
import { ScrollView, View, Pressable, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { BlockItem } from "../BlockItem/BlockItem";
import { vegeData } from "@/data/vegeData";

export const Vegetables = () => {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={["#FFFFFF", "#F9E2EC", "#FFFFFF", "#F9E2EC"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Image
            source={require("../../assets/images/back.png")}
            style={styles.backButton}
          />
        </Pressable>

        <View style={styles.vegeBlock}>
          {vegeData.map((item) => (
            <BlockItem
              key={item.name}
              item={item}
              active={active}
              setActive={setActive}
            />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    paddingVertical: 20,
    alignItems: "center",
  },

  backButton: {
    marginTop: 40,
    width: 60,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },

  vegeBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
});
