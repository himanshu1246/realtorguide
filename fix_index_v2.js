const fs = require('fs');
let newHtml = fs.readFileSync('index.html', 'utf8');

const brokenPart = `  </div>
      </div>\`;
  });
})();`;

// I will just read the git file directly via shell, but wait, I can just use a regex or string replacement to drop the broken part and insert the correct one.
// Let's use oldHtml as a source of truth.
let oldHtml;
try {
    oldHtml = fs.readFileSync('index_head.html', 'utf16le');
} catch(e) {
    oldHtml = fs.readFileSync('index_head.html', 'utf8');
}

let contactStart = oldHtml.indexOf('  <div class="container">\r\n    <div class="contact-info reveal">');
if (contactStart === -1) contactStart = oldHtml.indexOf('  <div class="container">\n    <div class="contact-info reveal">');

let renderStart = oldHtml.indexOf('// ===== RENDER FUNCTIONS =====');

if (contactStart !== -1 && renderStart !== -1) {
    let missingChunk = oldHtml.substring(contactStart, renderStart);
    
    // Now find the broken point in newHtml
    let brokenStart = newHtml.indexOf('  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">\r\n      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>\r\n      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let\\'s Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>\r\n  </div>');
    if (brokenStart === -1) brokenStart = newHtml.indexOf('  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">\n      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>\n      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let\\'s Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>\n  </div>');
    
    // The broken part ends after '})();'
    let brokenEnd = newHtml.indexOf('})();', brokenStart) + 5;
    
    if (brokenStart !== -1 && brokenEnd !== -1) {
        let fixedHtml = newHtml.substring(0, brokenStart + newHtml.substring(brokenStart, brokenEnd).indexOf('</div>\r\n  </div>') !== -1 ? brokenStart + newHtml.substring(brokenStart, brokenEnd).indexOf('</div>\r\n  </div>') : brokenStart + newHtml.substring(brokenStart, brokenEnd).indexOf('</div>\n  </div>'));
        
        // Let's just do a string replace of the exact broken block
        let textToReplace = newHtml.substring(brokenStart, brokenEnd);
        
        // Wait, the new header for contact is slightly different.
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
    console.log("Could not find markers in oldHtml.");
}
