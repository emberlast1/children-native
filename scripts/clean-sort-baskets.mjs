import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "../assets/images/sort-it");

const isBackgroundColor = (r, g, b) => {
  if (r <= 28 && g <= 28 && b <= 28) return true;
  if (r >= 245 && g >= 245 && b >= 245) return true;

  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  if (spread > 16) return false;

  const avg = (r + g + b) / 3;
  return avg >= 110 && avg <= 252;
};

const floodClearBackground = (data, width, height) => {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBackground = (x, y) => {
    const index = y * width + x;
    if (visited[index]) return;

    const offset = index * 4;
    if (!isBackgroundColor(data[offset], data[offset + 1], data[offset + 2])) return;

    visited[index] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const offset = (y * width + x) * 4;
    data[offset + 3] = 0;

    if (x > 0) pushIfBackground(x - 1, y);
    if (x < width - 1) pushIfBackground(x + 1, y);
    if (y > 0) pushIfBackground(x, y - 1);
    if (y < height - 1) pushIfBackground(x, y + 1);
  }
};

const cleanBasket = async (filePath, outputPath = filePath) => {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  floodClearBackground(data, info.width, info.height);

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log(`Cleaned ${outputPath}`);
};

const run = async () => {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3] ?? inputPath;

  if (!inputPath) {
    for (const fileName of [
      "basket-fruits.png",
      "basket-vegetables.png",
      "basket-animals.png",
    ]) {
      await cleanBasket(path.join(dir, fileName));
    }
    return;
  }

  await cleanBasket(inputPath, outputPath);
};

run();
