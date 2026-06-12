const fs = require('fs');

const oldHtml = fs.readFileSync('index_head.html', 'utf8');
const newHtml = fs.readFileSync('index.html', 'utf8');

const startString = '<div class="container" style="text-align:center; margin-bottom: 50px; display: flex; flex-direction: column; align-items: center; grid-column: 1 / -1;">';
const endString = '// ===== RENDER FUNCTIONS =====';

const startIndex = oldHtml.indexOf(startString);
const endIndex = oldHtml.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
    const missingChunk = oldHtml.substring(startIndex + startString.length, endIndex);
    
    const brokenStart = newHtml.indexOf(startString);
    const brokenEndIndex = newHtml.indexOf('      </div>`;\r\n  });\r\n})();');
    const brokenEndIndex2 = newHtml.indexOf('      </div>`;\n  });\n})();');
    
    let actualBrokenEnd = brokenEndIndex !== -1 ? brokenEndIndex : brokenEndIndex2;
    let endStrLen = brokenEndIndex !== -1 ? '      </div>`;\r\n  });\r\n})();'.length : '      </div>`;\n  });\n})();'.length;
    
    if (brokenStart !== -1 && actualBrokenEnd !== -1) {
        const fixedHtml = newHtml.substring(0, brokenStart + startString.length) + missingChunk + '// ===== RENDER FUNCTIONS =====\n\n' + newHtml.substring(actualBrokenEnd + endStrLen);
        fs.writeFileSync('index.html', fixedHtml, 'utf8');
        console.log('Fixed saved to index.html');
    } else {
        console.log('Could not find boundaries in newHtml. Start:', brokenStart, 'End:', actualBrokenEnd);
    }
} else {
    console.log('Could not find boundaries in oldHtml. Start:', startIndex, 'End:', endIndex);
}
