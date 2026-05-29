"use client";
import { useEffect, useState } from "react";

interface Props {
  site: string;
  apiBase?: string;
}

export default function VisitorBadge({ site, apiBase = "" }: Props) {
  const [count, setCount] = useState<number | null>(null);
  const [ticked, setTicked] = useState(false);

  useEffect(() => {
    const storageKey = `visitor-num-${site}`;
    const tickedKey = `visitor-ticked-${site}`;
    setTicked(localStorage.getItem(tickedKey) === "1");

    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setCount(Number(stored));
      return;
    }
    fetch(`${apiBase}/api/visitor?site=${encodeURIComponent(site)}`)
      .then((r) => r.json())
      .then((d) => {
        localStorage.setItem(storageKey, String(d.count));
        setCount(d.count);
      })
      .catch(() => {});
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
