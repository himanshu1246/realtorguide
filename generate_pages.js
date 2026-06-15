const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const careerHtml = fs.readFileSync(path.join(publicDir, 'career.html'), 'utf8');

// Find where the header ends and footer begins.
// Looking at the career.html structure, we can find the end of the hero/header and start of footer.
// Let's just do a simple string split.
const headerEndMarker = '<!-- ===== CONTENT START ===== -->'; // Or we can just find </nav> or similar.
const navEndIndex = careerHtml.indexOf('</nav>') + 6;
const footerStartIndex = careerHtml.indexOf('<footer class="footer">');

if (navEndIndex > 6 && footerStartIndex > -1) {
  const headAndNav = careerHtml.substring(0, navEndIndex);
  const footerAndEnd = careerHtml.substring(footerStartIndex);

  const privacyContent = `
  <main class="min-h-screen" style="background: #F8F6FF; padding-top: 120px; padding-bottom: 80px;">
    <div class="container mx-auto px-6 md:px-12 max-w-4xl" style="max-width: 800px; margin: 0 auto; color: #4B5563;">
      <h1 class="text-4xl md:text-6xl font-bold mb-4" style="font-family: var(--font-syne); color: #1E1B4B; font-size: 3rem; margin-bottom: 20px;">Privacy Policy</h1>
      <p style="margin-bottom: 40px; font-size: 1.1rem;">Last updated: June 9, 2026</p>

      <div style="line-height: 1.8;">
        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">1. Information We Collect</h2>
        <p style="margin-bottom: 20px;">We collect information you provide directly to us, such as when you fill out a contact form, request a strategy session, or communicate with us. This may include your name, email address, phone number, company name, project location, and budget preferences.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">2. How We Use Your Information</h2>
        <p style="margin-bottom: 10px;">We use the information we collect to:</p>
        <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 20px;">
          <li>Respond to your inquiries and provide requested services</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Analyze usage trends and measure campaign effectiveness</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">3. Data Security</h2>
        <p style="margin-bottom: 20px;">We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">4. Third-Party Services</h2>
        <p style="margin-bottom: 20px;">We may use third-party services such as Google Analytics, Meta Pixel, and CRM platforms to help us understand how users interact with our website. These services may collect information about your browsing behavior.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">5. Cookies</h2>
        <p style="margin-bottom: 20px;">Our website uses cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">6. Your Rights</h2>
        <p style="margin-bottom: 20px;">You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at services@realtorguide.in.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">7. Contact Us</h2>
        <p style="margin-bottom: 20px;">If you have questions about this Privacy Policy, please contact us at:</p>
        <div style="background: #FFFFFF; border: 1px solid rgba(139,92,246,0.1); padding: 24px; border-radius: 20px; margin-top: 20px;">
          <p style="font-weight: bold; color: #1E1B4B; margin-bottom: 10px;">Realtor Guide</p>
          <p>Email: services@realtorguide.in</p>
          <p>Phone: +91 7007319062</p>
        </div>
      </div>
    </div>
  </main>
  `;

  const termsContent = `
  <main class="min-h-screen" style="background: #F8F6FF; padding-top: 120px; padding-bottom: 80px;">
    <div class="container mx-auto px-6 md:px-12 max-w-4xl" style="max-width: 800px; margin: 0 auto; color: #4B5563;">
      <h1 class="text-4xl md:text-6xl font-bold mb-4" style="font-family: var(--font-syne); color: #1E1B4B; font-size: 3rem; margin-bottom: 20px;">Terms of Service</h1>
      <p style="margin-bottom: 40px; font-size: 1.1rem;">Last updated: June 9, 2026</p>

      <div style="line-height: 1.8;">
        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">1. Agreement to Terms</h2>
        <p style="margin-bottom: 20px;">By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our website or use our services.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">2. Services</h2>
        <p style="margin-bottom: 10px;">Realtor Guide provides real estate marketing services including but not limited to:</p>
        <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 20px;">
          <li>Social media marketing and management</li>
          <li>Performance marketing (Google Ads, Meta Ads)</li>
          <li>Content production (video, photography, drone)</li>
          <li>Website development and CRM setup</li>
          <li>Lead generation and automation systems</li>
          <li>WhatsApp and chat automation</li>
        </ul>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">3. Payment Terms</h2>
        <p style="margin-bottom: 20px;">Payment terms will be outlined in individual service agreements. All fees are non-refundable unless otherwise stated. Late payments may incur additional charges as specified in your service agreement.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">4. Intellectual Property</h2>
        <p style="margin-bottom: 20px;">All content created by Realtor Guide, including but not limited to videos, graphics, copy, and website designs, remains the intellectual property of Realtor Guide until full payment is received. Upon completion of payment, ownership transfers to the client as specified in the service agreement.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">5. Limitation of Liability</h2>
        <p style="margin-bottom: 20px;">Realtor Guide shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">6. Termination</h2>
        <p style="margin-bottom: 20px;">Either party may terminate the service agreement with 30 days written notice. In the event of termination, the client will be responsible for payment of all services rendered up to the termination date.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">7. Governing Law</h2>
        <p style="margin-bottom: 20px;">These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Mumbai.</p>

        <h2 style="color: #1E1B4B; font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px;">8. Contact</h2>
        <p style="margin-bottom: 20px;">For questions regarding these terms, please contact us:</p>
        <div style="background: #FFFFFF; border: 1px solid rgba(139,92,246,0.1); padding: 24px; border-radius: 20px; margin-top: 20px;">
          <p style="font-weight: bold; color: #1E1B4B; margin-bottom: 10px;">Realtor Guide</p>
          <p>Email: services@realtorguide.in</p>
          <p>Phone: +91 7007319062</p>
        </div>
      </div>
    </div>
  </main>
  `;

  fs.writeFileSync(path.join(publicDir, 'privacy-policy.html'), headAndNav + privacyContent + footerAndEnd);
  fs.writeFileSync(path.join(publicDir, 'terms.html'), headAndNav + termsContent + footerAndEnd);
  
  // Update nav links in the newly generated files too
  const files = ['privacy-policy.html', 'terms.html'];
  files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
    content = content.replace(/<a href="#">Privacy Policy<\/a>/g, '<a href="privacy-policy.html">Privacy Policy</a>');
    content = content.replace(/<a href="#">Terms of Service<\/a>/g, '<a href="terms.html">Terms of Service</a>');
    fs.writeFileSync(path.join(publicDir, file), content);
  });
  
  console.log("Pages generated successfully.");
} else {
  console.error("Could not find nav or footer in career.html");
}
