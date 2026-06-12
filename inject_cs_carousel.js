const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the old JS `renderCaseStudiesNew()` with the new carousel JS.
// The data array `caseStudiesDataNew` stays the same. We just replace the function below it.
const jsRegex = /\(function renderCaseStudiesNew\(\)\{[\s\S]*?\}\)\(\);/;

const newJs = `
let activeCsIndex = 0;
let csCards = [];

function updateCsCarousel() {
  csCards.forEach((card, index) => {
    const diff = index - activeCsIndex;
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
      
      translateX = direction * (160 + (absDiff * 40));
      scale = Math.max(0.6, 1 - (absDiff * 0.15));
      zIndex = 10 - absDiff;
      opacity = Math.max(0, 1 - (absDiff * 0.4));
    }

    card.style.transform = \`translateX(\${translateX}px) scale(\${scale})\`;
    card.style.zIndex = zIndex;
    card.style.opacity = opacity;
  });

  const activeData = caseStudiesDataNew[activeCsIndex];
  if(activeData) {
    document.getElementById('csProjectTitle').innerText = activeData.project;
    document.getElementById('csRevenue').innerText = activeData.revenue;
    document.getElementById('csSpent').innerText = activeData.spent;
    document.getElementById('csLeads').innerText = activeData.leads;
    document.getElementById('csVisits').innerText = activeData.visits;
    document.getElementById('csDeals').innerText = activeData.deals;
  }
}

function navCsCarousel(dir) {
  activeCsIndex += dir;
  if (activeCsIndex < 0) activeCsIndex = 0;
  if (activeCsIndex >= csCards.length) activeCsIndex = csCards.length - 1;
  updateCsCarousel();
}

(function initCaseStudiesCarousel(){
  const carousel = document.getElementById('csCarousel');
  if(!carousel) return;
  
  // Clear any existing just in case
  carousel.innerHTML = '';
  csCards = [];
  
  caseStudiesDataNew.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cs-carousel-card';
    card.innerHTML = \`<img src="\${c.image}" alt="\${c.project}" loading="lazy">\`;
    card.onclick = () => {
      activeCsIndex = i;
      updateCsCarousel();
    };
    carousel.appendChild(card);
    csCards.push(card);
  });

  setTimeout(updateCsCarousel, 100);
})();`;

html = html.replace(jsRegex, newJs);

// 2. Remove the old Grid CSS and Inject New Carousel CSS
// We can just append the new CSS right before </style>. The old CSS classes (.case-studies-grid, .cs-card) won't be used so they're harmless.
const newCss = `
/* CS 3D Carousel & Dashboard */
.case-studies-carousel-wrapper { width: 100%; position: relative; padding-bottom: 60px; overflow: hidden; perspective: 1500px; }
.cs-carousel { position: relative; height: 500px; display: flex; justify-content: center; align-items: center; width: 100%; transform-style: preserve-3d; margin-bottom: 20px; }
.cs-carousel-card { position: absolute; width: 320px; height: 480px; border-radius: 24px; overflow: hidden; transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); cursor: pointer; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.cs-carousel-card img { width: 100%; height: 100%; object-fit: cover; }
.cs-carousel-card::after { content: ''; position: absolute; inset: 0; background: #000; opacity: 0.6; transition: opacity 0.5s ease; }
.cs-carousel-card.active-card::after { opacity: 0; }

.cs-dashboard { background: #fff; border-radius: 30px; padding: 30px; border: 1px solid rgba(139,92,246,0.15); box-shadow: 0 15px 50px rgba(139,92,246,0.1); max-width: 900px; margin: 0 auto; position:relative; z-index:20; }
.cs-dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 20px; }
.cs-dashboard-title h3 { font-size: 1.6rem; font-weight: 800; margin: 0; color: #1D1D2B; text-align: center; font-family:'Inter',sans-serif; letter-spacing: -0.5px; }
.cs-controls-btn { width: 50px; height: 50px; border-radius: 50%; background: #F8F7FF; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
.cs-controls-btn:hover { background: #7B5CF6; transform:scale(1.05); }
.cs-controls-btn svg { width: 24px; height: 24px; stroke: #7B5CF6; fill: none; stroke-width: 2.5; stroke-linecap:round; stroke-linejoin:round; transition: stroke 0.3s ease; }
.cs-controls-btn:hover svg { stroke: #fff; }

.cs-dashboard-stats { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; }
.cs-stat-box { flex: 1; min-width: 120px; text-align: center; }
.cs-stat-label { font-size: 0.8rem; color: #6B7280; text-transform: uppercase; font-weight:700; letter-spacing: 1px; margin-bottom: 8px; }
.cs-stat-val { font-size: 1.6rem; font-weight: 800; color: #1D1D2B; font-family:'Inter',sans-serif; letter-spacing: -0.5px; }
.cs-stat-val.text-green { color: #10B981; }
.cs-stat-val.text-purple { color: #7B5CF6; }

@media (max-width: 768px) {
  .cs-carousel { height: 400px; }
  .cs-carousel-card { width: 240px; height: 360px; }
  .cs-dashboard-stats { grid-template-columns: 1fr 1fr; display: grid; gap:24px; }
}
`;
html = html.replace('</style>', newCss + '\n</style>');

// 3. Replace the HTML Grid Structure
const htmlRegex = /<div class="container case-studies-container">[\s\S]*?(?=<div class="section-wave">)/;

const newHTML = `
    <div class="case-studies-carousel-wrapper">
      <div class="cs-carousel" id="csCarousel">
        <!-- Cards injected by JS -->
      </div>
      
      <div class="cs-dashboard container reveal">
        <div class="cs-dashboard-header">
          <button class="cs-controls-btn" id="csPrevBtn" onclick="navCsCarousel(-1)">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="cs-dashboard-title">
            <h3 id="csProjectTitle">Loading...</h3>
          </div>
          <button class="cs-controls-btn" id="csNextBtn" onclick="navCsCarousel(1)">
            <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
        
        <div class="cs-dashboard-stats">
          <div class="cs-stat-box">
            <div class="cs-stat-label">Revenue</div>
            <div class="cs-stat-val text-green" id="csRevenue">--</div>
          </div>
          <div class="cs-stat-box">
            <div class="cs-stat-label">Amount Spent</div>
            <div class="cs-stat-val text-purple" id="csSpent">--</div>
          </div>
          <div class="cs-stat-box">
            <div class="cs-stat-label">Leads Generated</div>
            <div class="cs-stat-val" id="csLeads">--</div>
          </div>
          <div class="cs-stat-box">
            <div class="cs-stat-label">Site Visits</div>
            <div class="cs-stat-val" id="csVisits">--</div>
          </div>
          <div class="cs-stat-box">
            <div class="cs-stat-label">Deal Closures</div>
            <div class="cs-stat-val" id="csDeals">--</div>
          </div>
        </div>
      </div>

      <div class="cs-view-all-container reveal" style="text-align: center; margin-top: 50px;">
        <button class="btn-secondary" onclick="openModal()">View all case studies</button>
      </div>
    </div>
  `;

html = html.replace(htmlRegex, newHTML);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Injected 3D Coverflow Carousel for Case Studies!");
