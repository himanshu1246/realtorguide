const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the image paths
html = html.replace('"public/Case study/case study 3/image.jpg"', '"public/Case study/case study 3/image.webp"');
html = html.replace('"public/Case study/case study 4/image.jpg"', '"public/Case study/case study 4/image.webp"');
html = html.replace('"public/Case study/case study 5/image.jpg"', '"public/Case study/case study 5/image.avif"');
html = html.replace('"public/Case study/case study 6/image.jpg"', '"public/Case study/case study 6/image.webp"');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed image extensions for case studies 3, 4, 5, 6");
