export type ScreenThemeKey =
  | "home"
  | "animals"
  | "fruits"
  | "vegetables"
  | "shapes"
  | "body"
  | "family"
  | "walk"
  | "weather"
  | "seasons"
  | "planet"
  | "city"
  | "homeItems"
  | "clothes"
  | "schoolSupplies"
  | "seaCreatures"
  | "alphabet"
  | "numbers"
  | "colors"
  | "days"
  | "math"
  | "count"
  | "memory"
  | "listen"
  | "sort";

type BlobConfig = {
  color: string;
  sizeRatio: number;
  leftRatio: number;
  topRatio: number;
  phase: number;
};

type ParticleConfig = {
  emoji: string;
  leftRatio: number;
  topRatio: number;
  duration: number;
  delay: number;
};

export type ScreenTheme = {
  gradient: readonly [string, string, string];
  blobs: readonly BlobConfig[];
  particles: readonly ParticleConfig[];
};

export const SCREEN_THEMES: Record<ScreenThemeKey, ScreenTheme> = {
  home: {
    gradient: ["#7EC8D4", "#3D9CAD", "#E8F6F8"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.55, leftRatio: -0.12, topRatio: 0.08, phase: 0 },
      { color: "#FFD93D", sizeRatio: 0.35, leftRatio: 0.62, topRatio: 0.55, phase: 1 },
      { color: "#FFFFFF", sizeRatio: 0.28, leftRatio: 0.15, topRatio: 0.72, phase: 2 },
    ],
    particles: [
      { emoji: "🎈", leftRatio: 0.08, topRatio: 0.18, duration: 14000, delay: 0 },
      { emoji: "✨", leftRatio: 0.78, topRatio: 0.12, duration: 16000, delay: 400 },
      { emoji: "🌈", leftRatio: 0.55, topRatio: 0.28, duration: 15000, delay: 800 },
      { emoji: "⭐", leftRatio: 0.22, topRatio: 0.62, duration: 13000, delay: 200 },
      { emoji: "💫", leftRatio: 0.85, topRatio: 0.48, duration: 17000, delay: 600 },
      { emoji: "🎉", leftRatio: 0.42, topRatio: 0.78, duration: 14500, delay: 1000 },
    ],
  },
  animals: {
    gradient: ["#B8E6D4", "#7EC8A3", "#E8F5E9"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.48, leftRatio: 0.58, topRatio: 0.05, phase: 0 },
      { color: "#A8D8EA", sizeRatio: 0.32, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🐶", leftRatio: 0.1, topRatio: 0.2, duration: 15000, delay: 0 },
      { emoji: "🐱", leftRatio: 0.72, topRatio: 0.15, duration: 16000, delay: 500 },
      { emoji: "🐻", leftRatio: 0.45, topRatio: 0.35, duration: 14000, delay: 300 },
      { emoji: "🦊", leftRatio: 0.2, topRatio: 0.65, duration: 15500, delay: 700 },
      { emoji: "🐰", leftRatio: 0.82, topRatio: 0.55, duration: 14500, delay: 200 },
      { emoji: "🐼", leftRatio: 0.55, topRatio: 0.75, duration: 16500, delay: 900 },
    ],
  },
  fruits: {
    gradient: ["#FFE8A3", "#FFB347", "#FFF3D6"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.42, leftRatio: 0.65, topRatio: 0.1, phase: 0 },
      { color: "#FF8C69", sizeRatio: 0.3, leftRatio: -0.05, topRatio: 0.65, phase: 2 },
    ],
    particles: [
      { emoji: "🍎", leftRatio: 0.12, topRatio: 0.22, duration: 14000, delay: 0 },
      { emoji: "🍌", leftRatio: 0.75, topRatio: 0.18, duration: 15000, delay: 400 },
      { emoji: "🍇", leftRatio: 0.48, topRatio: 0.4, duration: 16000, delay: 800 },
      { emoji: "🍊", leftRatio: 0.25, topRatio: 0.68, duration: 14500, delay: 200 },
      { emoji: "🍓", leftRatio: 0.8, topRatio: 0.58, duration: 15500, delay: 600 },
      { emoji: "🍑", leftRatio: 0.58, topRatio: 0.8, duration: 15000, delay: 1000 },
    ],
  },
  vegetables: {
    gradient: ["#C8E6C9", "#81C784", "#E8F5E9"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.45, leftRatio: 0.6, topRatio: 0.08, phase: 1 },
      { color: "#A5D6A7", sizeRatio: 0.34, leftRatio: -0.1, topRatio: 0.6, phase: 0 },
    ],
    particles: [
      { emoji: "🥕", leftRatio: 0.1, topRatio: 0.2, duration: 15000, delay: 0 },
      { emoji: "🥦", leftRatio: 0.78, topRatio: 0.16, duration: 16000, delay: 500 },
      { emoji: "🌽", leftRatio: 0.42, topRatio: 0.38, duration: 14000, delay: 300 },
      { emoji: "🥒", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 700 },
      { emoji: "🍅", leftRatio: 0.85, topRatio: 0.52, duration: 14500, delay: 200 },
      { emoji: "🫑", leftRatio: 0.55, topRatio: 0.78, duration: 16500, delay: 900 },
    ],
  },
  shapes: {
    gradient: ["#E1D5F0", "#C9B8E8", "#F3E8FF"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.5, leftRatio: -0.1, topRatio: 0.12, phase: 0 },
      { color: "#B39DDB", sizeRatio: 0.28, leftRatio: 0.68, topRatio: 0.62, phase: 2 },
    ],
    particles: [
      { emoji: "⭐", leftRatio: 0.15, topRatio: 0.2, duration: 14000, delay: 0 },
      { emoji: "🔵", leftRatio: 0.72, topRatio: 0.14, duration: 15000, delay: 400 },
      { emoji: "🔺", leftRatio: 0.5, topRatio: 0.32, duration: 16000, delay: 800 },
      { emoji: "⬜", leftRatio: 0.28, topRatio: 0.65, duration: 14500, delay: 200 },
      { emoji: "🟡", leftRatio: 0.82, topRatio: 0.55, duration: 15500, delay: 600 },
      { emoji: "💠", leftRatio: 0.58, topRatio: 0.78, duration: 15000, delay: 1000 },
    ],
  },
  body: {
    gradient: ["#E8F6F8", "#A8D8EA", "#FFF8E7"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.46, leftRatio: 0.62, topRatio: 0.06, phase: 1 },
      { color: "#7EC8D4", sizeRatio: 0.32, leftRatio: -0.08, topRatio: 0.58, phase: 0 },
    ],
    particles: [
      { emoji: "👋", leftRatio: 0.1, topRatio: 0.22, duration: 15000, delay: 0 },
      { emoji: "👂", leftRatio: 0.75, topRatio: 0.18, duration: 16000, delay: 500 },
      { emoji: "👃", leftRatio: 0.45, topRatio: 0.38, duration: 14000, delay: 300 },
      { emoji: "👀", leftRatio: 0.22, topRatio: 0.65, duration: 15500, delay: 700 },
      { emoji: "💪", leftRatio: 0.85, topRatio: 0.52, duration: 14500, delay: 200 },
      { emoji: "❤️", leftRatio: 0.55, topRatio: 0.78, duration: 16500, delay: 900 },
    ],
  },
  family: {
    gradient: ["#FFF3E0", "#FFD180", "#E8F6F8"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: -0.06, topRatio: 0.1, phase: 0 },
      { color: "#7EC8D4", sizeRatio: 0.3, leftRatio: 0.65, topRatio: 0.6, phase: 2 },
    ],
    particles: [
      { emoji: "👨‍👩‍👧", leftRatio: 0.08, topRatio: 0.2, duration: 15000, delay: 0 },
      { emoji: "👶", leftRatio: 0.72, topRatio: 0.15, duration: 16000, delay: 400 },
      { emoji: "👴", leftRatio: 0.48, topRatio: 0.35, duration: 14000, delay: 800 },
      { emoji: "👵", leftRatio: 0.25, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "💕", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🏠", leftRatio: 0.55, topRatio: 0.78, duration: 16500, delay: 1000 },
    ],
  },
  walk: {
    gradient: ["#B3E5FC", "#81D4FA", "#E1F5FE"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.62, topRatio: 0.08, phase: 0 },
      { color: "#4FC3F7", sizeRatio: 0.3, leftRatio: -0.06, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🌳", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🛝", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🪁", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🚲", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "☀️", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🌸", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  weather: {
    gradient: ["#E3F2FD", "#90CAF9", "#FFFDE7"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.46, leftRatio: 0.6, topRatio: 0.06, phase: 0 },
      { color: "#FFD54F", sizeRatio: 0.28, leftRatio: -0.08, topRatio: 0.55, phase: 1 },
    ],
    particles: [
      { emoji: "☀️", leftRatio: 0.12, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "☁️", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🌧️", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "❄️", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🌈", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "💨", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  seasons: {
    gradient: ["#E8F5E9", "#A5D6A7", "#FFF8E1"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.62, topRatio: 0.08, phase: 0 },
      { color: "#FFCC80", sizeRatio: 0.3, leftRatio: -0.06, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🌸", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "☀️", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🍂", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "❄️", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🌿", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🌼", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  planet: {
    gradient: ["#C8E6C9", "#4DB6AC", "#E0F7FA"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.45, leftRatio: 0.58, topRatio: 0.07, phase: 0 },
      { color: "#26A69A", sizeRatio: 0.32, leftRatio: -0.08, topRatio: 0.6, phase: 1 },
    ],
    particles: [
      { emoji: "🌍", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🌊", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🏔️", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🌲", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🏜️", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🌋", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  city: {
    gradient: ["#ECEFF1", "#90A4AE", "#FFF3E0"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.6, topRatio: 0.08, phase: 0 },
      { color: "#FFB74D", sizeRatio: 0.3, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🏙️", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🚌", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🏫", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🚦", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🏪", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "⛲", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  homeItems: {
    gradient: ["#FFF3E0", "#FFCC80", "#FBE9E7"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.58, topRatio: 0.08, phase: 0 },
      { color: "#FFAB91", sizeRatio: 0.3, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🏠", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🛋️", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🍽️", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🔑", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "📺", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🪑", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  clothes: {
    gradient: ["#E3F2FD", "#90CAF9", "#FFFDE7"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.6, topRatio: 0.08, phase: 0 },
      { color: "#64B5F6", sizeRatio: 0.3, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "👕", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "👗", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "👟", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🧢", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🧣", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "🧤", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  schoolSupplies: {
    gradient: ["#FFF9C4", "#FFE082", "#E1F5FE"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.58, topRatio: 0.08, phase: 0 },
      { color: "#FFD54F", sizeRatio: 0.3, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🎒", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "📚", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "✏️", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "📏", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🪑", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "✂️", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  seaCreatures: {
    gradient: ["#B2EBF2", "#4DD0E1", "#E0F7FA"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: 0.6, topRatio: 0.08, phase: 0 },
      { color: "#26C6DA", sizeRatio: 0.3, leftRatio: -0.08, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "🐠", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🐬", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🐙", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🦈", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🐳", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "⭐", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  alphabet: {
    gradient: ["#F0E6FA", "#E8D4F0", "#FFFFFF"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.52, leftRatio: 0.58, topRatio: 0.04, phase: 0 },
      { color: "#CE93D8", sizeRatio: 0.3, leftRatio: -0.1, topRatio: 0.62, phase: 1 },
    ],
    particles: [
      { emoji: "🔤", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "✏️", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 500 },
      { emoji: "📚", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 300 },
      { emoji: "🅰️", leftRatio: 0.22, topRatio: 0.6, duration: 15500, delay: 700 },
      { emoji: "🌟", leftRatio: 0.85, topRatio: 0.48, duration: 14500, delay: 200 },
      { emoji: "✨", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 900 },
    ],
  },
  numbers: {
    gradient: ["#D4F1E8", "#B8E0D2", "#E8F8F2"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.48, leftRatio: -0.08, topRatio: 0.1, phase: 1 },
      { color: "#80CBC4", sizeRatio: 0.32, leftRatio: 0.65, topRatio: 0.58, phase: 0 },
    ],
    particles: [
      { emoji: "1️⃣", leftRatio: 0.12, topRatio: 0.2, duration: 14000, delay: 0 },
      { emoji: "2️⃣", leftRatio: 0.75, topRatio: 0.16, duration: 15000, delay: 400 },
      { emoji: "3️⃣", leftRatio: 0.48, topRatio: 0.36, duration: 16000, delay: 800 },
      { emoji: "🔢", leftRatio: 0.25, topRatio: 0.64, duration: 14500, delay: 200 },
      { emoji: "➕", leftRatio: 0.82, topRatio: 0.54, duration: 15500, delay: 600 },
      { emoji: "✨", leftRatio: 0.55, topRatio: 0.78, duration: 15000, delay: 1000 },
    ],
  },
  colors: {
    gradient: ["#E8F6F8", "#E3F0FF", "#FFF4D6"],
    blobs: [
      { color: "#FF6B6B", sizeRatio: 0.38, leftRatio: -0.1, topRatio: 0.12, phase: 0 },
      { color: "#4D96FF", sizeRatio: 0.32, leftRatio: 0.68, topRatio: 0.08, phase: 1 },
      { color: "#FFD93D", sizeRatio: 0.28, leftRatio: 0.2, topRatio: 0.68, phase: 2 },
      { color: "#6BCB77", sizeRatio: 0.24, leftRatio: 0.72, topRatio: 0.62, phase: 0 },
    ],
    particles: [
      { emoji: "🎨", leftRatio: 0.08, topRatio: 0.18, duration: 14000, delay: 0 },
      { emoji: "🖌️", leftRatio: 0.78, topRatio: 0.12, duration: 15500, delay: 400 },
      { emoji: "🌈", leftRatio: 0.48, topRatio: 0.28, duration: 15000, delay: 800 },
      { emoji: "🟣", leftRatio: 0.18, topRatio: 0.58, duration: 16000, delay: 200 },
      { emoji: "🟠", leftRatio: 0.82, topRatio: 0.48, duration: 14500, delay: 600 },
      { emoji: "✨", leftRatio: 0.52, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  days: {
    gradient: ["#7EB6F4", "#5B8DEF", "#E3F0FF"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.5, leftRatio: -0.1, topRatio: 0.06, phase: 1 },
      { color: "#64B5F6", sizeRatio: 0.3, leftRatio: 0.68, topRatio: 0.58, phase: 0 },
    ],
    particles: [
      { emoji: "☀️", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🌙", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "⭐", leftRatio: 0.48, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "📅", leftRatio: 0.25, topRatio: 0.6, duration: 15500, delay: 200 },
      { emoji: "🌤️", leftRatio: 0.82, topRatio: 0.48, duration: 14500, delay: 600 },
      { emoji: "✨", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  math: {
    gradient: ["#B3D9F2", "#7EB6D9", "#E3F2FD"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.48, leftRatio: 0.58, topRatio: 0.05, phase: 0 },
      { color: "#64B5F6", sizeRatio: 0.32, leftRatio: -0.08, topRatio: 0.62, phase: 2 },
    ],
    particles: [
      { emoji: "➕", leftRatio: 0.12, topRatio: 0.2, duration: 14000, delay: 0 },
      { emoji: "➖", leftRatio: 0.75, topRatio: 0.16, duration: 15000, delay: 400 },
      { emoji: "🔢", leftRatio: 0.48, topRatio: 0.34, duration: 16000, delay: 800 },
      { emoji: "✏️", leftRatio: 0.22, topRatio: 0.62, duration: 14500, delay: 200 },
      { emoji: "🧮", leftRatio: 0.85, topRatio: 0.52, duration: 15500, delay: 600 },
      { emoji: "⭐", leftRatio: 0.55, topRatio: 0.78, duration: 15000, delay: 1000 },
    ],
  },
  count: {
    gradient: ["#FFE082", "#F5C16C", "#FFF8E1"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.46, leftRatio: -0.06, topRatio: 0.1, phase: 1 },
      { color: "#FFB74D", sizeRatio: 0.34, leftRatio: 0.62, topRatio: 0.58, phase: 0 },
    ],
    particles: [
      { emoji: "🐄", leftRatio: 0.1, topRatio: 0.2, duration: 15000, delay: 0 },
      { emoji: "🐑", leftRatio: 0.72, topRatio: 0.15, duration: 16000, delay: 500 },
      { emoji: "🐔", leftRatio: 0.45, topRatio: 0.35, duration: 14000, delay: 300 },
      { emoji: "🐷", leftRatio: 0.25, topRatio: 0.62, duration: 15500, delay: 700 },
      { emoji: "🐴", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 200 },
      { emoji: "🦆", leftRatio: 0.55, topRatio: 0.78, duration: 16500, delay: 900 },
    ],
  },
  memory: {
    gradient: ["#E8D4F0", "#C9B8E8", "#F3E8FF"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.46, leftRatio: 0.58, topRatio: 0.08, phase: 0 },
      { color: "#C77DFF", sizeRatio: 0.32, leftRatio: -0.08, topRatio: 0.62, phase: 1 },
    ],
    particles: [
      { emoji: "🃏", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "✨", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🍎", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🐶", leftRatio: 0.22, topRatio: 0.6, duration: 15500, delay: 200 },
      { emoji: "⭐", leftRatio: 0.82, topRatio: 0.48, duration: 14500, delay: 600 },
      { emoji: "🎉", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  listen: {
    gradient: ["#D4E8FF", "#A8C8F0", "#E8F4FF"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.44, leftRatio: -0.08, topRatio: 0.1, phase: 0 },
      { color: "#7EB6FF", sizeRatio: 0.3, leftRatio: 0.65, topRatio: 0.58, phase: 1 },
    ],
    particles: [
      { emoji: "👂", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🔊", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🎵", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🍎", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "🎨", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "✨", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
  sort: {
    gradient: ["#D8F5C8", "#A8E063", "#FFF8DC"],
    blobs: [
      { color: "#FFFFFF", sizeRatio: 0.42, leftRatio: -0.08, topRatio: 0.12, phase: 0 },
      { color: "#FFB347", sizeRatio: 0.3, leftRatio: 0.65, topRatio: 0.55, phase: 1 },
    ],
    particles: [
      { emoji: "🧺", leftRatio: 0.1, topRatio: 0.18, duration: 15000, delay: 0 },
      { emoji: "🍎", leftRatio: 0.78, topRatio: 0.14, duration: 16000, delay: 400 },
      { emoji: "🥕", leftRatio: 0.45, topRatio: 0.32, duration: 14000, delay: 800 },
      { emoji: "🐶", leftRatio: 0.22, topRatio: 0.62, duration: 15500, delay: 200 },
      { emoji: "⭐", leftRatio: 0.82, topRatio: 0.52, duration: 14500, delay: 600 },
      { emoji: "✨", leftRatio: 0.55, topRatio: 0.76, duration: 16500, delay: 1000 },
    ],
  },
};

export const getScreenTheme = (key: ScreenThemeKey): ScreenTheme => SCREEN_THEMES[key];

/** Solid fill behind gradient so parallax never exposes white edges. */
export const getThemeBackdropColor = (key: ScreenThemeKey) =>
  SCREEN_THEMES[key].gradient[1];
