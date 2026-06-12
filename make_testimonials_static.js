const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace testimonials-marquee-container CSS
const oldContainerCSS = `.testimonials-marquee-container {
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  padding: 20px 0 60px 0;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}`;

const newContainerCSS = `.testimonials-marquee-container {
  width: 100%;
  position: relative;
  padding: 20px 0 60px 0;
}`;

html = html.replace(oldContainerCSS, newContainerCSS);

// Replace testimonials-grid CSS
const oldGridCSS = `.testimonials-grid {
  display: flex;
  gap: 32px;
  width: max-content;
  animation: scrollMarquee 25s linear infinite;
}`;

const newGridCSS = `.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}`;

html = html.replace(oldGridCSS, newGridCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Made testimonials static grid.");
