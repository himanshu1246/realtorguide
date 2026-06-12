const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('animation: scrollMarquee 12s linear infinite;', 'animation: scrollMarquee 8s linear infinite;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Sped up testimonials marquee even more!');
