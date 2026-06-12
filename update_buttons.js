const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change "View Our Process" button to btn-primary
html = html.replace('<a href="#process" class="btn-secondary">', '<a href="#process" class="btn-primary">');

// 2. Make "Enquire Now" button in navbar smaller
const navbarBtn = '<div class="navbar-cta"><button class="btn-primary" onclick="openModal()">Enquire Now</button></div>';
const navbarBtnSmall = '<div class="navbar-cta"><button class="btn-primary" style="font-size: 0.9rem; padding: 12px 28px; border-radius: 30px; font-weight: 700;" onclick="openModal()">Enquire Now</button></div>';
html = html.replace(navbarBtn, navbarBtnSmall);

// 3. Make mobile menu "Enquire Now" smaller as well
const mobileBtn = '<button class="btn-primary" onclick="openModal(); closeMobileMenu();">Enquire Now</button>';
const mobileBtnSmall = '<button class="btn-primary" style="font-size: 0.9rem; padding: 12px 28px; border-radius: 30px; font-weight: 700; width: 100%;" onclick="openModal(); closeMobileMenu();">Enquire Now</button>';
html = html.replace(mobileBtn, mobileBtnSmall);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html");
