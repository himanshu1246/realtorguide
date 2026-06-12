const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace fonts
html = html.replace(/font-family:'Syne',sans-serif;/g, "font-family:'Inter',sans-serif; letter-spacing: -0.5px;");

// Backgrounds
html = html.replace(/#F5EBFA/g, '#FFFFFF'); // Main body background
html = html.replace(/#E7DBEF/g, '#F8F7FF'); // Secondary light background

// Text colors
html = html.replace(/#49225B/g, '#1D1D2B'); // Dark headers
html = html.replace(/#6E3482/g, '#7B5CF6'); // Purple brand color
html = html.replace(/#A56ABD/g, '#A78BFA'); // Lighter purple

// Gradient text adjustments
// Look for background: linear-gradient(90deg, #D82129, #28377A, #49225B);
// Wait, the regex might fail due to spaces. Let's do string replacement instead.

const gradientRegex = /background:\s*linear-gradient\(\s*90deg\s*,\s*#D82129\s*,\s*#28377A\s*,\s*#49225B\s*\);/gi;
html = html.replace(gradientRegex, 'background: linear-gradient(90deg, #7B5CF6, #6340E8);');

const btnGradientRegex = /background:\s*linear-gradient\(\s*90deg\s*,\s*#D82129\s*,\s*#28377A\s*,\s*#49225B\s*\);\s*color:\s*#fff;\s*border:none;\s*border-radius:12px;/gi;
html = html.replace(btnGradientRegex, 'background: linear-gradient(90deg, #F442C2, #E231AE); color: #fff; border:none; border-radius:30px;');

// Also remove the "sunsetGradient" animation from buttons if it's there
html = html.replace(/animation:\s*sunsetGradient\s*5s\s*ease\s*infinite;/g, '');

// The body background: #FFFFFF was done, wait, original body: background:#F5EBFA
// Make sure it looks clean.

// Let's replace button border radius everywhere for btn-primary
html = html.replace(/\.btn-primary\s*\{\s*display:inline-flex;(.*?)\}/gs, function(match) {
    return match.replace(/border-radius:12px;/, "border-radius:30px;");
});
html = html.replace(/\.btn-secondary\s*\{(.*?)\}/gs, function(match) {
    return match.replace(/border-radius:12px;/, "border-radius:30px;");
});
html = html.replace(/\.btn-secondary-light\s*\{(.*?)\}/gs, function(match) {
    return match.replace(/border-radius:12px;/, "border-radius:30px;");
});

fs.writeFileSync('index.html', html);
console.log('Updated index.html to Mutmiz theme');
