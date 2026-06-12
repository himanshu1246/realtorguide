const fs = require('fs');

let oldHtml;
try {
    oldHtml = fs.readFileSync('index_head.html', 'utf16le');
} catch(e) {
    oldHtml = fs.readFileSync('index_head.html', 'utf8');
}
let newHtml = fs.readFileSync('index.html', 'utf8');

let contactStart = oldHtml.indexOf('  <div class="container">\r\n    <div class="contact-info reveal">');
if (contactStart === -1) contactStart = oldHtml.indexOf('  <div class="container">\n    <div class="contact-info reveal">');

let renderStart = oldHtml.indexOf('// ===== RENDER FUNCTIONS =====');

if (contactStart !== -1 && renderStart !== -1) {
    let missingChunk = oldHtml.substring(contactStart, renderStart);
    
    const brokenMarker = '  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">';
    let brokenStart = newHtml.indexOf(brokenMarker);
    let brokenEnd = newHtml.indexOf('})();', brokenStart) + 5;
    
    if (brokenStart !== -1 && brokenEnd !== -1) {
        let textToReplace = newHtml.substring(brokenStart, brokenEnd);
        
        let newContactHeader = `  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">
      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>
      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let's Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>
  </div>\n`;
        
        let finalHtml = newHtml.replace(textToReplace, newContactHeader + missingChunk + '// ===== RENDER FUNCTIONS =====\n');
        
        fs.writeFileSync('index.html', finalHtml, 'utf8');
        console.log("Successfully fixed index.html!");
    } else {
        console.log("Could not find broken part in newHtml.");
    }
} else {
    console.log("Could not find markers in oldHtml.", contactStart, renderStart);
}
