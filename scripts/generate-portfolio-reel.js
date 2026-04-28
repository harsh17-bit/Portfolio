const fs = require('fs/promises');
const path = require('path');
const { spawnSync } = require('child_process');
const sharp = require('sharp');
const ffmpegPath = require('ffmpeg-static');

const repoRoot = path.resolve(__dirname, '..');
const publicDir = path.join(repoRoot, 'public');
const tempDir = path.join(repoRoot, '.tmp', 'portfolio-reel');
const outputFile = path.join(publicDir, 'portfolio-reel.mp4');
const posterFile = path.join(publicDir, 'portfolio-reel-poster.png');

const assets = {
  home: path.join(repoRoot, 'src', 'Assets', 'home-main.svg'),
  avatar: path.join(repoRoot, 'src', 'Assets', 'avatar.svg'),
  about: path.join(repoRoot, 'src', 'Assets', 'about.png'),
  urbanstay: path.join(repoRoot, 'src', 'Assets', 'Projects', 'urbanstay.png'),
  chatbot: path.join(repoRoot, 'src', 'Assets', 'Projects', 'chat-bot.png'),
  careerAI: path.join(repoRoot, 'src', 'Assets', 'Projects', 'career-ai.png'),
};

const width = 1080;
const height = 1920;

const slides = [
  {
    filename: 'slide-01.png',
    duration: 3.1,
    background: ['#160f2a', '#07060d'],
    eyebrow: 'Portfolio reel',
    title: 'Harsh Rathod',
    subtitle:
      'Full-stack developer focused on polished web apps, AI tools, and production-ready experiences.',
    bullets: ['React + Node.js', 'LangChain + Cohere', 'JavaScript, C++, Java'],
    image: assets.home,
    imageLabel: 'Hero visual',
    accent: '#c770f0',
    footer: 'One reel. One portfolio. Built for LinkedIn and Contra.',
  },
  {
    filename: 'slide-02.png',
    duration: 3.1,
    background: ['#111827', '#07060d'],
    eyebrow: 'About the build',
    title: 'Clean interfaces with strong structure.',
    subtitle:
      'I like turning ideas into reliable products that feel fast, readable, and visually intentional.',
    bullets: ['Responsive layouts', 'Smooth motion cues', 'Clear user flows'],
    image: assets.avatar,
    imageLabel: 'Developer identity',
    accent: '#58c7ff',
    footer:
      'Readable design, practical functionality, and a strong first impression.',
  },
  {
    filename: 'slide-03.png',
    duration: 3.4,
    background: ['#1a1022', '#09070f'],
    eyebrow: 'Selected projects',
    title: 'Three builds that show range.',
    subtitle:
      'From booking platforms to AI assistants, the portfolio mixes product work and practical deployments.',
    bullets: [
      'Urban-Stay booking flow',
      'Chat-Bot Cohere assistant',
      'Career.AI guidance platform',
    ],
    projectCards: [
      { name: 'Urban-Stay', image: assets.urbanstay, tone: '#ff7d7d' },
      { name: 'Chat-Bot Cohere', image: assets.chatbot, tone: '#6ad6ff' },
      { name: 'Career.AI', image: assets.careerAI, tone: '#92ffb0' },
    ],
    image: assets.careerAI,
    imageLabel: 'Project lineup',
    accent: '#ff9f43',
    footer:
      'A portfolio reel should show breadth quickly, then invite deeper review.',
  },
  {
    filename: 'slide-04.png',
    duration: 3.0,
    background: ['#101826', '#07111a'],
    eyebrow: 'Experience',
    title: 'Built with real-world constraints in mind.',
    subtitle:
      'Freelance work and coursework shaped a practical approach to shipping features and improving UX.',
    bullets: [
      'Freelance full-stack development',
      'Responsive product delivery',
      'Computer engineering background',
    ],
    image: assets.about,
    imageLabel: 'Experience visual',
    accent: '#5de1b0',
    footer: 'Focused on useful systems, not just attractive screens.',
  },
  {
    filename: 'slide-05.png',
    duration: 3.0,
    background: ['#150f1f', '#06060b'],
    eyebrow: 'Ready to post',
    title: 'Made to share on LinkedIn and Contra.',
    subtitle:
      'Use this reel as a compact portfolio intro, then follow up with the live links and project details.',
    bullets: [
      'LinkedIn-ready format',
      'Contra-friendly reel',
      'One-file MP4 export',
    ],
    image: assets.avatar,
    imageLabel: 'Share-ready CTA',
    footer:
      'Update the links, post the reel, and pair it with your strongest project captions.',
    accent: '#f2c14e',
    social: true,
  },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fileToDataUri(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = extension === '.svg' ? 'image/svg+xml' : 'image/png';
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

function makeProjectCard(project, x, y, w, h) {
  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" stroke-width="1.1" />
      <rect x="18" y="18" width="${w - 36}" height="${h * 0.52}" rx="22" fill="rgba(0,0,0,0.2)" />
      <image href="${project.imageData}" x="18" y="18" width="${w - 36}" height="${h * 0.52}" preserveAspectRatio="xMidYMid slice" clip-path="inset(0 round 22px)" />
      <circle cx="${w - 52}" cy="${h * 0.58}" r="10" fill="${project.tone}" />
      <text x="22" y="${h * 0.67}" fill="#ffffff" font-size="30" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(project.name)}</text>
      <text x="22" y="${h * 0.67 + 40}" fill="rgba(255,255,255,0.72)" font-size="20" font-family="Arial, Helvetica, sans-serif">Project spotlight</text>
    </g>
  `;
}

function wrapLines(text, maxWords) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = [];

  words.forEach((word) => {
    current.push(word);
    if (current.length >= maxWords) {
      lines.push(current.join(' '));
      current = [];
    }
  });

  if (current.length) {
    lines.push(current.join(' '));
  }

  return lines;
}

function socialSlideBlocks() {
  return `
    <rect x="110" y="1340" width="380" height="250" rx="34" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.10)" />
    <text x="144" y="1398" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">LinkedIn</text>
    <text x="144" y="1442" fill="rgba(255,255,255,0.75)" font-size="23" font-family="Arial, Helvetica, sans-serif">Post a short intro</text>
    <text x="144" y="1484" fill="rgba(255,255,255,0.75)" font-size="23" font-family="Arial, Helvetica, sans-serif">and add project links.</text>
    <rect x="540" y="1340" width="430" height="250" rx="34" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.10)" />
    <text x="574" y="1398" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">Contra</text>
    <text x="574" y="1442" fill="rgba(255,255,255,0.75)" font-size="23" font-family="Arial, Helvetica, sans-serif">Use this reel as your</text>
    <text x="574" y="1484" fill="rgba(255,255,255,0.75)" font-size="23" font-family="Arial, Helvetica, sans-serif">lead visual on profile.</text>
  `;
}

async function main() {
  if (!ffmpegPath) {
    throw new Error('ffmpeg-static did not provide a binary path.');
  }

  await fs.mkdir(tempDir, { recursive: true });

  const preparedSlides = [];
  for (const slide of slides) {
    const imageData = await fileToDataUri(slide.image);
    let projectCardsSvg = '';

    if (slide.projectCards) {
      const cards = await Promise.all(
        slide.projectCards.map(async (project) => ({
          ...project,
          imageData: await fileToDataUri(project.image),
        }))
      );

      projectCardsSvg = [
        makeProjectCard(cards[0], 110, 1180, 270, 360),
        makeProjectCard(cards[1], 405, 1180, 270, 360),
        makeProjectCard(cards[2], 700, 1180, 270, 360),
      ].join('\n');
      slide.projectCardsSvg = projectCardsSvg;
    }

    preparedSlides.push({
      ...slide,
      imageData,
      projectCardsSvg,
    });
  }

  const slideFiles = [];
  for (const slide of preparedSlides) {
    const slidePath = path.join(tempDir, slide.filename);
    const backgroundSvg = await createSlideSvg(slide);
    await sharp(Buffer.from(backgroundSvg)).png().toFile(slidePath);
    slideFiles.push({ path: slidePath, duration: slide.duration });
  }

  await fs.copyFile(slideFiles[0].path, posterFile);

  const concatFile = path.join(tempDir, 'slides.txt');
  const concatContent = `${slideFiles
    .map(
      (slide) =>
        `file '${slide.path.replace(/'/g, "'\\''")}'\nduration ${slide.duration}`
    )
    .join(
      '\n'
    )}\nfile '${slideFiles[slideFiles.length - 1].path.replace(/'/g, "'\\''")}'\n`;

  await fs.writeFile(concatFile, concatContent, 'utf8');

  const ffmpegArgs = [
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    concatFile,
    '-vf',
    'fps=30,format=yuv420p',
    '-c:v',
    'libx264',
    '-movflags',
    '+faststart',
    outputFile,
  ];

  const result = spawnSync(ffmpegPath, ffmpegArgs, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`ffmpeg exited with code ${result.status}`);
  }

  console.log(`Portfolio reel created at ${outputFile}`);
}

async function createSlideSvg(slide) {
  const slideSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${slide.background[0]}" />
          <stop offset="100%" stop-color="${slide.background[1]}" />
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="12%" r="80%">
          <stop offset="0%" stop-color="${slide.accent}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${slide.accent}" stop-opacity="0" />
        </radialGradient>
        <clipPath id="heroClip-${slide.filename}">
          <rect x="650" y="300" width="340" height="520" rx="42" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#glow)" />
      <circle cx="930" cy="260" r="220" fill="${slide.accent}" fill-opacity="0.12" />
      <circle cx="120" cy="340" r="180" fill="#ffffff" fill-opacity="0.05" />
      <circle cx="860" cy="1430" r="210" fill="#ffffff" fill-opacity="0.04" />
      <rect x="60" y="60" width="960" height="1800" rx="52" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1.2" />
      <rect x="90" y="96" width="150" height="44" rx="22" fill="rgba(255,255,255,0.10)" />
      <text x="112" y="125" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">Portfolio Reel</text>
      <text x="110" y="240" fill="rgba(255,255,255,0.7)" font-size="24" font-family="Arial, Helvetica, sans-serif">${escapeXml(slide.eyebrow)}</text>
      ${renderTitle(slide.title, 110, 360)}
      ${renderParagraph(slide.subtitle, 110, 520, 36, 20)}
      ${renderBadges(slide.bullets, 110, 700, slide.accent)}
      <rect x="648" y="290" width="344" height="700" rx="44" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.2" />
      <image href="${slide.imageData}" x="660" y="302" width="320" height="520" preserveAspectRatio="xMidYMid meet" clip-path="url(#heroClip-${slide.filename})" />
      <rect x="660" y="858" width="320" height="116" rx="28" fill="rgba(0,0,0,0.28)" />
      <text x="688" y="906" fill="rgba(255,255,255,0.68)" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(slide.imageLabel)}</text>
      <text x="688" y="948" fill="#ffffff" font-size="29" font-weight="700" font-family="Arial, Helvetica, sans-serif">Built to stand out.</text>
      <rect x="110" y="1120" width="860" height="2" fill="rgba(255,255,255,0.12)" />
      ${slide.projectCardsSvg ?? ''}
      <text x="110" y="${slide.social ? 1240 : 1260}" fill="#ffffff" font-size="28" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(slide.footer)}</text>
      ${slide.social ? socialSlideBlocks() : ''}
      <rect x="110" y="1720" width="860" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
      <rect x="110" y="1720" width="${Math.round(860 * 0.9)}" height="6" rx="3" fill="${slide.accent}" />
    </svg>
  `;

  return slideSvg;
}

function renderTitle(title, x, y) {
  const titleLines = wrapLines(title, title.length > 20 ? 3 : 2);
  const lineHeight = 96;
  return titleLines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="#ffffff" font-size="88" font-weight="800" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`
    )
    .join('\n');
}

function renderParagraph(text, x, y, fontSize, wordsPerLine) {
  const lines = wrapLines(text, wordsPerLine);
  const lineHeight = Math.round(fontSize * 1.28);
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="rgba(255,255,255,0.76)" font-size="${fontSize}" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`
    )
    .join('\n');
}

function renderBadges(items, x, y, color) {
  return items
    .map((item, index) => {
      const offsetY = y + index * 68;
      return `
        <g transform="translate(${x}, ${offsetY})">
          <rect x="0" y="0" rx="18" ry="18" width="260" height="48" fill="rgba(255,255,255,0.08)" stroke="${color}" stroke-width="1.2" />
          <text x="20" y="31" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">${escapeXml(item)}</text>
        </g>
      `;
    })
    .join('\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
