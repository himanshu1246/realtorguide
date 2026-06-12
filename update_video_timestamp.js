const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The second video is showing a blue screen at 0.5 seconds (likely an intro graphic).
// Let's change the start frame to 5.0 seconds for all videos so they show the speaker.
html = html.replace('<video src="${t.video}#t=0.5"', '<video src="${t.video}#t=4.0"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated video start timestamp to 4.0 seconds!');
