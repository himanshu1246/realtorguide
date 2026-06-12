const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content;
            
            // Replace rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl with rounded-full
            // Or just inline styles: borderRadius: "10px" -> "30px"
            modified = modified.replace(/borderRadius:\s*["']([4-9]|1[0-9]|2[0-9])px["']/g, 'borderRadius: "30px"');
            
            // Tailwind classes: rounded-md/lg/xl/2xl/3xl -> rounded-full (full pill shape) or rounded-[30px]
            // Wait, replacing all rounded-* with rounded-[30px] might be too aggressive if they want full pills for buttons
            // rounded-full is perfect for pills.
            modified = modified.replace(/rounded-(md|lg|xl|2xl|3xl)/g, 'rounded-[30px]');
            
            if (content !== modified) {
                fs.writeFileSync(fullPath, modified, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir('src');
console.log("Done updating src folder");
