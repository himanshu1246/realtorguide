import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  // Read the static index.html from the public folder
  const filePath = path.join(process.cwd(), "public", "index.html");
  const html = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
