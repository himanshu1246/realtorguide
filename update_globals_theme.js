const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(/#F5EBFA/gi, '#F4E7F8'); // Main BG
css = css.replace(/#E7DBEF/gi, '#F2DDDC'); // Secondary BG / Cards

// Gradients and Text Colors
css = css.replace(/linear-gradient\(135deg, #6E3482 0%, #49225B 50%, #4C1D95 100%\)/gi, 'linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4)');
css = css.replace(/linear-gradient\(135deg, #6E3482 0%, #49225B 100%\)/gi, 'linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4)');
css = css.replace(/background-size: 200% 200%;\\n  animation: sunsetGradient 5s ease infinite;/g, ''); // in case we append it twice

// Add sunset gradient animation if not present
if (!css.includes('sunsetGradient')) {
    css += `
@keyframes sunsetGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
}

css = css.replace(/\.btn-primary \{([\s\S]*?)background: linear-gradient.*?;/g, '.btn-primary {$1background: linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4);\n  background-size: 200% 200%;\n  animation: sunsetGradient 5s ease infinite;');
css = css.replace(/\.gradient-text \{([\s\S]*?)background: linear-gradient.*?;/g, '.gradient-text {$1background: linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4);\n  background-size: 200% 200%;\n  animation: sunsetGradient 5s ease infinite;');

// Button Text color
css = css.replace(/color: #F2DDDC;/gi, 'color: #1E1B4B;'); // Old #E7DBEF is now #F2DDDC, change to dark text
css = css.replace(/color: #49225B;/gi, 'color: #1E1B4B;');

// Other Purples
css = css.replace(/#8B5CF6/gi, '#E3AADD');
css = css.replace(/#6E3482/gi, '#E3AADD');
css = css.replace(/#A56ABD/gi, '#C8A8E9');
css = css.replace(/#4C1D95/gi, '#C3C7F4');
css = css.replace(/#49225B/gi, '#1E1B4B');

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log('Successfully updated globals.css theme');
