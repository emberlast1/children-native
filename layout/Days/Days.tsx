import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { daysData } from "../../data/daysData";
import type { Color } from "../../types/color";
import { useRouter } from "expo-router";
import { DayItem } from "../Daysitem/DaysItem";

export const Days: React.FC = () => {
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


      <View style={styles.daysBlock}>
        {daysData.map((item: Color) => (
          <DayItem key={item.name} item={item} active={active} setActive={setActive}/>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#B63C89",
  },

  backButton: {
    marginTop: 40,
    width: 60,
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },

  daysBlock: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dayBlock: {
    width: 250,
    height: 60,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  dayName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  playing: {
    opacity: 0.6,
  },
});