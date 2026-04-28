const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'public', 'portfolio-cover.png');

const assets = {
  avatar: path.join(repoRoot, 'src', 'Assets', 'avatar.svg'),
  urbanstay: path.join(repoRoot, 'src', 'Assets', 'Projects', 'urbanstay.png'),
  careerAI: path.join(repoRoot, 'src', 'Assets', 'Projects', 'career-ai.png'),
};

const width = 1600;
const height = 900;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function svgBuffer(markup) {
  return Buffer.from(markup);
}

async function ensureAssets() {
  await Promise.all(
    Object.values(assets).map(async (filePath) => {
      await fs.access(filePath);
    })
  );
}

function buildBackground() {
  return svgBuffer(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#09070f"/>
          <stop offset="58%" stop-color="#140f24"/>
          <stop offset="100%" stop-color="#1c1531"/>
        </linearGradient>
        <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 180) rotate(20) scale(520 420)">
          <stop offset="0%" stop-color="#c770f0" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#c770f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1300 760) rotate(-8) scale(500 400)">
          <stop offset="0%" stop-color="#58c7ff" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#58c7ff" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glowA)"/>
      <rect width="${width}" height="${height}" fill="url(#glowB)"/>

      <rect x="52" y="52" width="1496" height="796" rx="30" fill="rgba(14,10,24,0.42)" stroke="rgba(199,112,240,0.35)"/>
      <rect x="66" y="66" width="1468" height="768" rx="24" fill="none" stroke="rgba(255,255,255,0.08)"/>

      <rect x="782" y="130" width="705" height="372" rx="24" fill="rgba(9,7,16,0.64)" stroke="rgba(199,112,240,0.26)"/>
      <rect x="782" y="530" width="340" height="230" rx="20" fill="rgba(9,7,16,0.64)" stroke="rgba(88,199,255,0.3)"/>
      <rect x="1147" y="530" width="340" height="230" rx="20" fill="rgba(9,7,16,0.64)" stroke="rgba(255,159,67,0.35)"/>
    </svg>
  `);
}

function buildTextOverlay() {
  const title = escapeXml('Harsh Rathod');
  const subtitle = escapeXml('Full-Stack Developer | React, Node.js, AI Tools');
  const tagline = escapeXml(
    'Building reliable, scalable products with polished UX.'
  );

  return svgBuffer(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="118" y="168" fill="#f2dcff" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" letter-spacing="2">PORTFOLIO COVER</text>
      <text x="118" y="276" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800">${title}</text>
      <text x="118" y="338" fill="#d9b7ea" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="600">${subtitle}</text>
      <text x="118" y="395" fill="#f4ebfa" font-family="Segoe UI, Arial, sans-serif" font-size="30">${tagline}</text>

      <rect x="118" y="446" width="560" height="58" rx="29" fill="rgba(199,112,240,0.18)" stroke="rgba(199,112,240,0.45)"/>
      <text x="145" y="484" fill="#ffe6ff" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">Featured Projects: Urban-Stay | Career.AI</text>

      <text x="118" y="585" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700">What this portfolio highlights:</text>
      <text x="138" y="638" fill="#f2e7f8" font-family="Segoe UI, Arial, sans-serif" font-size="28">- Practical full-stack builds</text>
      <text x="138" y="684" fill="#f2e7f8" font-family="Segoe UI, Arial, sans-serif" font-size="28">- Performance-aware UI and API work</text>
      <text x="138" y="730" fill="#f2e7f8" font-family="Segoe UI, Arial, sans-serif" font-size="28">- Clean, share-ready product presentation</text>

      <text x="118" y="804" fill="#bba5d1" font-family="Segoe UI, Arial, sans-serif" font-size="24">Bharuch, India</text>
    </svg>
  `);
}

async function generateCoverImage() {
  await ensureAssets();

  const avatar = await sharp(assets.avatar)
    .resize(300, 300, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const urbanstay = await sharp(assets.urbanstay)
    .resize(665, 332, { fit: 'cover' })
    .png()
    .toBuffer();

  const careerAI = await sharp(assets.careerAI)
    .resize(300, 190, { fit: 'cover' })
    .png()
    .toBuffer();

  const base = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 8, g: 8, b: 14, alpha: 1 },
    },
  });

  await base
    .composite([
      { input: buildBackground(), top: 0, left: 0 },
      { input: urbanstay, top: 150, left: 802 },
      { input: avatar, top: 552, left: 801 },
      { input: careerAI, top: 550, left: 1168 },
      { input: buildTextOverlay(), top: 0, left: 0 },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Cover image generated: ${outputPath}`);
}

generateCoverImage().catch((error) => {
  console.error('Failed to generate cover image.');
  console.error(error);
  process.exitCode = 1;
});
