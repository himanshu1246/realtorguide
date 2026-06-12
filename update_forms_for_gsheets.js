const fs = require('fs');

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Add name attributes to contact form
  content = content.replace(/<input type="text" placeholder="Your name" required>/, '<input name="Name" type="text" placeholder="Your name" required>');
  content = content.replace(/<input type="text" placeholder="Company name" required>/, '<input name="Company" type="text" placeholder="Company name" required>');
  content = content.replace(/<input type="tel" placeholder="\+91 XXXXX XXXXX" required>/, '<input name="Phone" type="tel" placeholder="+91 XXXXX XXXXX" required>');
  content = content.replace(/<input type="text" placeholder="City">/, '<input name="Location" type="text" placeholder="City">');
  content = content.replace(/<select>/, '<select name="Budget">');
  content = content.replace(/<textarea placeholder="Tell us about your project..."><\/textarea>/, '<textarea name="Message" placeholder="Tell us about your project..."></textarea>');

  // Add name attributes to modal form
  content = content.replace(/<input type="text" placeholder="Your name" required>/, '<input name="Name" type="text" placeholder="Your name" required>');
  content = content.replace(/<input type="tel" placeholder="\+91 XXXXX XXXXX" required>/, '<input name="Phone" type="tel" placeholder="+91 XXXXX XXXXX" required>');
  content = content.replace(/<input type="text" placeholder="Your company or project name">/, '<input name="Company" type="text" placeholder="Your company or project name">');
  content = content.replace(/<textarea placeholder="How can we help\?" rows="3"><\/textarea>/, '<textarea name="Message" placeholder="How can we help?" rows="3"></textarea>');

  // Update submit handlers to support google sheets
  const jsToReplaceContact = `function handleContactSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  },1500);
}`;
  
  const jsReplacementContact = `function handleContactSubmit(e){
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('contactSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  
  const scriptURL = window.GOOGLE_SHEET_WEBAPP_URL || '';
  
  if (scriptURL) {
    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(() => {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('contactSuccess').style.display = 'block';
        form.reset();
        btn.innerHTML = 'Send Your Enquiry';
        btn.disabled = false;
      })
      .catch(error => {
        console.error('Error!', error.message);
        btn.innerHTML = 'Error! Try Again';
        btn.disabled = false;
      });
  } else {
    setTimeout(()=>{
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
      form.reset();
      btn.innerHTML = 'Send Your Enquiry';
      btn.disabled = false;
    },1500);
  }
}`;

  const jsToReplaceModal = `function handleModalSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('modalSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('modalBody').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
    setTimeout(closeModal, 2500);
  },1500);
}`;

  const jsReplacementModal = `function handleModalSubmit(e){
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('modalSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  
  const scriptURL = window.GOOGLE_SHEET_WEBAPP_URL || '';
  
  if (scriptURL) {
    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(() => {
        document.getElementById('modalBody').style.display = 'none';
        document.getElementById('modalSuccess').style.display = 'block';
        setTimeout(closeModal, 2500);
        form.reset();
        btn.innerHTML = 'Send Enquiry';
        btn.disabled = false;
      })
      .catch(error => {
        console.error('Error!', error.message);
        btn.innerHTML = 'Error! Try Again';
        btn.disabled = false;
      });
  } else {
    setTimeout(()=>{
      document.getElementById('modalBody').style.display = 'none';
      document.getElementById('modalSuccess').style.display = 'block';
      setTimeout(closeModal, 2500);
      form.reset();
      btn.innerHTML = 'Send Enquiry';
      btn.disabled = false;
    },1500);
  }
}`;

  // Check if we already added GOOGLE_SHEET_WEBAPP_URL
  if (!content.includes('window.GOOGLE_SHEET_WEBAPP_URL')) {
    content = content.replace('// ===== CONTACT FORM =====', 'window.GOOGLE_SHEET_WEBAPP_URL = ""; // REPLACE THIS URL\n\n// ===== CONTACT FORM =====');
  }

  content = content.replace(jsToReplaceContact, jsReplacementContact);
  content = content.replace(jsToReplaceModal, jsReplacementModal);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + filePath);
}

updateFile('index.html');
updateFile('public/index.html');
