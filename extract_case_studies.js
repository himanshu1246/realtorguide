const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'Case study');
const caseStudies = [];

for (let i = 1; i <= 9; i++) {
    const caseDir = path.join(dir, `case study ${i}`);
    try {
        const info = fs.readFileSync(path.join(caseDir, 'info.txt'), 'utf8');
        // Example: Project – Raheja Universal , Juinagar Amount Spent – 9.10 Lakh In a Quarter Leads Generated – 407 Site Visit – 38 Deal Closure – 6  Revenue – 8.58 CR 
        
        // Let's use regex to extract the parts, or just log them out so I can see their format.
        caseStudies.push({
            id: i,
            image: `public/Case study/case study ${i}/image.jpg`,
            rawText: info.trim()
        });
    } catch (e) {
        console.error(`Error reading case study ${i}:`, e.message);
    }
}

console.log(JSON.stringify(caseStudies, null, 2));
