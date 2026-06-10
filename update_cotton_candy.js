const fs = require('fs');
const path = require('path');

function replaceColorsInString(content) {
  // 1. Gradients first (so they don't get messed up by individual color replacements)
  content = content.replace(/linear-gradient\(135deg, #49225B, #6E3482, #A56ABD\)/g, 'linear-gradient(135deg, #FED5FF, #E7C5FF, #C8B6FE, #B8C0FF, #BDCFFF)');
  content = content.replace(/linear-gradient\(135deg,#49225B,#6E3482,#A56ABD\)/g, 'linear-gradient(135deg,#FED5FF,#E7C5FF,#C8B6FE,#B8C0FF,#BDCFFF)');
  content = content.replace(/linear-gradient\(90deg,#49225B,#6E3482\)/g, 'linear-gradient(90deg,#FED5FF,#BDCFFF)');
  content = content.replace(/linear-gradient\(180deg,#49225B,#6E3482\)/g, 'linear-gradient(180deg,#FED5FF,#BDCFFF)');

  // 2. Button Text Color Fix (Since buttons are now pastel, text must be dark)
  content = content.replace(/color: #F5EBFA;\n\s*background: linear-gradient/g, 'color: #0F172A;\n  background: linear-gradient');
  content = content.replace(/color:#F5EBFA; font-weight:700;/g, 'color:#0F172A; font-weight:700;');

  // 3. Global Color Replacements
  content = content.replace(/#F5EBFA/gi, '#FED5FF'); // Main BG
  content = content.replace(/#E7DBEF/gi, '#E7C5FF'); // Secondary BG / Cards
  content = content.replace(/#49225B/gi, '#0F172A'); // Darkest -> Dark Slate
  content = content.replace(/#6E3482/gi, '#B8C0FF'); // Primary Accent
  content = content.replace(/#A56ABD/gi, '#C8B6FE'); // Secondary Accent
  
  // Specific fix for text inside hero cards or buttons that might have been mapped to F5EBFA and are now FED5FF, but need to be 0F172A
  // Since we replaced F5EBFA -> FED5FF globally, we should check if there's any text explicitly set to FED5FF that should be dark.
  // Actually, the HTML structure is mostly standard. The body text is set to #0F172A (from #49225B).
  
  return content;
}

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = replaceColorsInString(html);
// Double check btn-primary text color
html = html.replace(/\.btn-primary \{([\s\S]*?)color: #FED5FF;/g, '.btn-primary {$1color: #0F172A;');
html = html.replace(/\.btn-primary:hover \{([\s\S]*?)color: #FED5FF;/g, '.btn-primary:hover {$1color: #0F172A;');
fs.writeFileSync('index.html', html, 'utf8');

// Update Next.js globals.css
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css = replaceColorsInString(css);
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
  content = replaceColorsInString(content);
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully applied Cotton Candy Pastel palette!');
