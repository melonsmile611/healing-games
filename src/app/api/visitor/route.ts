import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "visitors.json");

async function readCounts(): Promise<Record<string, number>> {
  try {
    return JSON.parse(await fs.readFile(DATA_PATH, "utf-8"));
  } catch {
    return {};
  }
}

async function increment(site: string): Promise<number> {
  const counts = await readCounts();
  counts[site] = (counts[site] || 0) + 1;
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(counts, null, 2));
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
