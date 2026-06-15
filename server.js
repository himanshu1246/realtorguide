const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = 3000;

// Serve the public/ folder — this contains index.html + all assets
const ROOT = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".mp4":  "video/mp4",
  ".MP4":  "video/mp4",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
};

function getMime(filePath) {
  const ext = path.extname(filePath);
  return MIME[ext] || MIME[ext.toLowerCase()] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  // Decode URL (handles spaces and special chars)
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split("?")[0]);
  } catch(e) {
    urlPath = req.url.split("?")[0];
  }

  // Default to index.html
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  const filePath = path.join(ROOT, urlPath);

  // Security: no directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      console.log("  NOT FOUND: " + urlPath);
      res.writeHead(404); return res.end("Not Found");
    }

    const mime     = getMime(filePath);
    const fileSize = stat.size;
    const range    = req.headers.range;

    // Video range request (needed for seeking in videos)
    if (range && mime.startsWith("video/")) {
      const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
      const start     = parseInt(startStr, 10);
      const end       = endStr ? parseInt(endStr, 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range":  `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges":  "bytes",
        "Content-Length": chunkSize,
        "Content-Type":   mime,
        "Cache-Control":  "public, max-age=3600",
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type":   mime,
        "Content-Length": fileSize,
        "Accept-Ranges":  "bytes",
        "Cache-Control":  "public, max-age=3600",
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n  ERROR: Port ${PORT} is already in use!`);
    console.error(`  Close the other server and try again.\n`);
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("\n=====================================");
  console.log("   Realtor Guide Website is LIVE!");
  console.log("   Open: http://localhost:" + PORT);
  console.log("   Press Ctrl+C to stop");
  console.log("=====================================\n");
});
