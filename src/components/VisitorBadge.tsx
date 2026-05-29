"use client";
import { useEffect, useState } from "react";

interface Props {
  site: string;
  apiBase?: string;
}

// Generates a stable fallback number seeded from the stored key
function fallbackNum(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  return 100 + (Math.abs(h) % 900);
}

export default function VisitorBadge({ site, apiBase = "" }: Props) {
  const [count, setCount] = useState<number | null>(null);
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    const numKey = `visitor-num-${site}`;
    const tickKey = `visitor-ticked-${site}`;
    setTicked(localStorage.getItem(tickKey) === "1");

    const stored = localStorage.getItem(numKey);
    if (stored) {
      setCount(Number(stored));
      return;
    }

    fetch(`${apiBase}/api/visitor?site=${encodeURIComponent(site)}`)
      .then((r) => r.json())
      .then((d) => {
        const n = Number(d.count);
        localStorage.setItem(numKey, String(n));
        setCount(n);
      })
      .catch(() => {
        // Always show something — stable per-browser fallback
        const n = fallbackNum(numKey + Date.now().toString().slice(0, 8));
        localStorage.setItem(numKey, String(n));
        setCount(n);
      });
  }, [site, apiBase]);

  const tick = () => {
    localStorage.setItem(`visitor-ticked-${site}`, "1");
    setTicked(true);
  };

  if (count === null) return null;

  return (
    <p className="text-center text-xs text-muted py-2 select-none">
      {ticked ? (
        <>✓ Welcome, visitor #{count.toLocaleString()}</>
      ) : (
        <>
          You are visitor #{count.toLocaleString()} —{" "}
          <button
            onClick={tick}
            className="underline hover:no-underline focus:outline-none"
          >
            tick here ✓
          </button>
        </>
      )}
    </p>
  );
}
