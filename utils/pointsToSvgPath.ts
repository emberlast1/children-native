export type TracePoint = {
  x: number;
  y: number;
};

export const pointsToSvgPath = (points: TracePoint[]): string => {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  return `M ${first.x} ${first.y} ${rest.map((point) => `L ${point.x} ${point.y}`).join(" ")}`;
};
