const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add new videos to testimonialsData
const oldTestimonialsData = `const testimonialsData = [
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 1.mp4', name:'Happy Client', role:'Real Estate Developer', initial:'H',
    quote:'They completely transformed our lead generation process and helped us close deals faster.' },
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 2.mp4', name:'Satisfied Partner', role:'Luxury Broker', initial:'S',
    quote:'The quality of videos and ROI on our ad campaigns have been incredible.' }
];`;

const newTestimonialsData = `const testimonialsData = [
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 1.mp4', name:'Happy Client', role:'Real Estate Developer', initial:'H',
    quote:'They completely transformed our lead generation process and helped us close deals faster.' },
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 2.mp4', name:'Satisfied Partner', role:'Luxury Broker', initial:'S',
    quote:'The quality of videos and ROI on our ad campaigns have been incredible.' },
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 3.mp4', name:'Premium Builder', role:'Real Estate Developer', initial:'P',
    quote:'The best marketing decision we made. Incredible leads and branding.' },
  { video:'public/CLIENT TESTIMONIALS/client testimonial video 4.mp4', name:'Top Broker', role:'Property Consultant', initial:'T',
    quote:'Our sales velocity doubled after partnering with them. Highly recommended.' }
];`;

html = html.replace(oldTestimonialsData, newTestimonialsData);

// 2. Clean up testimonials-marquee-container duplication
const badDuplication = `<div class="testimonials-marquee-container">
      <div class="testimonials-marquee-container">
      <div class="testimonials-grid" id="testimonialsGrid">
      <!-- Cards injected by JS -->
      </div>
    </div>`;

const fixedDuplication = `<div class="testimonials-marquee-container">
      <div class="testimonials-marquee-track" id="testimonialsGrid">
      <!-- Cards injected by JS -->
      </div>
    </div>`;

html = html.replace(badDuplication, fixedDuplication);

// Wait, I also need to make sure the CSS uses .testimonials-marquee-track not .testimonials-grid if I changed the ID or class.
// make_marquee.js changed the CSS, but wait... `renderTestimonials` still appends to `testimonialsGrid` which has `id="testimonialsGrid"`.
// And my CSS in make_marquee.js targeted `.testimonials-marquee-track`!
// Let's ensure the JS uses the right track structure.
html = html.replace('id="testimonialsGrid" class="testimonials-grid"', 'id="testimonialsGrid" class="testimonials-marquee-track"');

// 3. Update speed from 20s to 50s
html = html.replace('animation: scrollMarquee 20s linear infinite;', 'animation: scrollMarquee 50s linear infinite;');

// 4. Update hero card size
// Find the 420px max-width rule
html = html.replace('.hero-card-wrapper { max-width:420px; margin:0 auto; }', '.hero-card-wrapper { max-width:1000px; width:100%; margin:0 auto; }');
html = html.replace('.hero-card-wrapper { max-width: 420px; margin: 0 auto; }', '.hero-card-wrapper { max-width:1000px; width:100%; margin:0 auto; }');

// 5. Expand hero card internal metric layout so it doesn't look weird when stretched
html = html.replace('.hero-card-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; transform:translateZ(30px); }', '.hero-card-metrics { display:flex; justify-content: space-around; gap:16px; margin-bottom:24px; transform:translateZ(30px); width: 100%; }');

html = html.replace('.hero-card-leads {\n', '.hero-card-leads {\n  display:flex; justify-content:center; text-align:center;\n');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated testimonials and hero card width!");
