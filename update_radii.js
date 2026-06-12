const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We want to replace border-radius: 4px, 8px, 10px, 12px, 14px, 16px, 20px, 24px
// with border-radius: 30px (or 50px for buttons, which is already done).
// We should use regex to find border-radius: \d+px where the number is < 30 and > 2
// EXCEPT if it's part of a multi-value like 4px 4px 0 0

html = html.replace(/border-radius:\s*([3-9]|1[0-9]|2[0-9])px;/g, (match, p1) => {
    // Only replace if it's an exact match of a single px value
    return 'border-radius: 30px;';
});

// For inputs, we can explicitly set border-radius: 30px;
html = html.replace(/border-radius:\s*10px;/g, 'border-radius: 30px;');

// Also fix any hardcoded sharp edges if I missed any
html = html.replace(/border-radius:\s*0;/g, 'border-radius: 30px;');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated border radii");
