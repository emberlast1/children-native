/**
 * Crops a landscape menu image to a square and exports store assets.
 * Usage: node scripts/prepare-store-assets.mjs [sourceImage]
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = process.argv[2] ?? join(root, "assets/images/games.png");

const sizes = [
  { file: "assets/icon.png", size: 1024 },
  { file: "assets/adaptive-icon.png", size: 1024 },
  { file: "assets/splash-icon.png", size: 512 },
];

const image = sharp(source);
const metadata = await image.metadata();
const cropSize = Math.min(metadata.width ?? 0, metadata.height ?? 0);
const left = Math.floor(((metadata.width ?? 0) - cropSize) / 2);
const top = Math.floor(((metadata.height ?? 0) - cropSize) / 2);

for (const { file, size } of sizes) {
  await sharp(source)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(join(root, file));
  console.log(`Created ${file} (${size}x${size})`);
}
