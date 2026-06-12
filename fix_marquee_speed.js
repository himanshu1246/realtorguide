const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Revert the class name mistake
html = html.replace('id="testimonialsGrid" class="testimonials-marquee-track"', 'id="testimonialsGrid" class="testimonials-grid"');

// Change speed from 30s to 60s
const oldAnim = '.testimonials-grid {\n  display: flex;\n  gap: 32px;\n  width: max-content;\n  animation: scrollMarquee 30s linear infinite;\n}';
const newAnim = '.testimonials-grid {\n  display: flex;\n  gap: 32px;\n  width: max-content;\n  animation: scrollMarquee 60s linear infinite;\n}';

// Just in case whitespace is slightly different, let's use replace with string on the exact line.
html = html.replace('animation: scrollMarquee 30s linear infinite;\n}', 'animation: scrollMarquee 60s linear infinite;\n}');

// Actually, wait, it might be safer to do:
html = html.replace(/animation: scrollMarquee 30s linear infinite;(\s*\})/g, 'animation: scrollMarquee 60s linear infinite;$1');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed class name and slowed down animation!");
