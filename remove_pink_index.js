const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the pink button gradient with solid indigo #5A3AE2
html = html.replace(/linear-gradient\(90deg,\s*#F442C2,\s*#E231AE\)/gi, '#5A3AE2');

// Replace the pink background with indigo #5A3AE2 (if any)
html = html.replace(/#F442C2/gi, '#5A3AE2');
html = html.replace(/#E231AE/gi, '#5A3AE2');
html = html.replace(/#E3AADD/gi, '#7B5CF6'); // purple light
html = html.replace(/#F6BCBA/gi, '#7B5CF6'); // pinkish gradient parts

// Remove peach colors 
html = html.replace(/#F4E7F8/gi, '#FFFFFF');
html = html.replace(/#F2DDDC/gi, '#F8F7FF');

// Replace older text gradients
html = html.replace(/linear-gradient\(135deg,\s*#[a-f0-9]+,\s*#[a-f0-9]+,\s*#[a-f0-9]+,\s*#[a-f0-9]+\)/gi, '#5A3AE2');

// If there are any stray pink gradients
html = html.replace(/linear-gradient\(90deg,\s*#7B5CF6,\s*#6340E8\)/gi, 'linear-gradient(90deg, #5A3AE2, #4022B8)');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html to remove pink and use Indigo");
