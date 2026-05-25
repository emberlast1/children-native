import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { MainScreenComponent } from "../MainScreenComponent/MainScreenComponent";
import { mainScreenComponentsData as data } from "../../data/mainScreenData";
import type { Component } from "../../types/Component";

export const MainScreen = () => {
  const days = data[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MainScreenComponent
        imageUrl={days.imageUrl}
        nameEng={days.nameEng}
      />

      <View style={styles.other}>
        {data.slice(1).map((item: Component) => (
          <MainScreenComponent
            key={item.nameEng}
            imageUrl={item.imageUrl}
            nameEng={item.nameEng}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D95F70",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    minHeight: "100%",
  },

  other: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});