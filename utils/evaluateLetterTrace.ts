import { LETTER_TRACE_PATHS } from "@/data/letterTracePaths";
import type { TracePoint } from "./pointsToSvgPath";

export type LetterGuideBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const getLetterGuideBounds = (width: number, height: number): LetterGuideBounds => ({
  x: width * 0.1,
  y: height * 0.1,
  width: width * 0.8,
  height: height * 0.8,
});

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const distance = (a: TracePoint, b: TracePoint) =>
  Math.hypot(a.x - b.x, a.y - b.y);

const distanceToSegment = (point: TracePoint, start: TracePoint, end: TracePoint) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (dx === 0 && dy === 0) return distance(point, start);

  const t = clamp(
    ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy),
    0,
    1
  );

  return distance(point, {
    x: start.x + t * dx,
    y: start.y + t * dy,
  });
};

const distanceToPolyline = (point: TracePoint, polyline: TracePoint[]) => {
  if (polyline.length === 0) return Number.POSITIVE_INFINITY;
  if (polyline.length === 1) return distance(point, polyline[0]);

  let min = Number.POSITIVE_INFINITY;
  for (let index = 1; index < polyline.length; index += 1) {
    min = Math.min(
      min,
      distanceToSegment(point, polyline[index - 1], polyline[index])
    );
  }

  return min;
};

const distanceToTemplate = (point: TracePoint, strokes: TracePoint[][]) => {
  let min = Number.POSITIVE_INFINITY;
  for (const stroke of strokes) {
    min = Math.min(min, distanceToPolyline(point, stroke));
  }
  return min;
};

const scaleTemplate = (strokes: TracePoint[][], bounds: LetterGuideBounds): TracePoint[][] =>
  strokes.map((stroke) =>
    stroke.map((point) => ({
      x: bounds.x + point.x * bounds.width,
      y: bounds.y + point.y * bounds.height,
    }))
  );

const sampleTemplate = (strokes: TracePoint[][], step: number) => {
  const samples: TracePoint[] = [];

  for (const stroke of strokes) {
    for (let index = 1; index < stroke.length; index += 1) {
      const start = stroke[index - 1];
      const end = stroke[index];
      const segmentLength = distance(start, end);
      const steps = Math.max(1, Math.ceil(segmentLength / step));

      for (let stepIndex = 0; stepIndex <= steps; stepIndex += 1) {
        const t = stepIndex / steps;
        samples.push({
          x: start.x + (end.x - start.x) * t,
          y: start.y + (end.y - start.y) * t,
        });
      }
    }
  }

  return samples;
};

const minDistanceToTrace = (point: TracePoint, trace: TracePoint[]) => {
  let min = Number.POSITIVE_INFINITY;
  for (const tracePoint of trace) {
    min = Math.min(min, distance(point, tracePoint));
  }
  return min;
};

const getPathLength = (points: TracePoint[]) => {
  let length = 0;
  for (let index = 1; index < points.length; index += 1) {
    length += distance(points[index - 1], points[index]);
  }
  return length;
};

export const evaluateLetterTrace = (
  points: TracePoint[],
  bounds: LetterGuideBounds,
  letter: string,
  options?: {
    minPoints?: number;
    minTraceOnPath?: number;
    minPathCoverage?: number;
    minLengthRatio?: number;
    maxOffPathRatio?: number;
    pathThresholdRatio?: number;
  }
): boolean => {
  const template = LETTER_TRACE_PATHS[letter.toUpperCase()];
  if (!template) return false;

  const minPoints = options?.minPoints ?? 35;
  const minTraceOnPath = options?.minTraceOnPath ?? 0.58;
  const minPathCoverage = options?.minPathCoverage ?? 0.42;
  const minLengthRatio = options?.minLengthRatio ?? 0.85;
  const maxOffPathRatio = options?.maxOffPathRatio ?? 0.22;
  const pathThresholdRatio = options?.pathThresholdRatio ?? 0.11;

  if (points.length < minPoints) return false;

  const scaledTemplate = scaleTemplate(template, bounds);
  const threshold = bounds.width * pathThresholdRatio;
  const sampleStep = bounds.width * 0.035;
  const minLength = Math.min(bounds.width, bounds.height) * minLengthRatio;

  if (getPathLength(points) < minLength) return false;

  const onPathCount = points.filter(
    (point) => distanceToTemplate(point, scaledTemplate) <= threshold
  ).length;
  if (onPathCount / points.length < minTraceOnPath) return false;

  const templateSamples = sampleTemplate(scaledTemplate, sampleStep);
  if (templateSamples.length === 0) return false;

  const coveredCount = templateSamples.filter(
    (sample) => minDistanceToTrace(sample, points) <= threshold
  ).length;
  if (coveredCount / templateSamples.length < minPathCoverage) return false;

  const offPathCount = points.filter(
    (point) => distanceToTemplate(point, scaledTemplate) > threshold * 1.75
  ).length;
  if (offPathCount / points.length > maxOffPathRatio) return false;

  return true;
};
