const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove injected CSS
const cssRegex = /\/\* CS 3D Carousel & Dashboard \*\/[\s\S]*?(?=\<\/style\>)/;
html = html.replace(cssRegex, '');

// 2. Remove injected JS and restore renderChart
const jsRegex = /const caseStudiesDataNew[\s\S]*?(?=\/\/ ===== NAVBAR SCROLL =====)/;
const restoredJs = `// Hero chart bars
(function renderChart(){
  const chart = document.getElementById('heroChart');
  if(!chart) return;
  const heights = [30,45,35,50,40,55,60,45,65,70,80,95];
  heights.forEach((h,i)=>{
    const bar = document.createElement('div');
    bar.className = 'hero-card-bar' + (i >= 9 ? ' active' : '');
    bar.style.height = h + '%';
    chart.appendChild(bar);
  });
})();

`;
html = html.replace(jsRegex, restoredJs);

// 3. Restore the HTML
const htmlRegex = /<div class="case-studies-carousel-wrapper">[\s\S]*?(?=<div class="section-wave">)/;

const restoredHTML = `<div class="container clients-container">
    <div class="clients-left">
      
      <div class="hero-card-wrapper reveal" id="heroCardWrapper" style="margin-top: 60px;">
        <div class="hero-card" id="heroCard">
          <div class="hero-card-dots">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
          </div>
          <div class="hero-card-leads">
            <div>
              <div class="hero-card-leads-label">Total Leads</div>
              <div class="hero-card-leads-value">12,847 <span class="hero-card-leads-trend"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> +24%</span></div>
            </div>
          </div>
          <div class="hero-card-metrics">
            <div class="hero-card-metric">
              <div class="hero-card-metric-label">Conversion</div>
              <div class="hero-card-metric-value purple">18.4%</div>
            </div>
            <div class="hero-card-metric">
              <div class="hero-card-metric-label">Cost/Lead</div>
              <div class="hero-card-metric-value purple">₹42</div>
            </div>
            <div class="hero-card-metric">
              <div class="hero-card-metric-label">ROI</div>
              <div class="hero-card-metric-value green">342%</div>
            </div>
          </div>
          <div class="hero-card-chart" id="heroChart"></div>
          <div class="hero-card-chart-label">Last 12 Months Performance</div>
        </div>
      </div>
    </div>
    
  </div>
  `;

html = html.replace(htmlRegex, restoredHTML);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Undone Case Studies redesign!");
