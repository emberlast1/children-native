import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../assets/audio");
const outputFile = path.join(outputDir, "welcome-melody.wav");

const sampleRate = 44100;
const gapSeconds = 0.012;

const NOTE = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
};

const melody = [
  { freq: NOTE.C5, duration: 0.16, velocity: 1 },
  { freq: NOTE.C5, duration: 0.16, velocity: 1 },
  { freq: NOTE.G5, duration: 0.16, velocity: 1 },
  { freq: NOTE.G5, duration: 0.16, velocity: 1 },
  { freq: NOTE.A5, duration: 0.16, velocity: 1 },
  { freq: NOTE.A5, duration: 0.16, velocity: 1 },
  { freq: NOTE.G5, duration: 0.32, velocity: 1.05 },
  { freq: NOTE.F5, duration: 0.16, velocity: 1 },
  { freq: NOTE.F5, duration: 0.16, velocity: 1 },
  { freq: NOTE.E5, duration: 0.16, velocity: 1 },
  { freq: NOTE.E5, duration: 0.16, velocity: 1 },
  { freq: NOTE.D5, duration: 0.16, velocity: 1 },
  { freq: NOTE.D5, duration: 0.16, velocity: 1 },
  { freq: NOTE.C5, duration: 0.34, velocity: 1.08 },
  { freq: NOTE.E5, duration: 0.14, velocity: 0.95 },
  { freq: NOTE.G5, duration: 0.14, velocity: 0.95 },
  { freq: NOTE.C6, duration: 0.28, velocity: 1.1 },
  { freq: NOTE.G5, duration: 0.14, velocity: 0.92 },
  { freq: NOTE.E5, duration: 0.14, velocity: 0.92 },
  { freq: NOTE.C5, duration: 0.42, velocity: 1.05 },
];

const bassPattern = [
  { freq: NOTE.C4, duration: 0.64 },
  { freq: NOTE.G4, duration: 0.64 },
  { freq: NOTE.A4, duration: 0.64 },
  { freq: NOTE.G4, duration: 0.64 },
  { freq: NOTE.F4, duration: 0.64 },
  { freq: NOTE.C4, duration: 0.64 },
  { freq: NOTE.G4, duration: 0.64 },
  { freq: NOTE.C4, duration: 0.64 },
  { freq: NOTE.C4, duration: 0.56 },
  { freq: NOTE.G4, duration: 0.56 },
  { freq: NOTE.C4, duration: 0.84 },
];

const writeString = (view, offset, value) => {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
};

const createTone = (frequency, durationSeconds, velocity = 1) => {
  const totalSamples = Math.floor(durationSeconds * sampleRate);
  const samples = new Float32Array(totalSamples);

  for (let index = 0; index < totalSamples; index += 1) {
    const time = index / sampleRate;
    const attack = Math.min(1, index / (sampleRate * 0.006));
    const release = Math.exp(-4.2 * (time / durationSeconds));
    const envelope = attack * release;
    const tone =
      Math.sin(2 * Math.PI * frequency * time) * 0.62 +
      Math.sin(2 * Math.PI * frequency * 2 * time) * 0.24 +
      Math.sin(2 * Math.PI * frequency * 3 * time) * 0.1 +
      Math.sin(2 * Math.PI * frequency * 4 * time) * 0.04;
    samples[index] = tone * envelope * 0.34 * velocity;
  }

  return samples;
};

const createGap = (durationSeconds) =>
  new Float32Array(Math.floor(durationSeconds * sampleRate));

const mixChunks = (targetLength, layers) => {
  const mix = new Float32Array(targetLength);

  for (const layer of layers) {
    for (let index = 0; index < layer.length && index < targetLength; index += 1) {
      mix[index] += layer[index];
    }
  }

  return mix;
};

const melodyLayers = [];
let melodyLength = 0;

for (const note of melody) {
  const tone = createTone(note.freq, note.duration, note.velocity);
  melodyLayers.push(tone);
  melodyLength += tone.length;
  const gap = createGap(gapSeconds);
  melodyLayers.push(gap);
  melodyLength += gap.length;
}

const melodyTrack = mixChunks(
  melodyLength,
  melodyLayers.filter((chunk) => chunk.length > 0)
);

const bassLayers = [];
let bassLength = 0;

for (const note of bassPattern) {
  const tone = createTone(note.freq, note.duration, 0.72);
  bassLayers.push(tone);
  bassLength += tone.length;
}

const bassTrack = mixChunks(bassLength, bassLayers);
const totalSamples = Math.max(melodyTrack.length, bassTrack.length);
const finalTrack = new Float32Array(totalSamples);

for (let index = 0; index < totalSamples; index += 1) {
  finalTrack[index] = (melodyTrack[index] ?? 0) + (bassTrack[index] ?? 0) * 0.55;
}

const pcmData = new Int16Array(totalSamples);

for (let index = 0; index < totalSamples; index += 1) {
  const clamped = Math.max(-1, Math.min(1, finalTrack[index]));
  pcmData[index] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
}

const byteRate = sampleRate * 2;
const blockAlign = 2;
const dataSize = pcmData.length * 2;
const buffer = new ArrayBuffer(44 + dataSize);
const view = new DataView(buffer);

writeString(view, 0, "RIFF");
view.setUint32(4, 36 + dataSize, true);
writeString(view, 8, "WAVE");
writeString(view, 12, "fmt ");
view.setUint32(16, 16, true);
view.setUint16(20, 1, true);
view.setUint16(22, 1, true);
view.setUint32(24, sampleRate, true);
view.setUint32(28, byteRate, true);
view.setUint16(32, blockAlign, true);
view.setUint16(34, 16, true);
writeString(view, 36, "data");
view.setUint32(40, dataSize, true);

const pcmOffset = 44;
for (let index = 0; index < pcmData.length; index += 1) {
  view.setInt16(pcmOffset + index * 2, pcmData[index], true);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, Buffer.from(buffer));

console.log(`Generated ${outputFile} (${(totalSamples / sampleRate).toFixed(2)}s)`);
