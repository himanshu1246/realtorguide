const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The fuzzy matcher deleted the `<script>` and `clientsData` and part of `videosData`.
// We need to restore the script tags and `clientsData` and `videosData`.
// Let's find exactly where it deleted it. It deleted right after `</div>` (the footer)
// Let's replace the broken videosData part.

const brokenPart = `  { src:'public/PRODUCTION SHOWCASE/number 3.mp4', title:'City Apartment', category:'Cinematic' },`;

const fixedPart = `<!-- ===== SCRIPTS ===== -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
// ===== DATA =====
const clientsData = [
  { name:'Raheja Universal', type:'Case Study', location:'Juinagar' },
  { name:'Siddhivinayak', type:'Case Study', location:'Pushpak Nagar' },
  { name:'Paradise Pyramid', type:'Case Study', location:'Juinagar' },
  { name:'Neelkant Darshan', type:'Case Study', location:'Kharghar' },
  { name:'Magnus', type:'Case Study', location:'Ulwe' },
  { name:'The Woods (Plot)', type:'Case Study', location:'Karjat' },
  { name:'DLF Plot & Bungalow', type:'Case Study', location:'Gurugram' },
  { name:'Canal House', type:'Case Study', location:'Zirakpur Chandigarh' },
  { name:'Skymark (Plot)', type:'Case Study', location:'Lucknow' }
];

const videosData = [
  { src:'public/PRODUCTION SHOWCASE/number 1.mp4', title:'Ali Abdal', category:'Fully customizable' },
  { src:'public/PRODUCTION SHOWCASE/number 2.mp4', title:'Luxury Villa Tour', category:'Real Estate' },
  { src:'public/PRODUCTION SHOWCASE/number 3.mp4', title:'City Apartment', category:'Cinematic' },`;

html = html.replace(brokenPart, fixedPart);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Restored deleted script tags and inserted 9 case study clients.");
