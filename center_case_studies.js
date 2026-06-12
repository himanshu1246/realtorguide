const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The line is: .clients-container { display:grid; grid-template-columns:1fr 1.2fr; gap:60px; align-items:start; }
// We want to make it flex and centered so the hero card is beautifully centered.
html = html.replace('.clients-container { display:grid; grid-template-columns:1fr 1.2fr; gap:60px; align-items:start; }', '.clients-container { display:flex; justify-content:center; align-items:center; }');

// We should also make clients-left have no max-width constraints if it has any, but let's check its CSS.
// Actually, hero-card-wrapper has max-width:420px; margin:0 auto; which means it will center nicely if clients-left is also centered.
html = html.replace('.clients-left { position:relative; }', '.clients-left { position:relative; display:flex; justify-content:center; width:100%; }');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Centered clients-container");
