"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 20;
const ROWS = 20;
const TOTAL = COLS * ROWS;

const PALETTE = [
  { color: "#e8e8e8", label: "White" },
  { color: "#f5a623", label: "Amber" },
  { color: "#4db89c", label: "Mint" },
  { color: "#e87070", label: "Rose" },
  { color: "#a78bfa", label: "Violet" },
  { color: "",        label: "Erase" },
];

function playTick(ac: AudioContext) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = 900 + Math.random() * 200;
  g.gain.value = 0.03;
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.05);
  osc.connect(g); g.connect(ac.destination);
  osc.start(); osc.stop(ac.currentTime + 0.06);
}

export default function GlyphGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<string[]>(Array(TOTAL).fill(""));
  const isDrawingRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);
  const glowRef = useRef<number[]>([]); // recently lit cells for pulse
  const [selectedColor, setSelectedColor] = useState("#e8e8e8");
  const selectedColorRef = useRef("#e8e8e8");
  selectedColorRef.current = selectedColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const CW = W / COLS;
    const CH = H / ROWS;
    const DOT_R = Math.min(CW, CH) * 0.32;

    function draw() {
      rafRef.current = requestAnimationFrame(draw);

      // dark background
      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, W, H);

      // subtle grid dots (unlit markers)
      ctx.fillStyle = "#1e1e1e";
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cx = c * CW + CW / 2;
          const cy = r * CH + CH / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, DOT_R * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // lit cells
      const now = performance.now();
      cellsRef.current.forEach((color, idx) => {
        if (!color) return;
        const col = idx % COLS;
        const row = Math.floor(idx / COLS);
        const cx = col * CW + CW / 2;
        const cy = row * CH + CH / 2;

        // pulse: recently lit cells glow brighter
        const litAt = glowRef.current[idx] ?? 0;
        const age = now - litAt;
        const pulse = age < 300 ? 1 + 0.6 * Math.max(0, 1 - age / 300) : 1;

        ctx.shadowBlur = 14 * pulse;
        ctx.shadowColor = color;
        ctx.globalAlpha = Math.min(1, 0.85 * pulse);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(cx, cy, DOT_R * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });
    }

    draw();

    function initAudio() {
      if (!audioRef.current) audioRef.current = new AudioContext();
      else if (audioRef.current.state === "suspended") audioRef.current.resume();
    }

    function cellAt(x: number, y: number): number | null {
      const col = Math.floor(x / CW);
      const row = Math.floor(y / CH);
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return null;
      return row * COLS + col;
    }

    function paint(idx: number) {
      const color = selectedColorRef.current;
      if (cellsRef.current[idx] === color) return; // no change, no sound
      cellsRef.current[idx] = color;
      if (color) {
        glowRef.current[idx] = performance.now();
        initAudio();
        const ac = audioRef.current;
        if (ac && ac.state === "running") playTick(ac);
      }
    }

    function onMouseDown(e: MouseEvent) {
      isDrawingRef.current = true;
      const rect = canvasRef.current!.getBoundingClientRect();
      const idx = cellAt(e.clientX - rect.left, e.clientY - rect.top);
      if (idx !== null) paint(idx);
    }
    function onMouseMove(e: MouseEvent) {
      if (!isDrawingRef.current) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      const idx = cellAt(e.clientX - rect.left, e.clientY - rect.top);
      if (idx !== null) paint(idx);
    }
    function onMouseUp() { isDrawingRef.current = false; }

    function onTouchStart(e: TouchEvent) {
      e.preventDefault();
      isDrawingRef.current = true;
      const rect = canvasRef.current!.getBoundingClientRect();
      const t = e.touches[0];
      const idx = cellAt(t.clientX - rect.left, t.clientY - rect.top);
      if (idx !== null) paint(idx);
    }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const rect = canvasRef.current!.getBoundingClientRect();
      const t = e.touches[0];
      const idx = cellAt(t.clientX - rect.left, t.clientY - rect.top);
      if (idx !== null) paint(idx);
    }
    function onTouchEnd() { isDrawingRef.current = false; }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  function clear() {
    cellsRef.current = Array(TOTAL).fill("");
    glowRef.current = [];
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl"
        style={{
          height: "340px",
          background: "#0d0d0d",
          cursor: "crosshair",
          touchAction: "none",
        }}
      />

      {/* palette */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex gap-2 flex-wrap">
          {PALETTE.map(({ color, label }) => (
            <button
              key={label}
              title={label}
              onClick={() => setSelectedColor(color)}
              className="rounded-full border-2 transition-all"
              style={{
                width: 28,
                height: 28,
                background: color || "#0d0d0d",
                borderColor: selectedColor === color ? "#ffffff" : "#333",
                boxShadow: selectedColor === color && color
                  ? `0 0 8px 2px ${color}88`
                  : "none",
              }}
            >
              {!color && (
                <span className="text-[10px] text-gray-500 font-bold leading-none">✕</span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={clear}
          className="text-xs text-gray-500 border border-gray-700 rounded-full px-3 py-1 hover:border-gray-500 hover:text-gray-300 transition-colors"
          style={{ background: "#111" }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
