import React, { type ReactNode } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  index: number;
  children: ReactNode;
};

export const StaggeredEntrance = ({ index, children }: Props) => (
  <Animated.View
    entering={FadeInDown.delay(index * 55)
      .springify()
      .damping(14)
      .stiffness(120)}
  >
    {children}
  </Animated.View>
);
