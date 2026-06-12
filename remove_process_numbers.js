const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Increase font size
html = html.replace('.process-card-list li { display:flex; align-items:center; gap:10px; font-size:0.85rem; }', 
                    '.process-card-list li { display:flex; align-items:center; gap:10px; font-size:1.05rem; }');

// Remove process-card-number
html = html.replace('<span class="process-card-number">0${i+1}</span>', '');

// Remove process-card-step
html = html.replace('<div class="process-card-step">${p.step}</div>', '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html');


// 2. Update Process.tsx
const tsxPath = 'src/components/sections/Process.tsx';
if (fs.existsSync(tsxPath)) {
    let tsx = fs.readFileSync(tsxPath, 'utf8');
    
    // Increase font size from text-sm to text-[1.05rem]
    tsx = tsx.replace(/<span className="text-sm" style={{ color: index % 2 === 0 \? "#4B5563" : "#7B5CF6" }}>\{item\}<\/span>/g, 
                      '<span className="text-[1.05rem]" style={{ color: index % 2 === 0 ? "#4B5563" : "#7B5CF6" }}>{item}</span>');
                      
    // Remove large number
    tsx = tsx.replace(/<div className="absolute -top-2 -right-1 text-\[7rem\] font-heading font-bold leading-none pointer-events-none"[\s\S]*?>\{step\.num\}<\/div>/, '');
    
    // Remove small step
    tsx = tsx.replace(/<div className="text-xs uppercase tracking-\[0\.3em\] font-semibold mb-3"[\s\S]*?>Step \{step\.num\}<\/div>/, '');
    
    fs.writeFileSync(tsxPath, tsx, 'utf8');
    console.log('Updated Process.tsx');
}
