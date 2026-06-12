const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Move Case Studies Heading
const clientsRegex = /<div class="clients-header reveal" style="text-align:center;">\s*<div class="section-label" style="justify-content:center; width:100%;"><span class="line"><\/span> Case Studies<\/div>\s*<h2 class="section-heading clients-heading">Our <span class="gradient-text">Case Studies<\/span><\/h2>/;

const clientsMatch = html.match(clientsRegex);

if (clientsMatch) {
    html = html.replace(clientsRegex, ''); // Remove from old location
    
    // Inject at the top of the clients section
    const injectPointClients = '<div class="container clients-container">';
    const newClientsHeader = `<div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;">
      <div class="section-label" style="justify-content:center; width:100%;"><span class="line"></span> Case Studies <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading clients-heading">Our <span class="gradient-text">Case Studies</span></h2>
    </div>
    <div class="container clients-container">`;
    
    html = html.replace(injectPointClients, newClientsHeader);
} else {
    // try fallback regex if it was already modified or slightly different
    console.log("Could not find clients heading exactly.");
}

// 2. Move Contact Heading
const contactRegex = /<div class="section-label"><span class="line"><\/span> Get In Touch<\/div>\s*<h2 class="section-heading contact-heading">Let's Grow Your <span class="gradient-text">Real Estate Business\.<\/span><\/h2>/;

const contactMatch = html.match(contactRegex);

if (contactMatch) {
    html = html.replace(contactRegex, ''); // Remove from old location
    
    const injectPointContact = '<section class="contact" id="contact">\n  <div class="container">';
    const newContactHeader = `<section class="contact" id="contact">
  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;">
      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading contact-heading">Let's Grow Your <span class="gradient-text">Real Estate Business.</span></h2>
  </div>
  <div class="container">`;
  
    html = html.replace(injectPointContact, newContactHeader);
} else {
    console.log("Could not find contact heading exactly.");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Headings moved in index.html");
