"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  x: number; y: number; r: number;
  speed: number; drift: number;
  color: string; opacity: number;
  wobble: number;
}

const COLORS = ["#4db89c","#7ecfb8","#c4b5d4","#e8c87a","#e8b4b4","#74b9ff","#b2e4d4"];

function popBloop(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.frequency.value = 500 + Math.random() * 500;
  osc.frequency.exponentialRampToValueAtTime(osc.frequency.value * 0.5, ctx.currentTime + 0.08);
  g.gain.value = 0.1;
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.11);
}

export default function BubbleGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const frameRef = useRef(0);
  const [popped, setPopped] = useState(0);

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

    function spawn() {
      const r = 16 + Math.random() * 30;
      bubblesRef.current.push({
        x: r + Math.random() * (W - r * 2),
        y: H + r,
        r,
        speed: 0.3 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.4 + Math.random() * 0.45,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 10; i++) { spawn(); bubblesRef.current[i].y = Math.random() * H; }

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frameRef.current++;
      if (frameRef.current % 70 === 0 && bubblesRef.current.length < 18) spawn();

      bubblesRef.current.forEach(b => {
        b.y -= b.speed;
        b.wobble += 0.02;
        b.x += b.drift + Math.sin(b.wobble) * 0.3;
        if (b.x < b.r) b.x = b.r;
        if (b.x > W - b.r) b.x = W - b.r;

        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // inner gradient
        const grad = ctx.createRadialGradient(
          b.x - b.r * 0.35, b.y - b.r * 0.35, 0,
          b.x, b.y, b.r
        );
        grad.addColorStop(0, "rgba(255,255,255,0.35)");
        grad.addColorStop(0.5, `${b.color}22`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fill();

        // shine dot
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();

        ctx.restore();
      });

      bubblesRef.current = bubblesRef.current.filter(b => b.y + b.r > 0);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const idx = bubblesRef.current.findLastIndex(b => Math.hypot(x - b.x, y - b.y) < b.r);
    if (idx !== -1) {
      bubblesRef.current.splice(idx, 1);
      setPopped(p => p + 1);
      if (!audioRef.current) audioRef.current = new AudioContext();
      if (audioRef.current.state === "suspended") audioRef.current.resume();
      popBloop(audioRef.current);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full rounded-2xl cursor-crosshair"
        style={{ height: "360px", background: "linear-gradient(180deg, #f0faf6 0%, #daf2ea 100%)" }}
      />
      <p className="text-center text-mint-600 font-bold">
        戳破了 {popped} 个泡泡 🫧
      </p>
    </div>
  );
}
