const fs = require('fs');
const path = require('path');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/#1E1B4B/gi, '#1F2937');
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = css.replace(/#1E1B4B/gi, '#1F2937');
fs.writeFileSync('src/app/globals.css', css, 'utf8');

// 3. Update React components
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = getFiles('src/components');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/#1E1B4B/gi, '#1F2937');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully replaced dark purple with dark charcoal');
