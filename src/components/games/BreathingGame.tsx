"use client";

import { useState, useEffect, useRef } from "react";

type Phase = { label: string; dur: number; scale: number; color: string };

const PHASES: Phase[] = [
  { label: "Breathe in",  dur: 4, scale: 1.5, color: "#4db89c" },
  { label: "Hold",        dur: 7, scale: 1.5, color: "#e8c87a" },
  { label: "Breathe out", dur: 8, scale: 1.0, color: "#c4b5d4" },
];

export default function BreathingGame() {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (phaseTimeoutRef.current) clearTimeout(phaseTimeoutRef.current);
  };

  const runPhase = (pIdx: number, cyc: number) => {
    const phase = PHASES[pIdx];
    setPhaseIdx(pIdx);
    setCount(phase.dur);

    timerRef.current = setInterval(() => {
      setCount(c => {
        if (c <= 1) { if (timerRef.current) clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);

    phaseTimeoutRef.current = setTimeout(() => {
      const next = (pIdx + 1) % 3;
      const nextCyc = next === 0 ? cyc + 1 : cyc;
      if (next === 0) setCycles(nextCyc);
      runPhase(next, nextCyc);
    }, phase.dur * 1000);
  };

  const start = () => { setRunning(true); setCycles(0); runPhase(0, 0); };
  const stop  = () => { clear(); setRunning(false); setPhaseIdx(0); setCount(0); };

  useEffect(() => () => clear(), []);

  const phase = PHASES[phaseIdx];

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* animated circle */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute rounded-full opacity-20 transition-all"
          style={{
            width:  running ? `${200 * phase.scale + 40}px` : "240px",
            height: running ? `${200 * phase.scale + 40}px` : "240px",
            background: running ? phase.color : "#4db89c",
            transitionDuration: `${phase.dur * 1000}ms`,
            transitionTimingFunction: "ease-in-out",
          }}
        />
        <div
          className="rounded-full flex items-center justify-center text-white font-semibold text-base shadow-lg transition-all"
          style={{
            width: "200px", height: "200px",
            transform: running ? `scale(${phase.scale})` : "scale(1)",
            background: running
              ? `radial-gradient(circle, ${phase.color}cc, ${phase.color}88)`
              : "radial-gradient(circle, #c4b5d4aa, #c4b5d444)",
            borderWidth: "2px", borderStyle: "solid",
            borderColor: running ? phase.color : "#c4b5d4",
            transitionDuration: `${running ? phase.dur * 1000 : 600}ms`,
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <span className="text-white/90 text-sm font-semibold">
            {running ? phase.label : "follow the breath"}
          </span>
        </div>
      </div>

      {/* count */}
      <div className="text-center h-20 flex flex-col justify-center gap-1">
        {running ? (
          <>
            <div className="text-5xl font-light text-mint-500">{count}</div>
            <div className="text-sm text-muted">{phase.label}</div>
          </>
        ) : (
          <p className="text-muted text-sm">4s inhale · 7s hold · 8s exhale</p>
        )}
      </div>

      {cycles > 0 && (
        <div className="px-4 py-1.5 rounded-full bg-mint-50 border border-border text-mint-600 text-sm font-semibold">
          {cycles} {cycles === 1 ? "cycle" : "cycles"} ✨
        </div>
      )}

      <button
        onClick={running ? stop : start}
        className={`px-8 py-3 rounded-full font-bold text-base transition-all shadow-md ${
          running
            ? "border-2 border-blush text-blush hover:bg-red-50"
            : "bg-lavender text-white hover:opacity-90"
        }`}
      >
        {running ? "Stop" : "Start"}
      </button>

      <p className="text-xs text-muted text-center max-w-xs leading-relaxed opacity-70">
        The 4-7-8 breathing method by Dr. Andrew Weil — helps calm the nervous system.
      </p>
    </div>
  );
}
