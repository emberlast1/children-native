import { familyData } from "@/data/familyData";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { BlockItem } from "../BlockItem/BlockItem";

export const Family = () => {
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

        <View style={styles.familyBlock}>
          {familyData.map((item) => (
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

  familyBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
});
