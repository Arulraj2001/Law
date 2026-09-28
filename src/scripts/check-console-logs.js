const fs = require('fs');
const path = require('path');

function scanDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (!file.includes('.test.')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const targetDirs = [
  path.join(process.cwd(), 'src', 'components'),
  path.join(process.cwd(), 'src', 'app'),
];

let foundLogs = [];
for (const dir of targetDirs) {
  const files = scanDir(dir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (
        line.includes('console.log') &&
        !line.includes('console.error') &&
        !line.includes('console.warn')
      ) {
        foundLogs.push(
          `${path.relative(process.cwd(), file)}:${idx + 1}: ${line.trim()}`
        );
      }
    });
  }
}

if (foundLogs.length > 0) {
  foundLogs.forEach((log) => console.log(log));
} else {
  console.log('No console.log found');
}
