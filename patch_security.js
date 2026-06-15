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

  // 1. Remove security script and add recaptcha script
  const securityScriptRegex = /<script>\s*\/\/ Basic front-end security to prevent casual inspection[\s\S]*?<\/script>/g;
  if (content.match(securityScriptRegex)) {
    content = content.replace(securityScriptRegex, '<!-- Removed front-end security deterrent -->\n<script src="https://www.google.com/recaptcha/api.js" async defer></script>');
  }

  // 2. Add recaptcha widget to contact form
  const submitBtnContact = '<button type="submit" class="btn-primary" style="width:100%; justify-content:center; margin-top:10px;">Send Message</button>';
  if (content.includes(submitBtnContact) && !content.includes('YOUR_RECAPTCHA_SITE_KEY')) {
    const recaptchaWidget = '<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" style="margin-bottom: 16px;"></div>\n        ';
    content = content.replace(submitBtnContact, recaptchaWidget + submitBtnContact);
  }

  // 3. Add recaptcha widget to modal form
  const submitBtnModal = '<button type="submit" class="btn-primary" style="width:100%; justify-content:center; margin-top:8px;">Request Callback</button>';
  if (content.includes(submitBtnModal) && !content.includes('YOUR_RECAPTCHA_SITE_KEY" style="margin-bottom: 16px;"></div>\n          <button type="submit" class="btn-primary" style="width:100%; justify-content:center; margin-top:8px;">Request Callback</button>')) {
    const recaptchaWidget = '<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" style="margin-bottom: 16px;"></div>\n          ';
    content = content.replace(submitBtnModal, recaptchaWidget + submitBtnModal);
  }

  // 4. Update JS functions
  const contactFnMatch = /function handleContactSubmit\(e\)\s*\{\s*e\.preventDefault\(\);/g;
  if (content.match(contactFnMatch)) {
    content = content.replace(contactFnMatch, `function handleContactSubmit(e){\n  e.preventDefault();\n  const recaptchaResponse = e.target.querySelector('.g-recaptcha-response')?.value;\n  if (!recaptchaResponse) {\n    alert("Please complete the reCAPTCHA to verify you are human.");\n    return;\n  }`);
  }

  const modalFnMatch = /function handleModalSubmit\(e\)\s*\{\s*e\.preventDefault\(\);/g;
  if (content.match(modalFnMatch)) {
    content = content.replace(modalFnMatch, `function handleModalSubmit(e){\n  e.preventDefault();\n  const recaptchaResponse = e.target.querySelector('.g-recaptcha-response')?.value;\n  if (!recaptchaResponse) {\n    alert("Please complete the reCAPTCHA to verify you are human.");\n    return;\n  }`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
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
