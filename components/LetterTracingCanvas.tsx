import React, { useCallback, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { AppText } from "@/components/AppText";
import {
  evaluateLetterTrace,
  getLetterGuideBounds,
} from "@/utils/evaluateLetterTrace";
import { pointsToSvgPath, type TracePoint } from "@/utils/pointsToSvgPath";

type InkStroke = {
  points: TracePoint[];
  color: string;
};

const BRUSH_COLORS = [
  "#2563EB",
  "#16A34A",
  "#EA580C",
  "#9333EA",
  "#0891B2",
  "#CA8A04",
  "#E11D48",
  "#3D9CAD",
] as const;

const pickRandomBrushColor = (exclude?: string) => {
  const pool = exclude
    ? BRUSH_COLORS.filter((color) => color !== exclude)
    : BRUSH_COLORS;
  return pool[Math.floor(Math.random() * pool.length)];
};

type Props = {
  letter: string;
  canvasSize: number;
  resetKey: number;
  disabled?: boolean;
  onTraceComplete: (result: { success: boolean; attempted: boolean }) => void;
};

const BrushStroke = ({
  d,
  color,
  penWidth,
}: {
  d: string;
  color: string;
  penWidth: number;
}) => (
  <>
    <Path
      d={d}
      stroke={color}
      strokeWidth={penWidth * 1.7}
      strokeOpacity={0.18}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d={d}
      stroke={color}
      strokeWidth={penWidth * 1.25}
      strokeOpacity={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d={d}
      stroke={color}
      strokeWidth={penWidth}
      strokeOpacity={0.92}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </>
);

export const LetterTracingCanvas = ({
  letter,
  canvasSize,
  resetKey,
  disabled = false,
  onTraceComplete,
}: Props) => {
  const [strokes, setStrokes] = useState<InkStroke[]>([]);
  const [activeStroke, setActiveStroke] = useState<TracePoint[]>([]);
  const [activeColor, setActiveColor] = useState<string>(() =>
    pickRandomBrushColor()
  );
  const activeStrokeRef = useRef<TracePoint[]>([]);
  const activeColorRef = useRef<string>(activeColor);
  const letterColorRef = useRef<string>(activeColor);
  const prevLetterRef = useRef(letter);
  const strokesRef = useRef<InkStroke[]>([]);
  const onTraceCompleteRef = useRef(onTraceComplete);

  onTraceCompleteRef.current = onTraceComplete;

  React.useEffect(() => {
    if (prevLetterRef.current !== letter) {
      letterColorRef.current = pickRandomBrushColor(letterColorRef.current);
      prevLetterRef.current = letter;
    }

    strokesRef.current = [];
    activeStrokeRef.current = [];
    activeColorRef.current = letterColorRef.current;
    setStrokes([]);
    setActiveStroke([]);
    setActiveColor(letterColorRef.current);
  }, [resetKey, letter]);

  const bounds = useMemo(
    () => getLetterGuideBounds(canvasSize, canvasSize),
    [canvasSize]
  );

  const letterSize = canvasSize * 0.8;

  const penWidth = useMemo(
    () => Math.max(26, Math.round(canvasSize * 0.062)),
    [canvasSize]
  );

  const strokePaths = useMemo(() => {
    const items = strokes.map((stroke, index) => ({
      key: `stroke-${index}`,
      d: pointsToSvgPath(stroke.points),
      color: stroke.color,
    }));

    if (activeStroke.length > 0) {
      items.push({
        key: "stroke-active",
        d: pointsToSvgPath(activeStroke),
        color: activeColor,
      });
    }

    return items;
  }, [activeColor, activeStroke, strokes]);

  const reportTraceResult = useCallback(
    (combined: TracePoint[]) => {
      onTraceCompleteRef.current({
        success: evaluateLetterTrace(combined, bounds, letter),
        attempted: combined.length >= 25,
      });
    },
    [bounds, letter]
  );

  const finishStroke = useCallback(
    (stroke: TracePoint[]) => {
      if (stroke.length === 0) return;

      const next = [
        ...strokesRef.current,
        { points: stroke, color: activeColorRef.current },
      ];
      strokesRef.current = next;
      setStrokes(next);
      setActiveStroke([]);
      activeStrokeRef.current = [];

      queueMicrotask(() => {
        reportTraceResult(next.flatMap((item) => item.points));
      });
    },
    [reportTraceResult]
  );

  const startStroke = useCallback((x: number, y: number) => {
    activeColorRef.current = letterColorRef.current;
    setActiveColor(letterColorRef.current);

    const points = [{ x, y }];
    activeStrokeRef.current = points;
    setActiveStroke(points);
  }, []);

  const appendPoint = useCallback((x: number, y: number) => {
    const points = [...activeStrokeRef.current, { x, y }];
    activeStrokeRef.current = points;
    setActiveStroke(points);
  }, []);

  const finishStrokeFromRef = useCallback(() => {
    finishStroke(activeStrokeRef.current);
  }, [finishStroke]);

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .minDistance(1)
    .onBegin((event) => {
      runOnJS(startStroke)(event.x, event.y);
    })
    .onUpdate((event) => {
      runOnJS(appendPoint)(event.x, event.y);
    })
    .onEnd(() => {
      runOnJS(finishStrokeFromRef)();
    });

  return (
    <View style={[styles.wrap, { width: canvasSize, height: canvasSize }]}>
      <View style={styles.guideLayer} pointerEvents="none">
        <AppText
          weight="bold"
          outlined={false}
          style={[
            styles.guideLetter,
            {
              fontSize: letterSize,
              lineHeight: letterSize * (Platform.OS === "android" ? 1.02 : 1),
            },
          ]}
        >
          {letter}
        </AppText>
      </View>

      <GestureDetector gesture={pan}>
        <Svg width={canvasSize} height={canvasSize} style={styles.drawLayer}>
          {strokePaths.map((stroke) => (
            <BrushStroke
              key={stroke.key}
              d={stroke.d}
              color={stroke.color}
              penWidth={penWidth}
            />
          ))}
        </Svg>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    overflow: "visible",
  },
  guideLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  guideLetter: {
    color: "#D0D0D0",
    textAlign: "center",
    includeFontPadding: false,
  },
  drawLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});
