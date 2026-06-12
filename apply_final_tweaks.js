const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// --- Task 1: Increase service text size ---
html = html.replace('.service-name { font-family:\'Inter\',sans-serif; letter-spacing: -0.5px; font-weight:700; font-size:0.95rem; color:#1D1D2B; margin-bottom:6px; }', 
                    '.service-name { font-family:\'Inter\',sans-serif; letter-spacing: -0.5px; font-weight:700; font-size:1.3rem; color:#1D1D2B; margin-bottom:10px; }');
// The description class is probably .service-desc. Let's find it.
// I will use regex to ensure I hit it.
html = html.replace(/\.service-desc\s*\{[^}]+\}/, function(match) {
    // Keep everything but change font-size
    return match.replace(/font-size:[^;]+;/, 'font-size:1.1rem;');
});

// Actually let's just forcefully append the font-size overrides right before </style> to ensure they apply
const overrides = `
/* Overrides for text sizes */
.service-name { font-size: 1.4rem !important; margin-bottom: 12px !important; }
.service-desc { font-size: 1.1rem !important; line-height: 1.5 !important; }
.hero-card-leads-value { font-size: 4rem !important; }
.hero-card-leads-label { font-size: 1.2rem !important; margin-bottom: 5px !important; }
`;
html = html.replace('</style>', overrides + '\n</style>');

// --- Task 2: Remove Step 01 and 01 background from Process cards ---
// Inside renderProcess():
html = html.replace('<span class="process-card-number">0${i+1}</span>', '');
html = html.replace('<div class="process-card-step">${p.step}</div>', '');

// --- Task 3: Change marquee speed back to 25s (from 60s) ---
html = html.replace('animation: scrollMarquee 60s linear infinite;', 'animation: scrollMarquee 25s linear infinite;');

// Also, the user complained they can't see the videos because they are black boxes.
// Let's add preload="auto" to the video tags inside renderTestimonials() just to be safe.
// Original: <video src="\${t.video}" muted loop playsinline></video>
html = html.replace('<video src="${t.video}" muted loop playsinline></video>', '<video src="${t.video}" preload="auto" muted loop playsinline></video>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Applied final tweaks!");
