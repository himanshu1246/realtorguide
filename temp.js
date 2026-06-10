
// ===== DATA =====
const clientsData = [
  { name:'Lodha Group', type:'Luxury Residences', location:'Mumbai' },
  { name:'DLF Limited', type:'Commercial Hub', location:'Delhi' },
  { name:'Prestige Estates', type:'Villa Project', location:'Bangalore' },
  { name:'Godrej Properties', type:'Eco Township', location:'Pune' },
  { name:'Sobha Ltd', type:'Penthouse Series', location:'Dubai' },
  { name:'Oberoi Realty', type:'High-Rise Apartments', location:'Mumbai' },
  { name:'Brigade Group', type:'Integrated Township', location:'Bangalore' },
  { name:'Mahindra Lifespaces', type:'Smart City', location:'Chennai' }
];

const videosData = [
  { src:'public/PRODUCTION SHOWCASE/number 1.mp4', title:'Luxury Villa Tour', category:'Walkthrough' },
  { src:'public/PRODUCTION SHOWCASE/number 2.mp4', title:'City Apartment', category:'Cinematic' },
  { src:'public/PRODUCTION SHOWCASE/number 3.mp4', title:'Aerial Drone Shoot', category:'Drone' },
  { src:'public/PRODUCTION SHOWCASE/number 4.MP4', title:'Modern Estate', category:'Walkthrough' },
  { src:'public/PRODUCTION SHOWCASE/number 5.mp4', title:'Penthouse View', category:'Lifestyle' }
];

const processData = [
  { step:'Step 01', title:'Research & Site Visit', dark:false,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    items:['Property inspection & audit','Target audience profiling','Competitor deep-dive analysis','USP identification & positioning'] },
  { step:'Step 02', title:'Market Analysis', dark:true,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    items:['Demand-supply gap mapping','Price benchmarking study','Micro-market trend analysis','Buyer persona development'] },
  { step:'Step 03', title:'Content Production', dark:false,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    items:['Cinematic property videos','Drone aerial photography','3D walkthrough creation','Social media content suite'] },
  { step:'Step 04', title:'Performance Marketing', dark:true,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    items:['Meta & Google ad campaigns','Hyper-local targeting setup','A/B creative testing','Real-time optimization'] },
  { step:'Step 05', title:'Automation Systems', dark:false,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    items:['WhatsApp auto-responders','Lead nurture sequences','Appointment booking flows','Follow-up reminder system'] },
  { step:'Step 06', title:'Website & CRM', dark:true,
    icon:'<svg viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    items:['Custom landing pages','CRM integration & setup','Lead tracking dashboards','Analytics & reporting'] }
];

const servicesData = [
  { name:'Social Media Marketing', desc:'Strategic social presence across platforms.',
    icon:'<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polygon points="16 3 21 3 21 8"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' },
  { name:'Google Ads', desc:'Search campaigns that capture intent.',
    icon:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
  { name:'Facebook Ads', desc:'Targeted campaigns for maximum reach.',
    icon:'<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' },
  { name:'AI Automation', desc:'Smart workflows powered by AI.',
    icon:'<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="11"/><circle cx="8" cy="16" r="1" fill="#8B5CF6" stroke="none"/><circle cx="16" cy="16" r="1" fill="#8B5CF6" stroke="none"/></svg>' },
  { name:'CRM Systems', desc:'Centralized lead management tools.',
    icon:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
  { name:'Website Development', desc:'High-converting real estate websites.',
    icon:'<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
  { name:'Lead Generation', desc:'Qualified leads for your sales team.',
    icon:'<svg viewBox="0 0 24 24"><path d="M12 2C8 2 4 6 4 6l8 16 8-16s-4-4-8-4z"/><line x1="12" y1="22" x2="12" y2="16"/></svg>' },
  { name:'WhatsApp Automation', desc:'Instant engagement on WhatsApp.',
    icon:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' },
  { name:'Branding', desc:'Visual identity that commands trust.',
    icon:'<svg viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="13" r="2"/><circle cx="6" cy="12" r="3"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none"/></svg>' },
  { name:'Content Production', desc:'Premium photo & video content.',
    icon:'<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' }
];

const testimonialsData = [
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 1.mp4', name:'Happy Client', role:'Real Estate Developer', initial:'H',
    quote:'They completely transformed our lead generation process and helped us close deals faster.' },
  { video:'public/CLIENT TESTIMONIALS/Client Testimonials video 2.mp4', name:'Satisfied Partner', role:'Luxury Broker', initial:'S',
    quote:'The quality of videos and ROI on our ad campaigns have been incredible.' }
];

// ===== RENDER FUNCTIONS =====

// Clients
(function renderClients(){
  const grid = document.getElementById('clientsGrid');
  clientsData.forEach((c,i)=>{
    grid.innerHTML += `
      <div class="client-card reveal">
        <span class="client-card-number">0${i+1}</span>
        <div class="client-card-name">${c.name}</div>
        <div class="client-card-type">${c.type}</div>
        <div class="client-card-location"><span class="dot"></span>${c.location}</div>
      </div>`;
  });
})();

// Videos
(function renderVideos(){
  const carousel = document.getElementById('videoCarousel');
  videosData.forEach((v,i)=>{
    carousel.innerHTML += `
      <div class="video-card reveal" data-index="${i}" onclick="toggleProductionVideo(this, event)">
        <video src="${v.src}" loop playsinline preload="metadata"></video>
        <div class="video-overlay">
          <div class="video-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="video-info">
            <span class="video-category">${v.category}</span>
            <div class="video-title">${v.title}</div>
          </div>
        </div>
      </div>`;
  });
})();

// Process
(function renderProcess(){
  const grid = document.getElementById('processGrid');
  processData.forEach((p,i)=>{
    const cls = p.dark ? 'process-card-dark' : 'process-card-light';
    grid.innerHTML += `
      <div class="process-card ${cls} reveal">
        <span class="process-card-number">0${i+1}</span>
        <div class="process-card-icon">${p.icon}</div>
        <div class="process-card-step">${p.step}</div>
        <div class="process-card-title">${p.title}</div>
        <ul class="process-card-list">
          ${p.items.map(it=>`<li><span class="dot"></span>${it}</li>`).join('')}
        </ul>
      </div>`;
  });
})();

// Services
(function renderServices(){
  const grid = document.getElementById('servicesGrid');
  servicesData.forEach(s=>{
    grid.innerHTML += `
      <div class="service-card reveal">
        <div class="service-icon">${s.icon}</div>
        <div class="service-name">${s.name}</div>
        <div class="service-desc">${s.desc}</div>
      </div>`;
  });
})();

// Testimonials
(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  testimonialsData.forEach((t,i)=>{
    grid.innerHTML += `
      <div class="testimonial-card reveal" data-tindex="${i}">
        <div class="testimonial-video-wrap" onclick="toggleTestimonialVideo(this, event)">
          <video src="${t.video}" playsinline loop preload="metadata"></video>
          <div class="testimonial-video-play">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>`;
  });
})();

// Hero chart bars
(function renderChart(){
  const chart = document.getElementById('heroChart');
  const heights = [30,45,35,50,40,55,60,45,65,70,80,95];
  heights.forEach((h,i)=>{
    const bar = document.createElement('div');
    bar.className = 'hero-card-bar' + (i >= 9 ? ' active' : '');
    bar.style.height = h + '%';
    chart.appendChild(bar);
  });
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
function toggleMobileMenu(){
  document.getElementById('hamburger').classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('active');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu(){
  document.getElementById('hamburger').classList.remove('active');
  document.getElementById('mobileMenu').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== MODAL =====
function openModal(){
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  // reset
  document.getElementById('modalBody').style.display = '';
  document.getElementById('modalSuccess').style.display = 'none';
  document.getElementById('modalForm').reset();
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
function closeModalOutside(e){
  if(e.target === document.getElementById('modalOverlay')) closeModal();
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

function handleModalSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('modalSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('modalBody').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
    setTimeout(closeModal, 2500);
  },1500);
}

// ===== CONTACT FORM =====
function handleContactSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  },1500);
}

// ===== VIDEO CONTROLS =====
function toggleProductionVideo(card, e){
  if(e) e.stopPropagation();
  const video = card.querySelector('video');
  if(video.paused){
    document.querySelectorAll('.video-card').forEach(c=>{
      if(c !== card){ c.querySelector('video').pause(); c.classList.remove('playing'); }
    });
    video.muted = false;
    video.play();
    card.classList.add('playing');
  } else {
    video.pause();
    card.classList.remove('playing');
  }
}

function toggleTestimonialVideo(wrap, e){
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
}

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero entrance timeline
const heroTl = gsap.timeline({ defaults:{ ease:'power3.out' } });
heroTl
  .to('#heroLabel', { opacity:1, y:0, duration:0.6 }, 0.3)
  .to('#heroH1', { opacity:1, y:0, duration:0.6 }, 0.5)
  .to('#heroSubtext', { opacity:1, y:0, duration:0.6 }, 0.7)
  .to('#heroCtas', { opacity:1, y:0, duration:0.6 }, 0.9)
  .to('#heroStats', { opacity:1, y:0, duration:0.6 }, 1.1)
  .to('#heroCardWrapper', { opacity:1, y:0, duration:0.8, ease:'back.out(1.4)' }, 1.0);

// Set initial states for hero elements
gsap.set(['#heroLabel','#heroH1','#heroSubtext','#heroCtas','#heroStats','#heroCardWrapper'], { y:40 });

// Mouse parallax
document.addEventListener('mousemove', e=>{
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  gsap.to('#heroOrb1', { x: x*40, y: y*40, duration:1, ease:'power2.out' });
  gsap.to('#heroOrb2', { x: x*-30, y: y*-30, duration:1, ease:'power2.out' });
  gsap.to('#heroCard', {
    rotateY: -8 + x*30, rotateX: 4 + y*-24,
    duration:0.5, ease:'power2.out'
  });
});

// Scroll reveals
const revealElements = document.querySelectorAll('.reveal');
// Use GSAP ScrollTrigger for each
revealElements.forEach(el=>{
  gsap.fromTo(el,
    { opacity:0, y:40 },
    {
      opacity:1, y:0, duration:0.8, ease:'power3.out',
      scrollTrigger:{
        trigger:el,
        start:'top 88%',
        toggleActions:'play none none none'
      }
    }
  );
});

// Fallback IntersectionObserver (if ScrollTrigger somehow fails)
if(!window.ScrollTrigger){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('revealed'); obs.unobserve(entry.target); }
    });
}

