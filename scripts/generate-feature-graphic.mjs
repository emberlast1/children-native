/**
 * Generates Google Play feature graphic (1024×500).
 * Usage: node scripts/generate-feature-graphic.mjs [outputPath]
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const output =
  process.argv[2] ?? join(root, "store-assets/feature-graphic-1024x500.png");

const WIDTH = 1024;
const HEIGHT = 500;

const backgroundSvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3D9CAD"/>
      <stop offset="55%" stop-color="#5BB8C9"/>
      <stop offset="100%" stop-color="#E8F6F8"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#2E8594" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="920" cy="80" r="54" fill="#FFFFFF" fill-opacity="0.18"/>
  <circle cx="80" cy="420" r="70" fill="#FFFFFF" fill-opacity="0.12"/>
  <circle cx="760" cy="430" r="36" fill="#FFD93D" fill-opacity="0.55"/>
  <circle cx="180" cy="90" r="28" fill="#FF6B6B" fill-opacity="0.45"/>
  <text x="360" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="700" fill="#FFFFFF" filter="url(#shadow)">ChildrenEng</text>
  <text x="360" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="#FFFFFF" fill-opacity="0.95">Learn English for kids</text>
  <text x="360" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="500" fill="#FFFFFF" fill-opacity="0.88">Pictures · Voice · Mini-games</text>
</svg>`;

const iconPath = join(root, "assets/icon.png");
const iconSize = 280;
const iconLeft = 48;
const iconTop = Math.round((HEIGHT - iconSize) / 2);

const iconBuffer = await sharp(iconPath)
  .resize(iconSize, iconSize, { fit: "cover" })
  .png()
  .toBuffer();

const iconShadowSvg = `
<svg width="${iconSize + 24}" height="${iconSize + 24}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="iconShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#1A5C66" flood-opacity="0.4"/>
    </filter>
  </defs>
  <rect x="12" y="12" width="${iconSize}" height="${iconSize}" rx="56" ry="56" fill="#FFFFFF" fill-opacity="0.15" filter="url(#iconShadow)"/>
</svg>`;

const shadowBuffer = await sharp(Buffer.from(iconShadowSvg)).png().toBuffer();

const roundedIcon = await sharp(iconBuffer)
  .composite([
    {
      input: Buffer.from(
        `<svg width="${iconSize}" height="${iconSize}"><rect width="${iconSize}" height="${iconSize}" rx="56" ry="56" fill="white"/></svg>`
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(backgroundSvg))
  .composite([
    { input: shadowBuffer, left: iconLeft - 12, top: iconTop - 12 },
    { input: roundedIcon, left: iconLeft, top: iconTop },
  ])
  .png({ compressionLevel: 9, palette: false })
  .toFile(output);

console.log(`Created ${output} (${WIDTH}x${HEIGHT})`);
