const fs = require('fs');
const path = require('path');

function revertColorsInString(content) {
  // 1. Revert Gradients first
  content = content.replace(/linear-gradient\(135deg, #FED5FF, #E7C5FF, #C8B6FE, #B8C0FF, #BDCFFF\)/g, 'linear-gradient(135deg, #49225B, #6E3482, #A56ABD)');
  content = content.replace(/linear-gradient\(135deg,#FED5FF,#E7C5FF,#C8B6FE,#B8C0FF,#BDCFFF\)/g, 'linear-gradient(135deg,#49225B,#6E3482,#A56ABD)');
  content = content.replace(/linear-gradient\(90deg,#FED5FF,#BDCFFF\)/g, 'linear-gradient(90deg,#49225B,#6E3482)');
  content = content.replace(/linear-gradient\(180deg,#FED5FF,#BDCFFF\)/g, 'linear-gradient(180deg,#49225B,#6E3482)');

  // 2. Revert Button Text Color Fix
  content = content.replace(/color: #0F172A;\n\s*background: linear-gradient/g, 'color: #F5EBFA;\n  background: linear-gradient');
  content = content.replace(/color:#0F172A; font-weight:700;/g, 'color:#F5EBFA; font-weight:700;');

  // 3. Revert Global Colors
  content = content.replace(/#FED5FF/gi, '#F5EBFA'); // Main BG
  content = content.replace(/#E7C5FF/gi, '#E7DBEF'); // Secondary BG / Cards
  content = content.replace(/#0F172A/gi, '#49225B'); // Dark Slate -> Darkest
  content = content.replace(/#B8C0FF/gi, '#6E3482'); // Primary Accent
  content = content.replace(/#C8B6FE/gi, '#A56ABD'); // Secondary Accent
  
  return content;
}

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = revertColorsInString(html);
// Double check btn-primary text color
html = html.replace(/\.btn-primary \{([\s\S]*?)color: #0F172A;/g, '.btn-primary {$1color: #F5EBFA;');
html = html.replace(/\.btn-primary:hover \{([\s\S]*?)color: #0F172A;/g, '.btn-primary:hover {$1color: #F5EBFA;');
fs.writeFileSync('index.html', html, 'utf8');

// Update Next.js globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = revertColorsInString(css);
fs.writeFileSync('src/app/globals.css', css, 'utf8');

// Update React components
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
  content = revertColorsInString(content);
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully reverted Cotton Candy theme back to Deep Purple!');
