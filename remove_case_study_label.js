const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div style="font-family:'Inter',sans-serif; font-size: 1.3rem; font-weight: 800; color: #1D1D2B; margin-bottom: 8px;">\${c.name}</div>
        <div style="color: #7B5CF6; font-size: 0.95rem; font-weight: 600; margin-bottom: 16px;">\${c.type}</div>`;

const replacement = `<div style="font-family:'Inter',sans-serif; font-size: 1.3rem; font-weight: 800; color: #1D1D2B; margin-bottom: 16px;">\${c.name}</div>`;

html = html.replace(target, replacement);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed Case Study label from marquee!');
