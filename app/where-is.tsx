import { WhereIsGameScreen } from "@/components/WhereIsGameScreen";
import { lockLandscape, lockPortrait } from "@/features/orientation";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";

export default function WhereIsRoute() {
  const navigation = useNavigation();
  const restoringPortrait = useRef(false);

  useFocusEffect(
    useCallback(() => {
      void lockLandscape();

      return () => {
        void lockPortrait();
      };
    }, [])
  );

  useEffect(() => {
    if (Platform.OS === "web") return;

    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (restoringPortrait.current) return;

      event.preventDefault();
      restoringPortrait.current = true;

      void lockPortrait().finally(() => {
        navigation.dispatch(event.data.action);
        restoringPortrait.current = false;
      });
    });

    return unsubscribe;
  }, [navigation]);

  return <WhereIsGameScreen />;
}
