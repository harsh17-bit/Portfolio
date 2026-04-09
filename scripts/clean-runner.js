const { spawn } = require('child_process');
const path = require('path');

const mode = process.argv[2];

if (!mode || (mode !== 'start' && mode !== 'build')) {
  console.error('Usage: node scripts/clean-runner.js <start|build>');
  process.exit(1);
}

const reactScriptsPath = path.join(
  process.cwd(),
  'node_modules',
  'react-scripts',
  'bin',
  'react-scripts.js'
);

const noisyPatterns = [
  /^Note that the development build is not optimized\.$/,
  /^To create a production build, use npm run build\.$/,
  /^\(node:\d+\) \[DEP[\w_]+\] DeprecationWarning:/,
  /^\(Use `node --trace-deprecation .*\)$/,
  /^assets by path /,
  /^asset /,
  /^\s+asset /,
  /^\s+\+ \d+ assets/,
  /^\s*cached modules /,
  /^\s*runtime modules /,
  /^\s*javascript modules /,
  /^\s*modules by path /,
  /^\s*modules by mime type /,
  /^\s*orphan modules /,
  /^\s*data:image\//,
  /^webpack \d/,
  /^Entrypoint /,
  /^\s*\./,
  /^\s*\+ \d+ modules/,
  /^\s*\+ \d+ assets/,
  /^\s*modules by path /,
  /^\s*modules by mime type /,
];

const alwaysShowPatterns = [
  /error/i,
  /failed to compile/i,
  /compiled successfully/i,
  /creating an optimized production build/i,
  /starting the development server/i,
  /audit/i,
  /localhost:/i,
  /on your network:/i,
];

const child = spawn(process.execPath, [reactScriptsPath, mode], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: process.env,
  windowsHide: false,
});

function shouldShowLine(line) {
  if (!line || !line.trim()) {
    return true;
  }

  const cleanLine = line.replace(/\u001b\[[0-9;]*m/g, '');

  if (alwaysShowPatterns.some((pattern) => pattern.test(cleanLine))) {
    return true;
  }

  return !noisyPatterns.some((pattern) => pattern.test(cleanLine));
}

function pipeFiltered(stream, target) {
  let buffer = '';

  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (shouldShowLine(line)) {
        target.write(line + '\n');
      }
    }
  });

  stream.on('end', () => {
    if (buffer && shouldShowLine(buffer)) {
      target.write(buffer + '\n');
    }
  });
}

pipeFiltered(child.stdout, process.stdout);
pipeFiltered(child.stderr, process.stderr);

child.on('close', (code) => {
  process.exit(code || 0);
});
