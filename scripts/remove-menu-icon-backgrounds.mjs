import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../assets/images");

const menuIcons = [
  "days.png",
  "animals.png",
  "colors.png",
  "fruits.png",
  "vege.png",
  "shapes.png",
  "alphabet.png",
  "numbers.png",
  "body.png",
  "family.png",
  "at-the-walk.png",
  "weather.png",
  "seasons.png",
  "our-planet.png",
  "in-the-city.png",
  "home-items.png",
  "my-clothes.png",
  "school-supplies.png",
  "sea-creatures.png",
  "learn-words.png",
  "games.png",
  "counter.png",
  "countAnimals.png",
  "write-letters.png",
  "memory.png",
  "listen-and-tap.png",
  "where-is.png",
  "sort-it.png",
];

const WHITE_THRESHOLD = 238;

const removeWhiteBackground = async (filePath) => {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];

    if (red >= WHITE_THRESHOLD && green >= WHITE_THRESHOLD && blue >= WHITE_THRESHOLD) {
      data[index + 3] = 0;
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(filePath);
};

for (const fileName of menuIcons) {
  const filePath = path.join(imagesDir, fileName);
  await removeWhiteBackground(filePath);
  console.log(`Processed ${fileName}`);
}
