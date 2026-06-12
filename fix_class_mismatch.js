const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the class mismatch
html = html.replace('id="testimonialsGrid" class="testimonials-marquee-track"', 'id="testimonialsGrid" class="testimonials-grid"');
html = html.replace('<div class="testimonials-marquee-track" id="testimonialsGrid">', '<div class="testimonials-grid" id="testimonialsGrid">');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed testimonialsGrid class");
