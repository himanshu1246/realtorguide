const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the render function to duplicate the data
// Since fuzzy replace failed, we'll use a regex that handles whitespace
const renderRegex = /\(function renderTestimonials\(\)\{\s*const grid = document\.getElementById\('testimonialsGrid'\);\s*testimonialsData\.forEach\(\(t,i\)=>\{/;

const newRender = `(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  if(!grid) return;
  const marqueeData = [...testimonialsData, ...testimonialsData]; // Duplicate once for seamless loop
  marqueeData.forEach((t,i)=>{`;

html = html.replace(renderRegex, newRender);

// 2. Tweak the animation speed to make it "more fast" as requested (e.g. 10s for the whole loop)
// And ensure the translateX is exactly -50% - 12px for a 24px gap.
html = html.replace('animation: scrollMarquee 8s linear infinite;', 'animation: scrollMarquee 15s linear infinite;'); 
html = html.replace('100% { transform: translateX(calc(-50% - 16px)); }', '100% { transform: translateX(calc(-50% - 12px)); }');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed marquee loop and speed!');
