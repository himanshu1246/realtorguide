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

  // Find duplicate declarations block
  const duplicateBlock = `  const recaptchaResponse = e.target.querySelector('.g-recaptcha-response')?.value;
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA to verify you are human.");
    return;
  }
  const recaptchaResponse = e.target.querySelector('.g-recaptcha-response')?.value;
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA to verify you are human.");
    return;
  }`;

  const replacementBlock = `  const recaptchaResponse = e.target.querySelector('.g-recaptcha-response')?.value;
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA to verify you are human.");
    return;
  }`;

  // We need to carefully replace double declarations
  // Because spacing might vary slightly, let's use a regex
  
  const badRegex = /const recaptchaResponse = e\.target\.querySelector\('\.g-recaptcha-response'\)\?\.value;\s*if \(!recaptchaResponse\) \{\s*alert\("Please complete the reCAPTCHA to verify you are human\."\);\s*return;\s*\}\s*const recaptchaResponse = e\.target\.querySelector\('\.g-recaptcha-response'\)\?\.value;\s*if \(!recaptchaResponse\) \{\s*alert\("Please complete the reCAPTCHA to verify you are human\."\);\s*return;\s*\}/g;

  content = content.replace(badRegex, replacementBlock);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed syntax error in', filePath);
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
