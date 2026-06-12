import { useRouter } from "expo-router";
import { useCallback } from "react";
import * as Speech from "expo-speech";

/** Navigate to the main screen, stopping speech and handling empty history. */
export const useGoBackHome = () => {
  const router = useRouter();

  return useCallback(() => {
    Speech.stop();

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }, [router]);
};
