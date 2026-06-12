const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Data and Render function
const jsToInject = `
const caseStudiesDataNew = [
  { id: 1, image: "public/Case study/case study 1/image.jpg", project: "Raheja Universal , Juinagar", spent: "9.10 Lakh In a Quarter", leads: "407", visits: "38", deals: "6", revenue: "8.58 CR" },
  { id: 2, image: "public/Case study/case study 2/image.jpg", project: "Siddhivinayak , Pushpak Nagar", spent: "4.23 Lakh In a Quarter", leads: "672", visits: "41", deals: "7", revenue: "3.67 CR" },
  { id: 3, image: "public/Case study/case study 3/image.jpg", project: "Paradise Pyramid, Juinagar", spent: "2.55 Lakh In a Quarter", leads: "318", visits: "27", deals: "3", revenue: "3.12 CR" },
  { id: 4, image: "public/Case study/case study 4/image.jpg", project: "Neelkant Darshan, Kharghar", spent: "34 Lakh In 6 Months", leads: "1100+", visits: "143+", deals: "26", revenue: "28.60 CR" },
  { id: 5, image: "public/Case study/case study 5/image.jpg", project: "Magnus, Ulwe", spent: "4.50 Lakh In a Quarter", leads: "700+", visits: "83", deals: "14", revenue: "5.32 CR" },
  { id: 6, image: "public/Case study/case study 6/image.jpg", project: "The Woods (Plot) , Karjat", spent: "6 Lakh In a Quarter", leads: "934", visits: "52", deals: "4", revenue: "1.60 CR" },
  { id: 7, image: "public/Case study/case study 7/image.jpg", project: "DLF Plot & Bungalow , Gurugram", spent: "22 Lakh In a Quarter", leads: "385+", visits: "29", deals: "3", revenue: "12 CR" },
  { id: 8, image: "public/Case study/case study 8/image.jpg", project: "Canal House, Zirakpur Chandigarh", spent: "1.85 Lakh In a Quarter", leads: "240", visits: "19", deals: "2", revenue: "3.80 CR" },
  { id: 9, image: "public/Case study/case study 9/image.jpg", project: "Skymark (Plot), Lucknow", spent: "10 Lakh In 6 Month", leads: "1300+", visits: "90+", deals: "22", revenue: "3.08 CR" }
];

(function renderCaseStudiesNew(){
  const grid = document.getElementById('caseStudiesGridNew');
  if(!grid) return;
  caseStudiesDataNew.forEach((c, i)=>{
    grid.innerHTML += \`
      <div class="cs-card reveal" style="animation-delay: \${i * 0.05}s">
        <img src="\${c.image}" alt="\${c.project}" class="cs-image" loading="lazy">
        <div class="cs-content">
          <div class="cs-header">
            <div class="cs-project">\${c.project}</div>
            <div class="cs-revenue-wrapper">
              <div class="cs-revenue-label">Revenue</div>
              <div class="cs-revenue-val">\${c.revenue}</div>
            </div>
          </div>
          <div class="cs-stats-grid">
            <div class="cs-stat">
              <div class="cs-stat-label">Amount Spent</div>
              <div class="cs-stat-val">\${c.spent}</div>
            </div>
            <div class="cs-stat">
              <div class="cs-stat-label">Leads Generated</div>
              <div class="cs-stat-val">\${c.leads}</div>
            </div>
            <div class="cs-stat">
              <div class="cs-stat-label">Site Visits</div>
              <div class="cs-stat-val">\${c.visits}</div>
            </div>
            <div class="cs-stat">
              <div class="cs-stat-label">Deal Closures</div>
              <div class="cs-stat-val">\${c.deals}</div>
            </div>
          </div>
        </div>
      </div>\`;
  });
})();
`;

// Insert the JS right before the closing </script>
html = html.replace('// Hero chart bars', jsToInject + '\n// Hero chart bars');

// 2. CSS to Inject
const cssToInject = `
.case-studies-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(380px, 1fr)); gap:32px; width:100%; max-width: 1200px; margin: 0 auto; }
.cs-card { display:flex; background:#fff; border-radius:30px; overflow:hidden; border:1px solid rgba(139,92,246,0.1); box-shadow:0 10px 30px rgba(139,92,246,0.05); transition:transform 0.3s ease, box-shadow 0.3s ease; }
.cs-card:hover { transform:translateY(-5px); box-shadow:0 20px 40px rgba(139,92,246,0.12); }
.cs-image { flex: 0 0 45%; max-width: 45%; object-fit:cover; min-height: 250px; }
.cs-content { flex: 1; padding: 24px; display:flex; flex-direction:column; justify-content:center; }
.cs-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 15px; }
.cs-project { font-family:'Inter',sans-serif; font-size:1.1rem; font-weight:700; color:#1D1D2B; flex:1; padding-right:10px; line-height: 1.3; }
.cs-revenue-wrapper { text-align:right; }
.cs-revenue-label { font-size:0.75rem; color:#6B7280; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
.cs-revenue-val { font-size:1.2rem; font-weight:800; color:#10B981; }
.cs-stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.cs-stat { display:flex; flex-direction:column; }
.cs-stat-label { font-size:0.75rem; color:#6B7280; margin-bottom:4px; }
.cs-stat-val { font-size:1rem; font-weight:700; color:#4B5563; }
.cs-view-all-container { text-align: center; margin-top: 50px; }

@media (max-width: 768px) {
  .cs-card { flex-direction: column; }
  .cs-image { flex: 0 0 auto; max-width: 100%; height: 250px; }
}
`;

html = html.replace('</style>', cssToInject + '\n</style>');

// 3. HTML replacement
// Using regex to match from `<div class="container clients-container">` down to `</div>` before `<div class="section-wave">`
const htmlRegex = /<div class="container clients-container">[\s\S]*?(?=<div class="section-wave">)/;

const newHTML = `<div class="container case-studies-container">
      <div class="case-studies-grid" id="caseStudiesGridNew"></div>
      <div class="cs-view-all-container reveal">
        <button class="btn-secondary" onclick="openModal()">View all case studies</button>
      </div>
    </div>
  `;

html = html.replace(htmlRegex, newHTML);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully executed case studies grid replacement.");
