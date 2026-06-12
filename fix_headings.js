const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Contact Heading
// If contact heading is missing, let's find the section start and inject it
if (!html.includes("Real Estate Business.")) {
    const contactStart = /<section class="contact" id="contact">\r?\n\s*<div class="container">/;
    const contactHeader = `<section class="contact" id="contact">
  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">
      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let's Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>
  </div>
  <div class="container">`;
    html = html.replace(contactStart, contactHeader);
}

// 2. Fix Clients Heading
// Check if the previous script successfully injected it. 
// It looks like it might have failed too if there were \r\n
if (!html.includes("Our <span class=\"gradient-text\">Case Studies</span>")) {
    const clientsStart = /<div class="container clients-container">/;
    const clientsHeader = `<div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center;">
      <div class="section-label" style="justify-content:center; width:100%;"><span class="line"></span> Case Studies <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading clients-heading" style="font-size: 3.5rem; margin-top: 10px;">Our <span class="gradient-text">Case Studies</span></h2>
    </div>
    <div class="container clients-container">`;
    html = html.replace(clientsStart, clientsHeader);
} else {
    // If it did inject, we might want to make sure it looks like a heading
    // Let's add larger font size if it doesn't have it
    html = html.replace(/<h2 class="section-heading clients-heading">Our/g, '<h2 class="section-heading clients-heading" style="font-size: 3.5rem; margin-top: 10px;">Our');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed headings in index.html");
