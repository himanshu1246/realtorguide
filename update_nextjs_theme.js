const fs = require('fs');
const path = require('path');

const OLD_TO_NEW = {
    '#F5EBFA': '#FFFFFF',
    '#E7DBEF': '#F8F7FF',
    '#49225B': '#1D1D2B',
    '#6E3482': '#7B5CF6',
    '#A56ABD': '#A78BFA',
    'rgba\\(227,170,221': 'rgba(123,92,246', // update rgba to the new purple
    'rgba\\(196,181,253': 'rgba(123,92,246', // update another old purple to the new purple
    '#F6BCBA': '#7B5CF6',
    '#E3AADD': '#7B5CF6',
    '#C8A8E9': '#A78BFA',
    '#C3C7F4': '#A78BFA'
};

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace exact hex colors
    for (const [oldColor, newColor] of Object.entries(OLD_TO_NEW)) {
        const regex = new RegExp(oldColor, 'gi');
        if (regex.test(content)) {
            content = content.replace(regex, newColor);
            modified = true;
        }
    }
    
    // Specifically target any components with round-xl buttons and make them fully rounded if they use the primary style
    if (filePath.endsWith('.tsx') && content.includes('className="btn-primary')) {
        // we leave this since button styling is in CSS now mostly, but let's change rounded-xl to rounded-full for buttons.
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated colors in ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

walkDir('src');

// Specifically update globals.css gradients
const globalsPath = 'src/app/globals.css';
if (fs.existsSync(globalsPath)) {
    let css = fs.readFileSync(globalsPath, 'utf8');
    
    // Replace gradient-text gradient
    css = css.replace(/background:\s*linear-gradient\([^)]+\);(?=\s*background-size:\s*200%\s*200%;\s*animation:\s*sunsetGradient\s*5s\s*ease\s*infinite;\s*-webkit-background-clip:\s*text;)/g, 'background: linear-gradient(90deg, #7B5CF6, #6340E8);');
    
    // Also a simpler replace just in case the above fails
    css = css.replace(/background:\s*linear-gradient\(135deg,\s*#F6BCBA,\s*#E3AADD,\s*#C8A8E9,\s*#C3C7F4\);/g, 'background: linear-gradient(90deg, #7B5CF6, #6340E8);');

    // Replace btn-primary gradient
    css = css.replace(/\.btn-primary\s*\{[^}]*background:\s*linear-gradient\([^)]+\);/g, (match) => {
        return match.replace(/background:\s*linear-gradient\([^)]+\);/, 'background: linear-gradient(90deg, #F442C2, #E231AE); border-radius: 30px;');
    });
    
    // Remove sunset gradient animation calls
    css = css.replace(/animation:\s*sunsetGradient[^;]+;/g, '');
    
    // Change heading font
    css = css.replace(/--font-heading:\s*var\(--font-syne\);/g, '--font-heading: var(--font-inter);');
    
    fs.writeFileSync(globalsPath, css);
    console.log("Updated globals.css specifically");
}
