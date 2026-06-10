const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject Lenis Smooth Scroll Script before GSAP
const headEnd = html.indexOf('</head>');
const lenisScript = `
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>
<style>
/* ===== AWWWARDS BUCKS SAUCE AESTHETIC ===== */
html.lenis, html.lenis body { height: auto; width: 100vw; overflow-x: hidden; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }

/* Marquee Typography */
.marquee-bg { position: absolute; top: 15%; left: 0; width: 200%; white-space: nowrap; overflow: hidden; pointer-events: none; z-index: 0; opacity: 0.05; }
.marquee-track { display: inline-block; animation: scroll-left 30s linear infinite; font-family: 'Syne', sans-serif; font-size: 20vw; font-weight: 800; -webkit-text-stroke: 3px #fff; color: transparent; text-transform: uppercase; line-height: 1; }
@keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Floating 3D Geometric Shapes */
.awwwards-shape { position: absolute; background: linear-gradient(135deg, #8B5CF6, #4C1D95); opacity: 0.6; filter: blur(40px); z-index: 1; will-change: transform; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; animation: morph 8s ease-in-out infinite; }
@keyframes morph { 0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } 50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; } 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } }
.shape-1 { width: 400px; height: 400px; top: 10%; left: -10%; }
.shape-2 { width: 600px; height: 600px; top: 40%; right: -20%; background: linear-gradient(135deg, #1E1B4B, #8B5CF6); }
.shape-3 { width: 350px; height: 500px; bottom: 20%; left: 10%; background: linear-gradient(135deg, #34D399, #8B5CF6); }

/* High-Contrast Adjustments */
body { background-color: #050505; color: #fff; }
.container { position: relative; z-index: 10; }
.section-heading { font-size: 4rem; text-transform: uppercase; letter-spacing: -2px; line-height: 1.1; font-weight: 800; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.btn-primary, .btn-secondary { font-size: 1.2rem; padding: 20px 40px; border-radius: 0; text-transform: uppercase; font-weight: 800; letter-spacing: 2px; transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
.btn-primary:hover, .btn-secondary:hover { transform: scale(1.05) skewX(-10deg); }

/* Remove old waves */
.section-wave { display: none; }
</style>
`;
if (!html.includes('lenis.min.js')) {
  html = html.slice(0, headEnd) + lenisScript + html.slice(headEnd);
}

// 2. Inject DOM Elements (Marquees and Shapes)
const bodyStart = html.indexOf('<body>') + 6;
const shapesHtml = `
<div class="awwwards-shape shape-1" data-speed="0.3"></div>
<div class="awwwards-shape shape-2" data-speed="-0.4"></div>
<div class="awwwards-shape shape-3" data-speed="0.2"></div>
<div class="marquee-bg"><div class="marquee-track"><span>REALTOR GUIDE REALTOR GUIDE REALTOR GUIDE REALTOR GUIDE</span></div></div>
`;
if (!html.includes('awwwards-shape')) {
  html = html.slice(0, bodyStart) + shapesHtml + html.slice(bodyStart);
}

// 3. Inject JS Logic for Lenis and Aggressive GSAP
const jsEnd = html.lastIndexOf('</script>\n</body>');

// Replace the original GSAP ScrollTrigger logic entirely
const originalGsapStart = html.indexOf('// Scroll reveals');
const originalGsapEnd = html.indexOf('// Fallback IntersectionObserver');

const crazyGsapLogic = `
// ===== AWWWARDS BUCKS SAUCE GSAP LOGIC =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0);

// Deep Parallax Shapes
gsap.utils.toArray('.awwwards-shape').forEach(shape => {
  const speed = parseFloat(shape.getAttribute('data-speed'));
  gsap.to(shape, {
    y: () => (window.innerHeight * speed * 2),
    rotation: () => (360 * speed),
    ease: "none",
    scrollTrigger: {
      trigger: 'body',
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });
});

// Aggressive Reveals
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => {
  gsap.fromTo(el, 
    { opacity: 0, y: 150, rotateX: -30, scale: 0.8, transformOrigin: "center bottom" },
    { 
      opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

`;

if (originalGsapStart !== -1 && originalGsapEnd !== -1) {
  html = html.slice(0, originalGsapStart) + crazyGsapLogic + html.slice(originalGsapEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully applied Bucks Sauce Awwwards aesthetic!');
