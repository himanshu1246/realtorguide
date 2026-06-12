const fs = require('fs');

const files = ['index.html', 'public/index.html'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace all occurrences of Γé╣ with ₹
    content = content.replace(/Γé╣/g, '₹');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
}
