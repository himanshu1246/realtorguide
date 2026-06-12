const fs = require('fs');

const filePaths = ['index.html', 'public/index.html'];

for (const filePath of filePaths) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Add .marquee-wrapper CSS to the style block if not present
  const styleStr = `
.marquee-wrapper {
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
`;
  if (!content.includes('.marquee-wrapper {')) {
    content = content.replace('</style>', styleStr + '</style>');
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log("Marquee wrapper CSS injected!");
