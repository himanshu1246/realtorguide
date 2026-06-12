const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update CSS
const oldCss = `.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}`;
const newCss = `.testimonials-grid {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: scrollMarquee 25s linear infinite;
}`;
html = html.replace(oldCss, newCss);

// 2. Update renderTestimonials to duplicate data for seamless marquee
const oldRender = `(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  testimonialsData.forEach((t,i)=>{`;

const newRender = `(function renderTestimonials(){
  const grid = document.getElementById('testimonialsGrid');
  if(!grid) return;
  const marqueeData = [...testimonialsData, ...testimonialsData, ...testimonialsData];
  marqueeData.forEach((t,i)=>{`;
html = html.replace(oldRender, newRender);

// 3. Update toggleTestimonialVideo to pause the marquee
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
  if(video.paused){
    document.querySelectorAll('.testimonial-card').forEach(c=>{
      if(c !== card){ c.querySelector('video').pause(); c.classList.remove('playing'); }
    });
    video.muted = false;
    video.play();
    card.classList.add('playing');
    if(grid) grid.classList.add('paused');
  } else {
    video.pause();
    card.classList.remove('playing');
    if(grid) grid.classList.remove('paused');
  }
}`;

html = html.replace(oldToggle, newToggle);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Testimonials marquee updated successfully!');
