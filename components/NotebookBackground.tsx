import React, { useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Line } from "react-native-svg";

const PAPER = "#FFFDF7";
const MARGIN = 28;
const RULE_GAP = 34;
const SLANT_GAP = 26;

export const NotebookBackground = () => {
  const { width, height } = useWindowDimensions();

  const horizontalRules = useMemo(() => {
    const lines: { y: number }[] = [];
    for (let y = RULE_GAP; y < height; y += RULE_GAP) {
      lines.push({ y });
    }
    return lines;
  }, [height]);

  const slantedRules = useMemo(() => {
    const lines: { x: number }[] = [];
    for (let x = -height; x < width + height; x += SLANT_GAP) {
      lines.push({ x });
    }
    return lines;
  }, [height, width]);

  return (
    <View pointerEvents="none" style={[styles.wrap, { width, height }]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {slantedRules.map((line, index) => (
          <Line
            key={`slant-${index}`}
            x1={line.x}
            y1={0}
            x2={line.x + height * 0.55}
            y2={height}
            stroke="#E9E2D6"
            strokeWidth={1}
          />
        ))}

        {horizontalRules.map((line, index) => (
          <Line
            key={`rule-${index}`}
            x1={0}
            y1={line.y}
            x2={width}
            y2={line.y}
            stroke="#B8D4F0"
            strokeWidth={1.2}
          />
        ))}

        <Line
          x1={MARGIN}
          y1={0}
          x2={MARGIN}
          y2={height}
          stroke="#F07178"
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PAPER,
  },
});
