const fs = require('fs');
const path = require('path');

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

  // Replace colors
  content = content.replace(/#8B5CF6/gi, '#E3AADD'); // Primary purple to pink
  content = content.replace(/#6D28D9/gi, '#C8A8E9'); // Dark purple to lavender
  content = content.replace(/#4C1D95/gi, '#C3C7F4'); // Deep purple to periwinkle
  
  content = content.replace(/#F8F6FF/gi, '#F4E7F8'); // Main BG to pale pink
  content = content.replace(/#F0ECFF/gi, '#F2DDDC'); // Accent BG to pale peach
  
  content = content.replace(/#C4B5FD/gi, '#C8A8E9'); // Light purple to lavender
  content = content.replace(/#E2D4FD/gi, '#F4E7F8');
  
  content = content.replace(/#ffffff/gi, '#F2DDDC'); // Cards BG to pale peach
  content = content.replace(/#FFFFFF/g, '#F2DDDC'); // Cards BG to pale peach

  content = content.replace(/rgba\(139,92,246,/g, 'rgba(227,170,221,'); // rgba of 8B5CF6 to E3AADD

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully updated React components.');
