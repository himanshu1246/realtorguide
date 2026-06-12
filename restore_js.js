const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The string starts after `  })();` and before `function closeMobileMenu(){`
// Let's use regex to find exactly this block.
const regex = /\}\)\(\);\s*\n\s*\}\s*\n\s*function closeMobileMenu\(\)\{/g;

const replacement = `})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('navbar');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
function toggleMobileMenu(){
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(hamburger) hamburger.classList.toggle('active');
  if(mobileMenu) mobileMenu.classList.toggle('active');
  if(mobileMenu) document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu(){`;

content = content.replace(regex, replacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log("Restored missing JS functions.");
