const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldClientsLeft = `<div class="clients-left">
      
        <p class="clients-subtext">Partnering`;

const fixedClientsLeft = `<div class="clients-left">
      <div class="clients-header reveal" style="text-align:center;">
        <p class="clients-subtext">Partnering`;

if (html.includes(oldClientsLeft)) {
    html = html.replace(oldClientsLeft, fixedClientsLeft);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Fixed missing clients-header div");
} else {
    // try looser match
    html = html.replace(/<div class="clients-left">\s*<p class="clients-subtext">/, '<div class="clients-left">\n      <div class="clients-header reveal" style="text-align:center;">\n        <p class="clients-subtext">');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Fixed missing clients-header div with regex");
}
