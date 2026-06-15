const fs = require('fs');

const indexPath = 'd:/realtor guide/public/index.html';
const careerPath = 'd:/realtor guide/public/career.html';

let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Find the insertion points
const heroStartIndex = indexHtml.indexOf('<!-- ===== HERO ===== -->');
const footerStartIndex = indexHtml.indexOf('<!-- ===== FOOTER ===== -->');

if (heroStartIndex === -1 || footerStartIndex === -1) {
    console.error("Could not find boundaries.");
    process.exit(1);
}

const headerPart = indexHtml.substring(0, heroStartIndex);
const footerPart = indexHtml.substring(footerStartIndex);

// Career section HTML
const careerContent = `
<!-- ===== CAREER SECTION ===== -->
<style>
.career-section { padding: 150px 0 100px; min-height: 100vh; background: linear-gradient(180deg,#FFFFFF 0%,#F8F7FF 100%); }
.career-header { text-align: center; margin-bottom: 60px; }
.career-h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-family: 'Inter', sans-serif; font-weight: 800; color: #1D1D2B; margin-bottom: 20px; }
.career-subtext { font-size: 1.1rem; color: #4B5563; max-width: 600px; margin: 0 auto; line-height: 1.7; }
.career-grid { display: grid; grid-template-columns: 1fr; max-width: 800px; margin: 0 auto; gap: 24px; }
.job-card { background: #FFFFFF; border: 1px solid rgba(139,92,246,0.15); border-radius: 20px; padding: 32px; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(139,92,246,0.05); cursor: pointer; }
.job-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.3); }
.job-title { font-size: 1.3rem; font-weight: 700; color: #1D1D2B; margin-bottom: 8px; }
.job-type { display: inline-block; background: #F3E8FF; color: #7B5CF6; font-size: 0.8rem; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
.apply-btn { background: #7B5CF6; color: #FFF; border: none; padding: 12px 24px; border-radius: 30px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
.apply-btn:hover { background: #5A3AE2; }

/* Modal for Application */
.app-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 2000; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
.app-modal-overlay.active { display: flex; opacity: 1; }
.app-modal { background: #FFF; border-radius: 24px; width: 90%; max-width: 500px; padding: 40px; position: relative; transform: translateY(20px); transition: transform 0.3s; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.app-modal-overlay.active .app-modal { transform: translateY(0); }
.app-modal-close { position: absolute; top: 20px; right: 20px; background: none; border: none; cursor: pointer; color: #6B7280; transition: color 0.3s; }
.app-modal-close:hover { color: #111; }
.app-modal h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 10px; color: #1D1D2B; }
.app-modal p { color: #6B7280; font-size: 0.95rem; margin-bottom: 24px; }
.app-form-group { margin-bottom: 16px; }
.app-form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 6px; }
.app-form-group input, .app-form-group select { width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 12px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.3s; }
.app-form-group input:focus, .app-form-group select:focus { border-color: #7B5CF6; }
.app-submit-btn { width: 100%; background: #7B5CF6; color: #FFF; border: none; padding: 14px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: background 0.3s; margin-top: 10px; }
.app-submit-btn:hover { background: #5A3AE2; }
.app-success { display: none; text-align: center; color: #10B981; font-weight: 600; margin-top: 20px; }
</style>

<section class="career-section reveal">
  <div class="container">
    <div class="career-header">
      <div class="section-label section-label-center">
        <span class="line line-left"></span> Join Our Team <span class="line line-right"></span>
      </div>
      <h1 class="career-h1">Current Openings</h1>
      <p class="career-subtext">We are always looking for talented individuals to join our team. Explore our internship opportunities below and kickstart your career with Realtor Guide.</p>
    </div>

    <div class="career-grid">
      
      <div class="job-card" onclick="openAppModal('Business Development Intern')">
        <div>
          <h3 class="job-title">Business Development</h3>
          <span class="job-type">Internship</span>
        </div>
        <button class="apply-btn">Apply Details</button>
      </div>

      <div class="job-card" onclick="openAppModal('Sales and Marketing Intern')">
        <div>
          <h3 class="job-title">Sales and Marketing</h3>
          <span class="job-type">Internship</span>
        </div>
        <button class="apply-btn">Apply Details</button>
      </div>

      <div class="job-card" onclick="openAppModal('Graphic Designer Intern')">
        <div>
          <h3 class="job-title">Graphic Designer</h3>
          <span class="job-type">Internship</span>
        </div>
        <button class="apply-btn">Apply Details</button>
      </div>

      <div class="job-card" onclick="openAppModal('Digital Marketing Intern')">
        <div>
          <h3 class="job-title">Digital Marketing</h3>
          <span class="job-type">Internship</span>
        </div>
        <button class="apply-btn">Apply Details</button>
      </div>

    </div>
  </div>
</section>

<!-- Application Modal -->
<div class="app-modal-overlay" id="appModalOverlay" onclick="closeAppModalOutside(event)">
  <div class="app-modal">
    <button class="app-modal-close" onclick="closeAppModal()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <h3>Apply Now</h3>
    <p>Role: <strong id="selectedRoleText"></strong></p>
    
    <form id="appForm" onsubmit="handleAppSubmit(event)">
      <!-- Hidden field for Apps Script routing to 'career' sheet -->
      <input type="hidden" name="SheetName" value="career">
      <input type="hidden" name="Role" id="hiddenRoleInput">

      <div class="app-form-group">
        <label>Full Name *</label>
        <input type="text" name="Name" required placeholder="John Doe">
      </div>
      <div class="app-form-group">
        <label>Email *</label>
        <input type="email" name="Email" required placeholder="john@example.com">
      </div>
      <div class="app-form-group">
        <label>Phone Number *</label>
        <input type="tel" name="Phone" required placeholder="+91 XXXXX XXXXX">
      </div>
      <div class="app-form-group">
        <label>Portfolio / LinkedIn Profile Link</label>
        <input type="url" name="Portfolio" placeholder="https://...">
      </div>
      
      <button type="submit" class="app-submit-btn" id="appSubmitBtn">Submit Application</button>
      <div class="app-success" id="appSuccess">Application submitted successfully! We'll be in touch.</div>
    </form>
  </div>
</div>

<script>
function openAppModal(role) {
  document.getElementById('selectedRoleText').innerText = role;
  document.getElementById('hiddenRoleInput').value = role;
  document.getElementById('appModalOverlay').classList.add('active');
  document.getElementById('appSuccess').style.display = 'none';
  document.getElementById('appForm').style.display = 'block';
}

function closeAppModal() {
  document.getElementById('appModalOverlay').classList.remove('active');
}

function closeAppModalOutside(e) {
  if(e.target === document.getElementById('appModalOverlay')) {
    closeAppModal();
  }
}

function handleAppSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('appSubmitBtn');
  btn.innerText = 'Submitting...';
  btn.disabled = true;
  
  const scriptURL = window.GOOGLE_SHEET_WEBAPP_URL || 'https://script.google.com/macros/s/AKfycbwnbZm3q7t9sAEJCrSO6jWgwded7KOwRe9LF1i5yA0mQb3qYMLc7iWFSn2Sp0pqqM3Zpw/exec';
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
    .then(() => {
      document.getElementById('appForm').style.display = 'none';
      document.getElementById('appSuccess').style.display = 'block';
      form.reset();
      btn.innerText = 'Submit Application';
      btn.disabled = false;
    })
    .catch(error => {
      console.error('Error!', error);
      btn.innerText = 'Error! Try Again';
      btn.disabled = false;
    });
}
</script>

`;

let finalHtml = headerPart + careerContent + footerPart;

finalHtml = finalHtml.replace("gsap.to('#heroOrb1'", "if(document.getElementById('heroOrb1')) gsap.to('#heroOrb1'");
finalHtml = finalHtml.replace("gsap.to('#heroOrb2'", "if(document.getElementById('heroOrb2')) gsap.to('#heroOrb2'");
finalHtml = finalHtml.replace("gsap.to('#heroCard'", "if(document.getElementById('heroCard')) gsap.to('#heroCard'");

fs.writeFileSync(careerPath, finalHtml);
console.log("career.html generated successfully.");
