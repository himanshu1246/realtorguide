const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The JS code that is failing
const failingJS = `// Hero chart bars
(function renderChart(){
  const chart = document.getElementById('heroChart');
  const heights = [30,45,35,50,40,55,60,45,65,70,80,95];
  heights.forEach((h,i)=>{
    const bar = document.createElement('div');
    bar.className = 'hero-card-bar' + (i >= 9 ? ' active' : '');
    bar.style.height = h + '%';
    chart.appendChild(bar);
  });
})();`;

// Safe replacement
const safeJS = `// Hero chart bars
(function renderChart(){
  const chart = document.getElementById('heroChart');
  if(!chart) return; // Prevent JS crash since heroChart was removed
  const heights = [30,45,35,50,40,55,60,45,65,70,80,95];
  heights.forEach((h,i)=>{
    const bar = document.createElement('div');
    bar.className = 'hero-card-bar' + (i >= 9 ? ' active' : '');
    bar.style.height = h + '%';
    chart.appendChild(bar);
  });
})();`;

html = html.replace(failingJS, safeJS);
fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed the JavaScript crash!");
