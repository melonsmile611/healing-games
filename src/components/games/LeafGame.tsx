"use client";

import { useEffect, useRef, useState } from "react";

const EMOJIS = ["🍃", "🍂", "🍁", "🌿", "🌾"];

interface Leaf {
  x: number; y: number; speed: number;
  angle: number; spin: number; drift: number;
  emoji: string; size: number; sway: number;
}

function chime(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 660 + Math.random() * 330;
  g.gain.value = 0.06;
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.41);
}

export default function LeafGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const leavesRef = useRef<Leaf[]>([]);
  const catcherXRef = useRef(200);
  const frameRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);

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
    catcherXRef.current = W / 2;

    const CATCH_W = 90, CATCH_H = 14, CATCH_Y = H - 28;

    function spawn() {
      leavesRef.current.push({
        x: 20 + Math.random() * (W - 40),
        y: -24,
        speed: 0.7 + Math.random() * 0.9,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.035,
        drift: (Math.random() - 0.5) * 0.6,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        size: 20 + Math.random() * 12,
        sway: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 4; i++) { spawn(); leavesRef.current[i].y = Math.random() * H * 0.7; }

    function draw() {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frameRef.current++;
      if (frameRef.current % 80 === 0 && leavesRef.current.length < 10) spawn();

      // catcher glow
      const cx = catcherXRef.current;
      const grd = ctx.createRadialGradient(cx, CATCH_Y, 0, cx, CATCH_Y, CATCH_W / 2);
      grd.addColorStop(0, "rgba(77,184,156,0.55)");
      grd.addColorStop(0.5, "rgba(77,184,156,0.25)");
      grd.addColorStop(1, "rgba(77,184,156,0)");
      ctx.beginPath();
      ctx.ellipse(cx, CATCH_Y, CATCH_W / 2, CATCH_H / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      const toRemove: number[] = [];
      leavesRef.current.forEach((l, i) => {
        l.y += l.speed;
        l.sway += 0.018;
        l.x += l.drift + Math.sin(l.sway) * 0.5;
        l.angle += l.spin;

        if (l.x < l.size) { l.x = l.size; l.drift *= -1; }
        if (l.x > W - l.size) { l.x = W - l.size; l.drift *= -1; }

        // catch detection
        if (l.y > CATCH_Y - CATCH_H && l.y < CATCH_Y + CATCH_H / 2
          && Math.abs(l.x - catcherXRef.current) < CATCH_W / 2) {
          toRemove.push(i);
          setCaught(c => c + 1);
          if (!audioRef.current) audioRef.current = new AudioContext();
          if (audioRef.current.state === "suspended") audioRef.current.resume();
          chime(audioRef.current);
          return;
        }

        if (l.y > H + 30) {
          toRemove.push(i);
          setMissed(m => m + 1);
          return;
        }

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.font = `${l.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.9;
        ctx.fillText(l.emoji, 0, 0);
        ctx.restore();
      });

      leavesRef.current = leavesRef.current.filter((_, i) => !toRemove.includes(i));
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    catcherXRef.current = e.clientX - rect.left;
  }
  function handleTouchMove(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const rect = canvasRef.current!.getBoundingClientRect();
    catcherXRef.current = e.touches[0].clientX - rect.left;
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="w-full rounded-2xl"
        style={{
          height: "360px",
          background: "linear-gradient(180deg, #f7fcfa 0%, #edf8f3 60%, #daf2ea 100%)",
          cursor: "none",
        }}
      />
      <p className="text-center text-sm font-semibold text-charcoal/70">
        Caught <span className="text-mint-600 font-bold">{caught}</span> ·
        Missed <span className="text-blush font-bold">{missed}</span> 🍃
      </p>
    </div>
  );
}
