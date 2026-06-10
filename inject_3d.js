const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject Custom Cursor DOM
if (!html.includes('id="custom-cursor"')) {
  html = html.replace('<body>', '<body>\n<div id="custom-cursor"></div>');
}

// 2. Inject CSS
const newCss = `
/* ===== 3D & INTERACTIVE UPGRADES ===== */
@media (pointer: fine) {
  body { cursor: none; }
  #custom-cursor {
    position: fixed; top: 0; left: 0; width: 16px; height: 16px;
    background: #8B5CF6; border-radius: 50%; pointer-events: none;
    z-index: 9999; mix-blend-mode: difference;
    transform: translate(-50%, -50%); transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
    will-change: transform;
  }
  #custom-cursor.hovering { width: 50px; height: 50px; background: #C4B5FD; mix-blend-mode: screen; }
}

@keyframes liquidFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.btn-primary {
  background: linear-gradient(270deg, #8B5CF6, #6D28D9, #4C1D95, #8B5CF6);
  background-size: 300% 300%;
  animation: liquidFlow 5s ease infinite;
}
.gradient-text {
  background: linear-gradient(270deg, #8B5CF6, #6D28D9, #4C1D95, #8B5CF6);
  background-size: 300% 300%;
  animation: liquidFlow 5s ease infinite;
  -webkit-background-clip: text;
}

.tilt-card { transform-style: preserve-3d; transition: transform 0.1s; will-change: transform; }
.glare {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0; pointer-events: none; transition: opacity 0.3s; mix-blend-mode: overlay;
  border-radius: inherit; z-index: 50;
}
.tilt-card:hover .glare { opacity: 1; }
.client-card:hover, .process-card:hover, .service-card:hover { transform: none !important; box-shadow: 0 25px 50px rgba(139,92,246,0.2) !important; }

/* Enhanced Hero Card */
.hero-card { transform-style: preserve-3d; }
.hero-card-dots { transform: translateZ(20px); }
.hero-card-leads { transform: translateZ(40px); }
.hero-card-metrics { transform: translateZ(30px); }
.hero-card-chart { transform: translateZ(20px); }
`;

if (!html.includes('/* ===== 3D & INTERACTIVE UPGRADES ===== */')) {
  html = html.replace('</style>', newCss + '\n</style>');
}

// 3. Update GSAP Reveal
html = html.replace(
  /{ opacity:0, y:40 }/g,
  '{ opacity:0, y:80, rotateX:30, rotateY:10, scale:0.85 }'
);
html = html.replace(
  /{ opacity:1, y:0, duration:0.8, ease:'power3.out'/g,
  '{ opacity:1, y:0, rotateX:0, rotateY:0, scale:1, duration:1, ease:"back.out(1.2)"'
);

// 4. Inject 3D JS Logic
const newJs = `
// ===== 3D INTERACTIVE LOGIC =====
(function init3D() {
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
    });
    
    function cursorLoop() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.transform = \`translate(\${cursorX}px, \${cursorY}px) translate(-50%, -50%)\`;
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();

    const hoverElements = document.querySelectorAll('a, button, .video-card, .process-card, .service-card, .client-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // 3D Tilt
    const tiltElements = document.querySelectorAll('.client-card, .process-card, .service-card, .service-card, .hero-card');
    tiltElements.forEach(el => {
      el.classList.add('tilt-card');
      const glare = document.createElement('div');
      glare.className = 'glare';
      el.appendChild(glare);

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        el.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
        glare.style.background = \`radial-gradient(circle at \${x}px \${y}px, rgba(255,255,255,0.3) 0%, transparent 60%)\`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = \`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)\`;
      });
    });

    // Deep Parallax
    const heroShapes = document.querySelectorAll('.hero-shape');
    const heroOrbs = document.querySelectorAll('.hero-orb');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroShapes.forEach((el, i) => {
        const speed = (i + 1) * 0.15;
        el.style.transform = \`translateY(\${scrollY * speed}px) rotate(\${scrollY * speed * 0.2}deg)\`;
      });
      heroOrbs.forEach((el, i) => {
        const speed = (i + 1) * -0.1;
        el.style.transform = \`translateY(\${scrollY * speed}px)\`;
      });
    });
  }
})();
</script>
`;

if (!html.includes('// ===== 3D INTERACTIVE LOGIC =====')) {
  html = html.replace('</script>\n</body>', newJs + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully injected 3D features to index.html');
