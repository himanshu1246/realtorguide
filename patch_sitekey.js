const fs = require('fs');
const path = require('path');

const directories = [
  __dirname,
  path.join(__dirname, 'public'),
  path.join(__dirname, 'hostinger_upload')
];

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  if (!filePath.endsWith('.html')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace placeholder site key with actual site key
  content = content.replace(/YOUR_RECAPTCHA_SITE_KEY/g, '6LdHViAtAAAAAMx6wXsdE2xBap4nxIa468HBomzW');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated Site Key in', filePath);
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
