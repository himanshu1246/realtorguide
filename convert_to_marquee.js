const fs = require('fs');

const filePaths = ['index.html', 'public/index.html'];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update the HTML for the Production section
  // Replace everything from `<div class="video-carousel-wrapper">` down to `<!-- ===== SERVICES ===== -->`
  const htmlStart = content.indexOf('<div class="video-carousel-wrapper">');
  const htmlEnd = content.indexOf('<!-- ===== SERVICES ===== -->');
  
  if (htmlStart !== -1 && htmlEnd !== -1) {
    const replacementHTML = `
  <div class="clients-marquee-wrapper" style="overflow: hidden; width: 100vw; margin-left: calc(-50vw + 50%); position: relative; margin-top: 40px; margin-bottom: 80px; -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);">
    <div class="clients-marquee-track" id="videoCarousel" style="display: flex; gap: 24px; width: max-content; animation: scrollMarquee 35s linear infinite;">
      <!-- Video cards injected by JS -->
    </div>
  </div>
</section>

`;
    content = content.substring(0, htmlStart) + replacementHTML + content.substring(htmlEnd);
  }

  // 2. Update videosData array
  const videosDataRegex = /const videosData = \[[\s\S]*?\];/;
  const newVideosData = `const videosData = [
  { src:'PRODUCTION SHOWCASE/number 1.mp4', title:'Ali Abdal', category:'Fully customizable' },
  { src:'PRODUCTION SHOWCASE/number 2.mp4', title:'Luxury Villa Tour', category:'Real Estate' },
  { src:'PRODUCTION SHOWCASE/number 3.mp4', title:'City Apartment', category:'Cinematic' },
  { src:'PRODUCTION SHOWCASE/number 4.MP4', title:'Modern Estate', category:'Walkthrough' },
  { src:'PRODUCTION SHOWCASE/number 5.mp4', title:'Penthouse View', category:'Lifestyle' },
  { src:'PRODUCTION SHOWCASE/number 6.mp4', title:'Premium Villa', category:'Real Estate' },
  { src:'PRODUCTION SHOWCASE/number 7.mp4', title:'Urban Loft', category:'Cinematic' },
  { src:'PRODUCTION SHOWCASE/number 8.mp4', title:'Estate Tour', category:'Walkthrough' }
];`;
  content = content.replace(videosDataRegex, newVideosData);

  // 3. Completely replace the Coverflow Logic with Marquee Logic
  // Find `// Videos Coverflow Logic` down to the end of `(function renderVideos()`
  const jsStart = content.indexOf('// Videos Coverflow Logic');
  const jsEnd = content.indexOf('// Services');
  
  if (jsStart !== -1 && jsEnd !== -1) {
    const newJS = `// Videos Marquee Logic
(function renderVideos(){
  const carousel = document.getElementById('videoCarousel');
  if(!carousel) return;
  carousel.innerHTML = '';
  
  carousel.addEventListener('mouseenter', () => carousel.style.animationPlayState = 'paused');
  carousel.addEventListener('mouseleave', () => carousel.style.animationPlayState = 'running');

  let cardsHTML = '';
  videosData.forEach((vid, i) => {
    cardsHTML += \`
      <div class="video-card" onclick="toggleProductionVideo(this, event)" style="width: 320px; flex-shrink: 0; position: relative;">
        <video src="\${vid.src}" playsinline preload="metadata" style="width:100%; height:100%; object-fit:cover; border-radius:24px;"></video>
        <div class="video-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.4); display:flex; flex-direction:column; justify-content:center; align-items:center; border-radius:24px; transition:0.3s; z-index:2;">
          <div class="play-btn" style="width:60px; height:60px; border-radius:50%; background:rgba(255,255,255,0.2); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; transition:0.3s;">
            <svg viewBox="0 0 24 24" style="width:24px; height:24px; fill:#fff; margin-left:4px;"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-info" style="position:absolute; bottom:20px; left:20px; right:20px; z-index:3;">
          <h3 style="color:#fff; font-size:1.2rem; font-weight:700; margin-bottom:8px;">\${vid.title}</h3>
          <span class="badge" style="background:rgba(255,255,255,0.2); color:#fff; padding:4px 12px; border-radius:20px; font-size:0.8rem; backdrop-filter:blur(4px);">\${vid.category}</span>
        </div>
      </div>
    \`;
  });
  
  carousel.innerHTML = cardsHTML + cardsHTML; // Duplicate for endless scroll
})();

window.toggleProductionVideo = function(card, e) {
  if(e) e.stopPropagation();
  const video = card.querySelector('video');
  const overlay = card.querySelector('.video-overlay');
  
  if(video.paused) {
    document.querySelectorAll('.video-card').forEach(c => {
      if(c !== card) {
        c.querySelector('video').pause();
        c.querySelector('.video-overlay').style.opacity = '1';
      }
    });
    video.muted = false;
    video.play();
    overlay.style.opacity = '0';
  } else {
    video.pause();
    overlay.style.opacity = '1';
  }
};

`;
    content = content.substring(0, jsStart) + newJS + content.substring(jsEnd);
  }

  // Double-check if Share Your Story was removed. The user said it's still there!
  // In index.html, line 1162: `<button class="btn-secondary-light" onclick="openModal()">Share Your Story</button>`
  content = content.replace(/<button class="btn-secondary-light" onclick="openModal\(\)">Share Your Story<\/button>/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log("Successfully converted to marquee and added new videos.");
