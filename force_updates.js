const fs = require('fs');
const filePaths = ['index.html', 'public/index.html'];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove Share Your Story
  content = content.replace(/<button class="btn-secondary-light" onclick="openModal\(\)">Share Your Story<\/button>/g, '');

  // 2. Remove subtitle
  content = content.replace(/<p class="production-note"[^>]*>Dozens of fully customizable templates in all desi language<\/p>/g, '');

  // 3. Update production gallery grid to marquee
  content = content.replace(/<div class="gallery-grid" id="productionGallery"><\/div>/g, 
`<div class="marquee-wrapper">
  <div class="marquee-track" id="productionGallery"></div>
</div>`);

  // 4. Update productionVideos array
  content = content.replace(/const productionVideos = \[\s*\{\s*src:'PRODUCTION SHOWCASE\/number 1\.mp4'[\s\S]*?\}\s*\];/g, 
`const productionVideos = [
  { src:'PRODUCTION SHOWCASE/number 1.mp4', title:'Ali Abdal', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 2.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 3.mp4', title:'Iman Gadzhi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 4.MP4', title:'Dev Gadhvi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 5.mp4', title:'Dev Gadhvi', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 6.mp4', title:'Production 6', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 7.mp4', title:'Production 7', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 8.mp4', title:'Production 8', category:'Fully customizable' }
];`);

  // 5. Update initProductionGallery
  content = content.replace(/function initProductionGallery\(\)\{[\s\S]*?\}\s*(?=\n\/\/ ===== TESTIMONIALS =====)/, 
`function initProductionGallery(){
  const gallery = document.getElementById('productionGallery');
  if(!gallery) return;
  gallery.innerHTML = '';
  
  gallery.style.display = 'flex';
  gallery.style.gap = '1.5rem';
  gallery.style.width = 'max-content';
  gallery.style.animation = 'scrollMarquee 35s linear infinite';
  
  gallery.addEventListener('mouseenter', () => gallery.style.animationPlayState = 'paused');
  gallery.addEventListener('mouseleave', () => gallery.style.animationPlayState = 'running');

  let cardsHTML = '';
  productionVideos.forEach((vid) => {
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
  
  gallery.innerHTML = cardsHTML + cardsHTML;
}
`);

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Forced updates done.");
