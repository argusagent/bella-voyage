// Regenerate the printable QR codes that point at the live site.
//
// Outputs:
//   public/bella-voyage-qr.svg   — vector, infinite scale, ideal for print
//   public/bella-voyage-qr.png   — 1200×1200 raster, ideal for screens / DMs
//
// Run with `npm run gen:qr`.  The /qr page references these files,
// and the next build will pick them up automatically.

import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://bella-voyage.vercel.app/";

// High error-correction so the code still scans at small sizes or with
// minor print smudging.  Wide quiet-zone for tap-targeting.  Colours
// pulled from the site palette so the asset never looks third-party.
const COMMON = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: {
    dark: "#0a0807",
    light: "#f5efe2",
  },
};

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, "..", "public");
await mkdir(publicDir, { recursive: true });

const svg = await QRCode.toString(SITE_URL, { ...COMMON, type: "svg", width: 800 });
await writeFile(resolve(publicDir, "bella-voyage-qr.svg"), svg, "utf8");

const png = await QRCode.toBuffer(SITE_URL, { ...COMMON, width: 1200 });
await writeFile(resolve(publicDir, "bella-voyage-qr.png"), png);

console.log(`QR generated for ${SITE_URL}`);
console.log(`  → public/bella-voyage-qr.svg  (${svg.length} bytes)`);
console.log(`  → public/bella-voyage-qr.png  (${png.length} bytes)`);
