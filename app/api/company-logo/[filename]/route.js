import { promises as fs } from "fs";
import path from "path";

const mimeByExt = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function fallbackSvg(label = "Logo") {
  const escapedLabel = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <rect width="160" height="160" rx="20" fill="#1a1a1a"/>
  <rect x="4" y="4" width="152" height="152" rx="16" fill="none" stroke="#3a3a3a"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#f2f2f2" font-family="Arial, sans-serif" font-size="20">${escapedLabel}</text>
</svg>`;
}

export async function GET(_request, { params }) {
  const { filename } = await params;
  const safeName = path.basename(filename);
  const ext = path.extname(safeName).toLowerCase();
  const filePath = path.join(process.cwd(), "assets", "logos", safeName);

  try {
    const buffer = await fs.readFile(filePath);
    return new Response(buffer, {
      headers: {
        "Content-Type": mimeByExt[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    const label = safeName.split(".")[0].slice(0, 12) || "Logo";
    return new Response(fallbackSvg(label), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
      status: 200,
    });
  }
}
