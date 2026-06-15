const fs = require('fs');
const path = require('path');

const directories = [
  __dirname,
  path.join(__dirname, 'public'),
  path.join(__dirname, 'hostinger_upload')
];

const SITE_KEY = '6LdHViAtAAAAAMx6wXsdE2xBap4nxIa468HBomzW';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  if (!filePath.endsWith('.html')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Insert recaptcha above contactSubmitBtn
  const contactBtnMatch = /<button type="submit" class="btn-primary" style="width:100%; justify-content:center;" id="contactSubmitBtn">Send Your Enquiry<\/button>/;
  if (content.match(contactBtnMatch) && !content.includes('g-recaptcha')) {
    const recaptchaWidget = `<div class="g-recaptcha" data-sitekey="${SITE_KEY}" style="margin-bottom: 16px;"></div>\n        `;
    content = content.replace(contactBtnMatch, recaptchaWidget + '<button type="submit" class="btn-primary" style="width:100%; justify-content:center;" id="contactSubmitBtn">Send Your Enquiry</button>');
  }

  // Insert recaptcha above modalSubmitBtn
  const modalBtnMatch = /<button type="submit" class="btn-primary" id="modalSubmitBtn">Send Enquiry<\/button>/;
  if (content.match(modalBtnMatch) && !content.includes(`data-sitekey="${SITE_KEY}" style="margin-bottom: 16px;"></div>\n        <button type="submit" class="btn-primary" id="modalSubmitBtn"`)) {
    // Note: since the page might already have g-recaptcha from the first replace, we just check if it's placed here
    const recaptchaWidget = `<div class="g-recaptcha" data-sitekey="${SITE_KEY}" style="margin-bottom: 16px;"></div>\n        `;
    // We only want to replace if there's no g-recaptcha right before it
    const modalBtnContext = content.substring(content.indexOf('id="modalSubmitBtn"') - 150, content.indexOf('id="modalSubmitBtn"'));
    if (!modalBtnContext.includes('g-recaptcha')) {
      content = content.replace(modalBtnMatch, recaptchaWidget + '<button type="submit" class="btn-primary" id="modalSubmitBtn">Send Enquiry</button>');
    }
  }

  // Add the recaptcha script if missing
  if (!content.includes('https://www.google.com/recaptcha/api.js')) {
    content = content.replace('</head>', '  <script src="https://www.google.com/recaptcha/api.js" async defer></script>\n</head>');
  }

  // Ensure JS checks are present
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
