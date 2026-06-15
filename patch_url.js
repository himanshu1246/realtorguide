const fs = require('fs');
const path = require('path');

const directories = [
  __dirname,
  path.join(__dirname, 'public'),
  path.join(__dirname, 'hostinger_upload')
];

const NEW_URL = 'https://script.google.com/macros/s/AKfycbwYU5WdseRAmgEnf-KuY_KuCEPyuYkMIANe6e3gN9ukEwTeZQGbBu4YOCqIS9SDyIA/exec';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  if (!filePath.endsWith('.html') && !filePath.endsWith('.js') && !filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace any existing Google Script URLs with the new one
  const scriptRegex = /https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/g;
  content = content.replace(scriptRegex, NEW_URL);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated URL in', filePath);
  }
}

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        processFile(fullPath);
      }
    });
  }
});

// Also check src directories if they exist
const srcDirs = [
  path.join(__dirname, 'src', 'components', 'sections'),
  path.join(__dirname, 'src', 'components', 'ui')
];

srcDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        processFile(fullPath);
      }
    });
  }
});
