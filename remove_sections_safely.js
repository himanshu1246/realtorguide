const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove clients-header block
const headerBlock = `<div class="clients-header reveal" style="text-align:center;">
        <p class="clients-subtext">Partnering with India's leading real estate developers and brokers to deliver results-driven marketing campaigns.</p>
        <button class="btn-secondary" onclick="openModal()">Work With Us</button>
      </div>`;

// Account for possible \r\n vs \n
const headerBlockRegex = /<div class="clients-header reveal"[^>]*>\s*<p class="clients-subtext"[^>]*>[\s\S]*?<\/p>\s*<button class="btn-secondary"[^>]*>Work With Us<\/button>\s*<\/div>/;
html = html.replace(headerBlockRegex, '');

// 2. Remove clients-grid block
const gridRegex = /<div class="clients-grid" id="clientsGrid">\s*<\/div>/;
html = html.replace(gridRegex, '');

// 3. Remove renderClients JS function
const jsRegex = /\/\/ Clients\s*\(function renderClients\(\)\{[\s\S]*?\}\)\(\);/;
html = html.replace(jsRegex, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully removed circled sections and JS function safely.");
