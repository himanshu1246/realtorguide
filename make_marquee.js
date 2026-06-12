const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace CSS
html = html.replace('.testimonials-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:32px; max-width:800px; margin:0 auto 48px; }',
`.testimonials-marquee-container {
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  padding: 20px 0 60px 0;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.testimonials-grid {
  display: flex;
  gap: 32px;
  width: max-content;
  animation: scrollMarquee 30s linear infinite;
}
.testimonials-grid:hover {
  /* maybe pause on hover? No, user explicitly said "when he click on play button the moving should stop" */
}
.testimonials-grid.paused {
  animation-play-state: paused;
}
.testimonials-grid .testimonial-card {
  width: 320px;
  flex-shrink: 0;
}
@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 16px)); }
}`);

// Remove responsive override
html = html.replace('.testimonials-grid { grid-template-columns:1fr; max-width:600px; }', '');

// 2. Replace HTML structure
html = html.replace('<div class="testimonials-grid" id="testimonialsGrid">',
`<div class="testimonials-marquee-container">
      <div class="testimonials-grid" id="testimonialsGrid">`);

html = html.replace('<!-- Cards injected by JS -->\r\n    </div>\r\n    <div class="testimonials-cta reveal">',
`<!-- Cards injected by JS -->
      </div>
    </div>
    <div class="testimonials-cta reveal">`);
// For varying line endings:
html = html.replace(/<!-- Cards injected by JS -->\s*<\/div>\s*<div class="testimonials-cta reveal">/,
`<!-- Cards injected by JS -->
      </div>
    </div>
    <div class="testimonials-cta reveal">`);

// 3. Replace renderTestimonials()
const oldRender = `// Testimonials
(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  testimonialsData.forEach((t,i)=>{
    grid.innerHTML += \`
      <div class="testimonial-card reveal" data-tindex="\${i}">
        <div class="testimonial-video-wrap" onclick="toggleTestimonialVideo(this, event)">
          <video src="\${t.video}" playsinline loop autoplay muted preload="metadata" style="pointer-events:none;"></video>
          <div class="testimonial-video-play">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>\`;
  });
})();`;

const newRender = `// Testimonials
(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  // Duplicate data to make marquee infinite and smooth
  const extendedData = [...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData];
  let htmlString = "";
  extendedData.forEach((t,i)=>{
    htmlString += \`
      <div class="testimonial-card" data-tindex="\${i}">
        <div class="testimonial-video-wrap" onclick="toggleTestimonialVideo(this, event)">
          <video src="\${t.video}" playsinline loop autoplay muted preload="metadata" style="pointer-events:none;"></video>
          <div class="testimonial-video-play">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>\`;
  });
  grid.innerHTML = htmlString;
})();`;

html = html.replace(oldRender, newRender);

// 4. Replace toggleTestimonialVideo()
const oldToggle = `function toggleTestimonialVideo(wrap, e){
  if(e) e.stopPropagation();
  const card = wrap.closest('.testimonial-card');
  const video = wrap.querySelector('video');
  if(video.paused){
    document.querySelectorAll('.testimonial-card').forEach(c=>{
      if(c !== card){ c.querySelector('video').pause(); c.classList.remove('playing'); }
    });
    video.muted = false;
    video.play();
    card.classList.add('playing');
  } else {
    video.pause();
    card.classList.remove('playing');
  }
}`;

const newToggle = `function toggleTestimonialVideo(wrap, e){
  if(e) e.stopPropagation();
  const card = wrap.closest('.testimonial-card');
  const video = wrap.querySelector('video');
  const grid = document.getElementById('testimonialsGrid');

  if(!card.classList.contains('playing')){
    // Start video with sound, from the beginning
    document.querySelectorAll('.testimonial-card').forEach(c=>{
      if(c !== card){ 
        const v = c.querySelector('video');
        v.muted = true;
        v.play().catch(()=>console.log("Play failed"));
        c.classList.remove('playing'); 
      }
    });
    
    video.currentTime = 0;
    video.muted = false;
    video.loop = false;
    video.play();
    card.classList.add('playing');
    grid.classList.add('paused');
    
    video.onended = function() {
      video.muted = true;
      video.loop = true;
      video.play();
      card.classList.remove('playing');
      grid.classList.remove('paused');
    };
  } else {
    // Stop playing with sound, return to muted loop and resume marquee
    video.muted = true;
    video.loop = true;
    video.play();
    card.classList.remove('playing');
    grid.classList.remove('paused');
  }
}`;

html = html.replace(oldToggle, newToggle);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html for Marquee");
