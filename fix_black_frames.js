const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the black frame issue by appending #t=0.5
html = html.replace('<video src="${t.video}" playsinline loop preload="metadata"></video>', '<video src="${t.video}#t=0.5" playsinline loop preload="auto"></video>');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed video black frames!");
