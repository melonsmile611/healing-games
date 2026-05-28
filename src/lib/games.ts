export type GameId = "sound" | "breathing" | "glyph" | "leaves";

export interface GameMeta {
  id: GameId;
  icon: string;
  title: string;
  titleZh: string;
  desc: string;
  tag: string;
  accentClass: string;    // tailwind border/text accent
  bgClass: string;        // tailwind card bg tint
}

export const GAMES: GameMeta[] = [
  {
    id: "sound",
    icon: "🎧",
    title: "Sound Mystery Box",
    titleZh: "听声音盲盒",
    desc: "Play a mystery sound — rain, fire, ocean, birds — and guess what it is. Each sound is a tiny surprise.",
    tag: "ASMR · Guess",
    accentClass: "border-mint-400 text-mint-600",
    bgClass: "bg-mint-50",
  },
  {
    id: "breathing",
    icon: "🌬️",
    title: "Breathing Exercise",
    titleZh: "呼吸练习",
    desc: "Follow the expanding circle. Breathe in, hold, breathe out. Let your body soften, one breath at a time.",
    tag: "4-7-8 Breath",
    accentClass: "border-lavender text-lavender",
    bgClass: "bg-lav-light",
  },
  {
    id: "glyph",
    icon: "💡",
    title: "Glyph Canvas",
    titleZh: "光点画布",
    desc: "Click or drag to light up glowing dots on a dark grid. Draw anything — a pattern, a face, a feeling.",
    tag: "Draw · Glow",
    accentClass: "border-violet-300 text-violet-500",
    bgClass: "bg-gray-950",
  },
  {
    id: "leaves",
    icon: "🍃",
    title: "Catch the Leaves",
    titleZh: "接落叶",
    desc: "Move your cursor to catch leaves as they drift down. Slow, gentle, no pressure.",
    tag: "Mouse · Calm",
    accentClass: "border-amber text-amber",
    bgClass: "bg-warm",
  },
];
