import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { daysData } from "@/data/daysData";
import { DayListItem } from "./DayListItem";
import { ScreenLayout } from "./ScreenLayout";
import { StaggeredEntrance } from "./StaggeredEntrance";

export const DaysScreen = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <ScreenLayout theme="days">
      <View style={styles.list}>
        {daysData.map((item, index) => (
          <StaggeredEntrance key={item.name} index={index}>
            <DayListItem item={item} active={active} setActive={setActive} />
          </StaggeredEntrance>
        ))}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
    width: "100%",
    overflow: "visible",
  },
});
