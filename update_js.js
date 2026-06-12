const fs = require('fs');

const filePaths = ['index.html', 'public/index.html'];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Let's manually replace the functions
  const oldContact = `// ===== CONTACT FORM =====
function handleContactSubmit(e){
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  },1500);
}`;

  const newContact = `// ===== CONTACT FORM =====
function handleContactSubmit(e){
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

  const oldModal = `function handleModalSubmit(e){
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

  const newModal = `function handleModalSubmit(e){
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

  content = content.replace(oldContact, newContact);
  content = content.replace(oldModal, newModal);
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done');
