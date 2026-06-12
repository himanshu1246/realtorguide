const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the numbers 01, 02... from the current Case Studies / Clients section
html = html.replace('<span class="client-card-number">0${i+1}</span>', '');

// 2. Add the new "Clients we have worked with" marquee section below the "clients" section (Case Studies)
const newSection = `
<!-- ===== CLIENTS WE HAVE WORKED WITH MARQUEE ===== -->
<section class="clients-marquee-section" id="clients-marquee" style="padding: 60px 0 20px 0; background: #fff; overflow: hidden;">
  <div class="container" style="text-align:center; margin-bottom: 40px;">
    <h2 class="section-heading" style="font-size: 2.5rem; letter-spacing: -1px; color: #1D1D2B;">Clients we have worked with</h2>
  </div>
  <div class="clients-marquee-wrapper" style="overflow: hidden; width: 100vw; margin-left: calc(-50vw + 50%); position: relative; -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);">
    <div class="clients-marquee-track" id="clientsMarqueeTrack" style="display: flex; gap: 24px; width: max-content; animation: scrollMarquee 30s linear infinite;">
      <!-- Cards injected by JS -->
    </div>
  </div>
</section>
`;

// Find the end of the clients section:
//   </div>
// </section>
// <!-- ===== PRODUCTION ===== -->
html = html.replace('</section>\n\n<!-- ===== PRODUCTION ===== -->', '</section>\n' + newSection + '\n<!-- ===== PRODUCTION ===== -->');
// Handle possible \r\n
html = html.replace('</section>\r\n\r\n<!-- ===== PRODUCTION ===== -->', '</section>\r\n' + newSection + '\r\n<!-- ===== PRODUCTION ===== -->');

// 3. Add JS to render the new marquee
const jsToInject = `
// Render New Clients Marquee
(function renderClientsMarquee(){
  const track = document.getElementById('clientsMarqueeTrack');
  if(!track) return;
  const extendedData = [...clientsData, ...clientsData, ...clientsData, ...clientsData, ...clientsData];
  let htmlString = "";
  extendedData.forEach((c)=>{
    htmlString += \`
      <div class="client-card-marquee" style="width: 280px; flex-shrink: 0; padding: 30px; border-radius: 30px; background: #F8F7FF; border: 1px solid rgba(123,92,246,0.1);">
        <div style="font-family:'Inter',sans-serif; font-size: 1.3rem; font-weight: 800; color: #1D1D2B; margin-bottom: 8px;">\${c.name}</div>
        <div style="color: #7B5CF6; font-size: 0.95rem; font-weight: 600; margin-bottom: 16px;">\${c.type}</div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #4B5563; font-weight: 500;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #34D399;"></span>\${c.location}
        </div>
      </div>\`;
  });
  track.innerHTML = htmlString;
})();
`;

// Inject right after renderClients()
// html = html.replace('})();\n\n// Videos Coverflow Logic', '})();\n' + jsToInject + '\n// Videos Coverflow Logic');

const regex = /\}\)\(\);\s*\/\/\s*Videos Coverflow Logic/;
html = html.replace(regex, '})();\n' + jsToInject + '\n// Videos Coverflow Logic');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html successfully.");
