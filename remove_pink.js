const fs = require('fs');

const globalsPath = 'src/app/globals.css';
let css = fs.readFileSync(globalsPath, 'utf8');

// Replace the pink button gradient with the solid indigo from the image
css = css.replace(/background:\s*linear-gradient\(90deg,\s*#F442C2,\s*#E231AE\);\s*border-radius:\s*30px;/g, 'background: #5A3AE2; border-radius: 30px;');

// Also fix the button text color so it's white on purple
css = css.replace(/\.btn-primary\s*\{([\s\S]*?)color:\s*#1E1B4B;/g, '.btn-primary {$1color: #FFFFFF;');

// Ensure --color-purple is also matching
css = css.replace(/--color-purple:\s*#E3AADD;/g, '--color-purple: #5A3AE2;');
css = css.replace(/--color-purple-light:\s*#E3AADD;/g, '--color-purple-light: #7B5CF6;');
css = css.replace(/--color-purple-dark:\s*#C8A8E9;/g, '--color-purple-dark: #4022B8;');
css = css.replace(/--color-bg-accent:\s*#C8A8E9;/g, '--color-bg-accent: #E5E0FA;');

// Replace the older gradients just in case
css = css.replace(/linear-gradient\(135deg,\s*#F6BCBA,\s*#E3AADD,\s*#C8A8E9,\s*#C3C7F4\)/g, '#5A3AE2');

// Update gradient-text to be the new indigo if we want it to match exactly
css = css.replace(/linear-gradient\(90deg,\s*#7B5CF6,\s*#6340E8\)/g, 'linear-gradient(90deg, #5A3AE2, #4022B8)');

fs.writeFileSync(globalsPath, css);
console.log("Updated globals.css to remove pink and use Indigo");
