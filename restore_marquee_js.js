const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

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

// Inject right after renderClients
// We already have renderClients in the file. Let's find it.
const renderClientsEnd = html.indexOf('})();', html.indexOf('function renderClients()')) + 5;

if (renderClientsEnd !== -1 && html.indexOf('function renderClientsMarquee') === -1) {
    html = html.substring(0, renderClientsEnd) + '\n' + jsToInject + html.substring(renderClientsEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Restored renderClientsMarquee!");
} else {
    console.log("Error restoring renderClientsMarquee.");
}
