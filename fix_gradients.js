const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the missed gradient text
html = html.replace(/background:\s*linear-gradient\(90deg,\s*#D82129,\s*#28377A,\s*#1D1D2B\);\s*-webkit-background-clip/g, 'background: linear-gradient(90deg, #7B5CF6, #6340E8); -webkit-background-clip');

// Fix the missed button gradients
html = html.replace(/background:\s*linear-gradient\(90deg,\s*#D82129,\s*#28377A,\s*#1D1D2B\);\s*color:\s*#fff;\s*border:none;\s*border-radius:12px;/g, 'background: linear-gradient(90deg, #F442C2, #E231AE); color: #fff; border:none; border-radius:30px;');

fs.writeFileSync('index.html', html);
console.log("Fixed missed gradients");
