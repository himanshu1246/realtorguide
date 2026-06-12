const fs = require('fs');

const oldHtml = fs.readFileSync('index_head.html', 'utf16le');
let newHtml = fs.readFileSync('index.html', 'utf8');

const startMarkerOld = '  <div class="container">\r\n    <div class="contact-info reveal">';
const startMarkerNew = '  <div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">\r\n      <div class="section-label" style="justify-content:center;"><span class="line"></span> Get In Touch <span class="line" style="margin-left:15px;"></span></div>\r\n      <h2 class="section-heading contact-heading" style="font-size: 3rem; margin-top: 10px;">Let\'s Grow Your <br/><span class="gradient-text">Real Estate Business.</span></h2>\r\n  </div>\r\n      </div>`;\r\n  });\r\n})();';
const endMarkerOld = '// ===== RENDER FUNCTIONS =====';

let startIndexOld = oldHtml.indexOf(startMarkerOld);
let endIndexOld = oldHtml.indexOf(endMarkerOld);

if (startIndexOld === -1) {
    startIndexOld = oldHtml.indexOf('  <div class="container">\n    <div class="contact-info reveal">');
}

if (startIndexOld !== -1 && endIndexOld !== -1) {
    // We want the chunk starting from startMarkerOld up to endMarkerOld.
    let missingChunk = oldHtml.substring(startIndexOld, endIndexOld);
    
    // BUT we need to modify missingChunk because in the new HTML, we centered the Contact section!
    // The old HTML had <div class="container">\n  <div class="contact-info reveal">...
    // The new HTML has a centered container first, then the actual info container.
    // I will just use the missing chunk but ensure it matches the new HTML structure.
    
    // Find where the broken part starts in newHtml
    const brokenIndex = newHtml.indexOf('  </div>\r\n      </div>`;\r\n  });\r\n})();');
    const brokenIndex2 = newHtml.indexOf('  </div>\n      </div>`;\n  });\n})();');
    
    const actualBrokenEnd = brokenIndex !== -1 ? brokenIndex : brokenIndex2;
    const lenToReplace = brokenIndex !== -1 ? '  </div>\r\n      </div>`;\r\n  });\r\n})();'.length : '  </div>\n      </div>`;\n  });\n})();'.length;
    
    if (actualBrokenEnd !== -1) {
        newHtml = newHtml.substring(0, actualBrokenEnd) + '  </div>\n' + missingChunk + '// ===== RENDER FUNCTIONS =====\n\n' + newHtml.substring(actualBrokenEnd + lenToReplace);
        fs.writeFileSync('index.html', newHtml, 'utf8');
        console.log("Restored missing chunk!");
    } else {
        console.log("Could not find broken boundary in newHtml.");
    }
} else {
    console.log("Could not find boundaries in oldHtml. Start:", startIndexOld, "End:", endIndexOld);
}
