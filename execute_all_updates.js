const fs = require('fs');
const path = require('path');

const targetFile = 'index.html';
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Inject the `<base>` tag script right after `<head>`
const baseScript = `
<script>
  // Fix for local viewing: if opened locally outside the public folder, point assets to public/
  if (window.location.protocol === 'file:' && window.location.pathname.indexOf('/public/index.html') === -1) {
    var base = document.createElement('base');
    base.href = 'public/';
    document.head.prepend(base);
  }
</script>
`;
if (!content.includes("base.href = 'public/';")) {
  content = content.replace('<head>', '<head>\n' + baseScript);
}

// 2. Remove "Share your story" button
// The button in testimonials: `<a href="#contact" class="btn-outline">Share Your Story</a>`
content = content.replace(/<a href="#contact" class="btn-outline">Share Your Story<\/a>/g, '');

// 3. Remove Production Showcase subtitle
// The subtitle: `<p class="section-subtitle">Dozens of fully customizable templates in all desi language</p>`
// Wait, we need to match it accurately. Let's use regex.
content = content.replace(/<p class="section-subtitle">Dozens of fully customizable templates in all desi language<\/p>/g, '');

// 4. Convert Production Showcase to scrolling marquee
// Currently the HTML is:
// <div class="gallery-grid" id="productionGallery"></div>
// Let's replace it with the marquee structure
const oldGalleryGrid = '<div class="gallery-grid" id="productionGallery"></div>';
const newGalleryMarquee = `
<div class="marquee-wrapper">
  <div class="marquee-track" id="productionGallery"></div>
</div>
`;
content = content.replace(oldGalleryGrid, newGalleryMarquee);

// Now update the CSS for the marquee track
// Wait, we can reuse the same classes! We just need to ensure `productionGallery` has `display: flex; gap: 1.5rem;`
// We'll update the JS `initProductionGallery()` instead.

// Update the `productionVideos` array in JS to include 6, 7, and 8
const oldVideosArrayStart = 'const productionVideos = [';
const oldVideosArray = `const productionVideos = [
  { src:'PRODUCTION SHOWCASE/number 1.mp4', title:'Ali Abdal', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 2.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 3.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 4.MP4', title:'Dev Gadhvi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 5.mp4', title:'Dev Gadhvi', category:'Fully customizable' }
];`;

const newVideosArray = `const productionVideos = [
  { src:'PRODUCTION SHOWCASE/number 1.mp4', title:'Ali Abdal', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 2.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 3.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 4.MP4', title:'Dev Gadhvi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 5.mp4', title:'Dev Gadhvi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 6.mp4', title:'Production 6', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 7.mp4', title:'Production 7', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 8.mp4', title:'Production 8', category:'Fully customizable' }
];`;

if (content.includes(oldVideosArray)) {
  content = content.replace(oldVideosArray, newVideosArray);
} else {
  // Try regex if spacing differs
  content = content.replace(/const productionVideos = \[\s*\{[\s\S]*?\}\s*\];/, newVideosArray);
}

// Update `initProductionGallery` to clone items and add marquee styles
const oldInitGallery = `function initProductionGallery(){
  const gallery = document.getElementById('productionGallery');
  if(!gallery) return;
  gallery.innerHTML = '';
  productionVideos.forEach((vid, i) => {
    gallery.innerHTML += \`
      <div class="video-card" onclick="toggleProductionVideo(this, event)">
        <video src="\${vid.src}" loop playsinline preload="metadata"></video>
        <div class="video-overlay">
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-info">
          <h3>\${vid.title}</h3>
          <span class="badge">\${vid.category}</span>
        </div>
      </div>
    \`;
  });
}`;

const newInitGallery = `function initProductionGallery(){
  const gallery = document.getElementById('productionGallery');
  if(!gallery) return;
  gallery.innerHTML = '';
  
  // Apply marquee animation styles dynamically
  gallery.style.display = 'flex';
  gallery.style.gap = '1.5rem';
  gallery.style.width = 'max-content';
  gallery.style.animation = 'scrollMarquee 35s linear infinite';
  
  // Pause animation on hover
  gallery.addEventListener('mouseenter', () => gallery.style.animationPlayState = 'paused');
  gallery.addEventListener('mouseleave', () => gallery.style.animationPlayState = 'running');

  // Build the HTML for the cards
  let cardsHTML = '';
  productionVideos.forEach((vid, i) => {
    cardsHTML += \`
      <div class="video-card" onclick="toggleProductionVideo(this, event)" style="width: 320px; flex-shrink: 0;">
        <video src="\${vid.src}" loop playsinline preload="metadata"></video>
        <div class="video-overlay">
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-info">
          <h3>\${vid.title}</h3>
          <span class="badge">\${vid.category}</span>
        </div>
      </div>
    \`;
  });
  
  // Duplicate for endless scroll
  gallery.innerHTML = cardsHTML + cardsHTML;
}`;

if (content.includes('function initProductionGallery()')) {
  content = content.replace(/function initProductionGallery\(\)\{[\s\S]*?\n\}/, newInitGallery);
}

fs.writeFileSync(targetFile, content, 'utf8');

// Also update public/index.html to match completely, EXCEPT the script logic since it's smart!
fs.copyFileSync(targetFile, 'public/index.html');

console.log("SUCCESS!");
