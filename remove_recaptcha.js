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

  // 1. Remove the recaptcha script tag
  const scriptRegex = /<script src="https:\/\/www\.google\.com\/recaptcha\/api\.js" async defer><\/script>\s*/g;
  content = content.replace(scriptRegex, '');

  // 2. Remove the recaptcha widget
  const widgetRegex = /<div class="g-recaptcha"[^>]+><\/div>\s*/g;
  content = content.replace(widgetRegex, '');

  // 3. Remove the JS validation block
  const validationRegex = /\s*const recaptchaResponse = e\.target\.querySelector\('\.g-recaptcha-response'\)\?\.value;\s*if \(!recaptchaResponse\) \{\s*alert\("Please complete the reCAPTCHA to verify you are human\."\);\s*return;\s*\}/g;
  content = content.replace(validationRegex, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Removed recaptcha from', filePath);
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
