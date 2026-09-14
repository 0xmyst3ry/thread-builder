// /pages/api/placeholder/[width]/[height].ts
import type { NextApiRequest, NextApiResponse } from "next";

const MAX_DIMENSION = 2000;

function parseDimension(value: string | string[] | undefined, fallback: number): number {
  const n = parseInt(Array.isArray(value) ? value[0] : value ?? "", 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(n, MAX_DIMENSION);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const width = parseDimension(req.query.width, 400);
  const height = parseDimension(req.query.height, 300);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#e2e8f0"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#64748b">${width} × ${height}</text>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");
  res.status(200).send(svg);
}
