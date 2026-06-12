const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The chunk currently is:
// })();
// 
// });
// 
// // ===== MOBILE MENU =====

const badChunk = `})();

});

// ===== MOBILE MENU =====`;

const goodChunk = `})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('navbar');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====`;

html = html.replace(badChunk, goodChunk);

// And wait, just in case there are other issues, let's verify if `heroChart` logic is still around.
// We removed it completely, which is what we wanted.

fs.writeFileSync('index.html', html, 'utf8');
console.log("Fixed syntax error.");
