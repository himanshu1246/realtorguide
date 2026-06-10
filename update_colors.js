const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Global Backgrounds
html = html.replace(/body \{[\s\S]*?background-color: #F8F6FF;[\s\S]*?\}/g, (match) => {
  return match.replace('#F8F6FF', '#F4E7F8');
});

// Replace all SVG wave fills matching old background
html = html.replace(/fill="#F8F6FF"/g, 'fill="#F4E7F8"');

// 2. Add Sunset Gradient Animation
const cssInsertion = `
@keyframes sunsetGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
if (!html.includes('sunsetGradient')) {
  html = html.replace('</style>', cssInsertion + '\n</style>');
}

// 3. Update Buttons
html = html.replace(/\.btn-primary \{[\s\S]*?\}/g, (match) => {
  let newMatch = match.replace(/background: linear-gradient.*?;\n/g, '');
  newMatch = newMatch.replace(/color: #fff;/g, 'color: #1E1B4B;');
  newMatch = newMatch.replace('}', '  background: linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4);\n  background-size: 200% 200%;\n  animation: sunsetGradient 5s ease infinite;\n}');
  return newMatch;
});
html = html.replace(/\.btn-primary:hover \{[\s\S]*?\}/g, (match) => {
  return match.replace(/color: #fff;/g, 'color: #1E1B4B;');
});

// Update secondary button borders and text
html = html.replace(/\.btn-secondary \{[\s\S]*?\}/g, (match) => {
  let m = match.replace(/border: 2px solid #8B5CF6;/g, 'border: 2px solid #C8A8E9;');
  m = m.replace(/color: #8B5CF6;/g, 'color: #1E1B4B;');
  return m;
});
html = html.replace(/\.btn-secondary:hover \{[\s\S]*?\}/g, (match) => {
  let m = match.replace(/background: rgba\(139,92,246,0.1\);/g, 'background: rgba(227,170,221,0.2);');
  m = m.replace(/color: #8B5CF6;/g, 'color: #1E1B4B;');
  return m;
});

html = html.replace(/\.btn-secondary-light \{[\s\S]*?\}/g, (match) => {
  let m = match.replace(/border: 2px solid rgba\(196,181,253,0.4\);/g, 'border: 2px solid rgba(227,170,221,0.6);');
  m = m.replace(/color: #C4B5FD;/g, 'color: #F4E7F8;');
  return m;
});
html = html.replace(/\.btn-secondary-light:hover \{[\s\S]*?\}/g, (match) => {
  let m = match.replace(/background: rgba\(139,92,246,0.1\);/g, 'background: rgba(227,170,221,0.3);');
  return m;
});

// 4. Update Gradients and Text Colors
html = html.replace(/\.gradient-text \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: linear-gradient.*?;\n/g, 'background: linear-gradient(135deg, #F6BCBA, #E3AADD, #C8A8E9, #C3C7F4);\n  background-size: 200% 200%;\n  animation: sunsetGradient 5s ease infinite;\n');
});

// Update Section Labels
html = html.replace(/\.section-label \{[\s\S]*?\}/g, (match) => {
  return match.replace(/color: #8B5CF6;/g, 'color: #C8A8E9;');
});
html = html.replace(/\.line \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: linear-gradient.*?;\n/g, 'background: linear-gradient(90deg, #F6BCBA, #E3AADD, #C8A8E9);\n');
});
html = html.replace(/\.line-left \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: linear-gradient.*?;\n/g, 'background: linear-gradient(90deg, transparent, #C8A8E9);\n');
});
html = html.replace(/\.line-right \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: linear-gradient.*?;\n/g, 'background: linear-gradient(90deg, #C8A8E9, transparent);\n');
});

// Modals & Accents
html = html.replace(/\.modal-content \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: #F8F6FF;/g, 'background: #F4E7F8;');
});

// Inline colors replacement
html = html.replace(/color: #8B5CF6;/g, 'color: #E3AADD;');
html = html.replace(/color: #C4B5FD;/g, 'color: #C8A8E9;');
html = html.replace(/color:#C4B5FD;/g, 'color:#C8A8E9;');

html = html.replace(/background: rgba\(139,92,246,0.25\);/g, 'background: rgba(227,170,221,0.3);');
html = html.replace(/border: 1px solid rgba\(139,92,246,0.4\);/g, 'border: 1px solid rgba(227,170,221,0.6);');
html = html.replace(/color: #E2D4FD;/g, 'color: #F4E7F8;');
html = html.replace(/box-shadow: 0 25px 50px rgba\(139,92,246,0.4\);/g, 'box-shadow: 0 25px 50px rgba(227,170,221,0.5);');

// Icon and decorative colors
html = html.replace(/#8B5CF6/g, '#E3AADD');
html = html.replace(/#6D28D9/g, '#C8A8E9');
html = html.replace(/#4C1D95/g, '#C3C7F4');
html = html.replace(/#F0ECFF/g, '#F2DDDC');
html = html.replace(/#F8F6FF/g, '#F4E7F8');

// Ensure card backgrounds are distinct
html = html.replace(/\.process-card \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: #ffffff;/g, 'background: #F2DDDC;');
});
html = html.replace(/\.service-card \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: #ffffff;/g, 'background: #F2DDDC;');
});
html = html.replace(/\.client-card \{[\s\S]*?\}/g, (match) => {
  return match.replace(/background: #ffffff;/g, 'background: #F2DDDC;');
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html colors');
