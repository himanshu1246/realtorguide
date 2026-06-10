const fs = require('fs');

// Undo index.html changes
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<div id="custom-cursor"></div>\n', '');
html = html.replace('<div id="custom-cursor"></div>', '');

const cssStart = html.indexOf('/* ===== 3D & INTERACTIVE UPGRADES ===== */');
if (cssStart !== -1) {
  const cssEnd = html.indexOf('</style>', cssStart);
  html = html.slice(0, cssStart) + html.slice(cssEnd);
}

// Revert GSAP
html = html.replace(
  /{ opacity:0, y:80, rotateX:30, rotateY:10, scale:0.85 }/g,
  "{ opacity:0, y:40 }"
);
html = html.replace(
  /{ opacity:1, y:0, rotateX:0, rotateY:0, scale:1, duration:1, ease:"back.out\(1\.2\)"/g,
  "{ opacity:1, y:0, duration:0.8, ease:'power3.out'"
);

const jsStart = html.indexOf('// ===== 3D INTERACTIVE LOGIC =====');
if (jsStart !== -1) {
  const jsEnd = html.indexOf('</script>\n</body>');
  html = html.slice(0, jsStart) + html.slice(jsEnd);
}

fs.writeFileSync('index.html', html, 'utf8');

// Undo globals.css changes
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const globalsCssStart = css.indexOf('/* ===== 3D & INTERACTIVE UPGRADES ===== */');
if (globalsCssStart !== -1) {
  css = css.slice(0, globalsCssStart);
  fs.writeFileSync('src/app/globals.css', css, 'utf8');
}

console.log('Successfully reverted 3D upgrades from index.html and globals.css');
