const fs = require('fs');

const filePaths = ['index.html', 'public/index.html'];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/href="public\//g, 'href="');
  content = content.replace(/src="public\//g, 'src="');
  content = content.replace(/src:'public\//g, "src:'");
  content = content.replace(/video:'public\//g, "video:'");
  content = content.replace(/image: "public\//g, 'image: "');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}
