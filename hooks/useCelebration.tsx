import React, { useCallback, useState } from "react";
import { CelebrationBurst } from "@/components/CelebrationBurst";
import { successFeedback } from "@/features/haptics";

export const useCelebration = () => {
  const [celebrating, setCelebrating] = useState(false);

  const triggerCelebration = useCallback(() => {
    successFeedback();
    setCelebrating(true);
  }, []);

  const celebrationOverlay = (
    <CelebrationBurst
      visible={celebrating}
      onComplete={() => setCelebrating(false)}
    />
  );

  return { triggerCelebration, celebrationOverlay };
};
