const fs = require('fs');
const path = require('path');

function replaceColorsInString(content) {
  // 1. Text Colors
  content = content.replace(/#1F2937/gi, '#49225B');
  content = content.replace(/#1E1B4B/gi, '#49225B');
  
  // 2. Background Colors
  content = content.replace(/#F4E7F8/gi, '#F5EBFA');
  content = content.replace(/#F2DDDC/gi, '#E7DBEF');
  content = content.replace(/#F8F6FF/gi, '#F5EBFA');
  content = content.replace(/#F0ECFF/gi, '#E7DBEF');
  content = content.replace(/#ffffff/g, '#E7DBEF');
  content = content.replace(/#FFFFFF/g, '#E7DBEF');
  content = content.replace(/#EDE9FE/gi, '#E7DBEF');
  
  // 3. Accent Colors
  content = content.replace(/#F6BCBA/gi, '#A56ABD');
  content = content.replace(/#E3AADD/gi, '#6E3482');
  content = content.replace(/#C8A8E9/gi, '#6E3482');
  content = content.replace(/#C3C7F4/gi, '#A56ABD');
  content = content.replace(/#C4B5FD/gi, '#A56ABD');
  content = content.replace(/#8B5CF6/gi, '#6E3482');
  content = content.replace(/#6D28D9/gi, '#49225B');
  
  // 4. Update Gradients specific to new aesthetic
  content = content.replace(/linear-gradient\(135deg, #A56ABD, #6E3482, #6E3482, #A56ABD\)/g, 'linear-gradient(135deg, #49225B, #6E3482, #A56ABD)');
  content = content.replace(/linear-gradient\(135deg,#A56ABD,#6E3482,#6E3482,#A56ABD\)/g, 'linear-gradient(135deg,#49225B,#6E3482,#A56ABD)');
  content = content.replace(/linear-gradient\(135deg,#6E3482,#6E3482,#A56ABD\)/g, 'linear-gradient(135deg,#49225B,#6E3482,#A56ABD)');
  content = content.replace(/linear-gradient\(90deg,#6E3482,#6E3482\)/g, 'linear-gradient(90deg,#49225B,#6E3482)');
  content = content.replace(/linear-gradient\(180deg,#6E3482,#6E3482\)/g, 'linear-gradient(180deg,#49225B,#6E3482)');

  // 5. Button Text Color Fix
  // Since primary buttons now have dark purple bg (#6E3482), text must be light
  content = content.replace(/color: #49225B;\n\s*background: linear-gradient/g, 'color: #F5EBFA;\n  background: linear-gradient');
  content = content.replace(/color:#49225B; font-weight:700;/g, 'color:#F5EBFA; font-weight:700;');

  return content;
}

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = replaceColorsInString(html);
// Fix specific button text color in html
html = html.replace(/\.btn-primary \{([\s\S]*?)color: #49225B;/g, '.btn-primary {$1color: #F5EBFA;');
html = html.replace(/\.btn-primary:hover \{([\s\S]*?)color: #49225B;/g, '.btn-primary:hover {$1color: #F5EBFA;');
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

console.log('Successfully applied Deep Purple monochromatic palette!');
