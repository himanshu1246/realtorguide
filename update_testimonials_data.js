const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /const testimonialsData = \[[\s\S]*?\];/;

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

html = html.replace(regex, newTestimonialsData);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated testimonials data properly!");
