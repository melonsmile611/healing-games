import { NextResponse } from "next/server";
import { promises as fs } from "fs";

// /tmp is writable on Vercel (per Lambda instance)
const DATA_PATH = "/tmp/visitors.json";

async function increment(site: string): Promise<number> {
  let counts: Record<string, number> = {};
  try {
    counts = JSON.parse(await fs.readFile(DATA_PATH, "utf-8"));
  } catch {}
  counts[site] = (counts[site] || 0) + 1;
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(counts));
  } catch {}
  return counts[site];
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "no-store",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(req: Request) {
  const site = (new URL(req.url).searchParams.get("site") || "default")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40);
  const count = await increment(site);
  return NextResponse.json({ count }, { headers: CORS });
}
