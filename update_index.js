const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace CSS
const cssStart = html.indexOf('/* ===== KALAKAR 3D CAROUSEL ===== */');
const cssEnd = html.indexOf('/* ===== PROCESS ===== */');

const newCss = `/* ===== KALAKAR 3D CAROUSEL ===== */
.video-carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 40px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.video-carousel {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
}
.video-card {
  position: absolute;
  width: 280px;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  background: #111;
  cursor: pointer;
  will-change: transform, opacity, z-index;
}
.video-card video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}
.video-card.active-card {
  box-shadow: 0 25px 50px rgba(139,92,246,0.4);
}
.video-card:not(.active-card) video {
  opacity: 0.5;
}
.video-card:not(.active-card):hover video {
  opacity: 0.8;
}
.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
  color: #fff;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}
.video-card.active-card .video-overlay {
  opacity: 1;
  transform: translateY(0);
}
.video-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.video-category {
  display: inline-block;
  background: rgba(139,92,246,0.25);
  border: 1px solid rgba(139,92,246,0.4);
  color: #E2D4FD;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 5;
}
.video-card.playing .video-play-btn {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
.video-play-btn svg { width: 20px; height: 20px; fill: #fff; margin-left: 3px; }

/* Control Bar */
.video-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1f2125;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 40px;
  padding: 8px;
  width: 100%;
  max-width: 340px;
  margin-top: 30px;
  z-index: 20;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.video-controls-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.video-controls-btn:hover {
  background: rgba(255,255,255,0.15);
}
.video-controls-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.video-controls-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}
.video-controls-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #000;
}
.video-controls-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-controls-text {
  display: flex;
  flex-direction: column;
}
.video-controls-title {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
}
.video-controls-cat {
  color: #8B5CF6;
  font-size: 0.7rem;
  font-weight: 500;
}
@media (max-width: 768px) {
  .video-carousel-wrapper {
    transform: scale(0.75);
    margin-top: -60px;
    margin-bottom: -60px;
  }
}
`;

html = html.slice(0, cssStart) + newCss + html.slice(cssEnd);

// 2. Replace HTML
const htmlStart = html.indexOf('<div class="video-carousel-wrapper">');
const htmlEnd = html.indexOf('<div class="section-wave">', htmlStart);

const newHtml = `<div class="video-carousel-wrapper">
    <div class="video-carousel" id="videoCarousel">
      <!-- Video cards injected by JS -->
    </div>
    
    <div class="video-controls-bar" id="videoControls">
      <button class="video-controls-btn" id="prevBtn" onclick="navCarousel(-1)">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="video-controls-info">
        <div class="video-controls-thumb">
          <video id="controlThumb" src="" muted loop playsinline></video>
        </div>
        <div class="video-controls-text">
          <div class="video-controls-title" id="controlTitle">Ali Abdal</div>
          <div class="video-controls-cat" id="controlCat">Fully customizable</div>
        </div>
      </div>
      <button class="video-controls-btn" id="nextBtn" onclick="navCarousel(1)">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>
  `;

html = html.slice(0, htmlStart) + newHtml + html.slice(htmlEnd);

// 3. Replace JS
const jsStart = html.indexOf('// Videos\n(function renderVideos(){');
const jsEnd = html.indexOf('window.toggleKalakarVideo = function', jsStart);

const newJs = `// Videos Coverflow Logic
let activeVideoIndex = 0;
let carouselCards = [];

function updateCarousel() {
  carouselCards.forEach((card, index) => {
    const diff = index - activeVideoIndex;
    let translateX = 0;
    let scale = 1;
    let zIndex = 10;
    let opacity = 1;

    if (diff === 0) {
      translateX = 0;
      scale = 1;
      zIndex = 10;
      opacity = 1;
      card.classList.add('active-card');
    } else {
      card.classList.remove('active-card');
      const absDiff = Math.abs(diff);
      const direction = diff > 0 ? 1 : -1;
      
      // Calculate smooth coverflow positions
      // Item 1: 160px, scale 0.85
      // Item 2: 280px, scale 0.7
      // Item 3: 380px, scale 0.55
      translateX = direction * (160 + (absDiff > 1 ? (absDiff - 1) * 120 : 0));
      scale = 1 - (absDiff * 0.15);
      zIndex = 10 - absDiff;
      opacity = 1 - (absDiff * 0.2);
    }

    card.style.transform = \`translateX(\${translateX}px) scale(\${scale})\`;
    card.style.zIndex = zIndex;
    card.style.opacity = opacity;
  });

  // Update control bar
  const activeVideo = videosData[activeVideoIndex];
  if (activeVideo) {
    document.getElementById('controlTitle').innerText = activeVideo.title;
    document.getElementById('controlCat').innerText = activeVideo.category;
    const thumb = document.getElementById('controlThumb');
    thumb.src = activeVideo.src;
  }
}

window.navCarousel = function(direction) {
  const newIndex = activeVideoIndex + direction;
  if (newIndex >= 0 && newIndex < videosData.length) {
    activeVideoIndex = newIndex;
    updateCarousel();
    pauseAllVideos();
  }
};

function pauseAllVideos() {
  document.querySelectorAll('.video-card video').forEach(v => {
    v.pause();
    v.parentElement.classList.remove('playing');
  });
}

(function initCarousel(){
  const carousel = document.getElementById('videoCarousel');
  carousel.innerHTML = ''; // Clear existing
  
  activeVideoIndex = Math.floor(videosData.length / 2); // Start in middle

  videosData.forEach((v, i)=>{
    const div = document.createElement('div');
    div.className = 'video-card reveal';
    div.innerHTML = \`
      <video src="\${v.src}" loop playsinline preload="metadata" muted></video>
      <div class="video-play-btn">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <div class="video-overlay">
        <div class="video-title">\${v.title}</div>
        <div class="video-category">\${v.category}</div>
      </div>\`;
    
    div.onclick = (e) => window.toggleKalakarVideo(div, i, e);
    carousel.appendChild(div);
  });
  
  carouselCards = document.querySelectorAll('.video-card');
  updateCarousel();
})();

`;

html = html.slice(0, jsStart) + newJs + html.slice(jsEnd);

// Modify toggleKalakarVideo
const toggleStart = html.indexOf('window.toggleKalakarVideo = function(card, event)');
const toggleEnd = html.indexOf('  }\n};\n', toggleStart) + 7;

const newToggleJs = `window.toggleKalakarVideo = function(card, index, event) {
  if (index !== activeVideoIndex) {
    activeVideoIndex = index;
    updateCarousel();
    pauseAllVideos();
    return;
  }

  const video = card.querySelector('video');
  const carousel = card.parentElement;
  if (video.paused) {
    pauseAllVideos();
    video.play();
    video.muted = false;
    card.classList.add('playing');
  } else {
    video.pause();
    card.classList.remove('playing');
  }
};
`;

html = html.slice(0, toggleStart) + newToggleJs + html.slice(toggleEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with 3D carousel');
