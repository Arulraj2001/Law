const fs = require('fs');
const path = require('path');

const targetFile = path.join(process.cwd(), 'src', 'lib', 'constants.ts');
if (fs.existsSync(targetFile)) {
  const content = fs.readFileSync(targetFile, 'utf8');
  const matches = content.match(/XXXXX|placeholder|yourdomain/g);
  if (matches && matches.length > 0) {
    console.log('Found placeholders — update before deploy');
  } else {
    console.log('No obvious placeholders found');
  }
} else {
  console.log('src/lib/constants.ts not found');
}
