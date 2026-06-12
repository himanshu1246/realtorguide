const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The file currently has duplicate contact sections, footers, etc.
// Let's find the FIRST occurrence of <!-- ===== CONTACT ===== -->
const firstContact = html.indexOf('<!-- ===== CONTACT ===== -->');

// Let's read the index_head.html to get the correct lower half.
let oldHtml;
try {
    oldHtml = fs.readFileSync('index_head.html', 'utf16le');
} catch(e) {
    oldHtml = fs.readFileSync('index_head.html', 'utf8');
}

const oldContact = oldHtml.indexOf('<!-- ===== CONTACT ===== -->');

if (firstContact !== -1 && oldContact !== -1) {
    let topHalf = html.substring(0, firstContact);
    let bottomHalf = oldHtml.substring(oldContact);
    
    // Now re-apply the centering of the Contact section!
    // In bottomHalf, find the Contact header and center it.
    // The old contact section looks like:
    /*
<section class="contact" id="contact">
  <div class="container">
    <div class="contact-info reveal">
      <div class="section-label"><span class="line"></span> Get In Touch</div>
      <h2 class="section-heading contact-heading">Let's Grow Your <span class="gradient-text">Real Estate Business.</span></h2>
    */
    
    let newContactSection = `<section class="contact" id="contact">
  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">
      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let's Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>
  </div>
  <div class="container">
    <div class="contact-info reveal">
      <p class="contact-subtext">Book a free strategy session with our team and discover how we can transform your lead generation.</p>`;

    // Replace the old top part of Contact with newContactSection
    let oldContactTopEnd = bottomHalf.indexOf('<p class="contact-subtext">');
    if (oldContactTopEnd !== -1) {
        bottomHalf = newContactSection + bottomHalf.substring(oldContactTopEnd + '<p class="contact-subtext">'.length);
    }
    
    // Write it!
    fs.writeFileSync('index.html', topHalf + bottomHalf, 'utf8');
    console.log("Successfully cleaned up duplicates and restored lower half.");
} else {
    console.log("Could not find markers.");
}
