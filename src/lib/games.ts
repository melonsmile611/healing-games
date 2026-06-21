export type GameId = "sound" | "breathing" | "glyph" | "leaves" | "zoo" | "giiker";

export interface GameMeta {
  id: GameId;
  icon: string;
  title: string;
  titleZh: string;
  desc: string;
  tag: string;
  accentClass: string;    // tailwind border/text accent
  bgClass: string;        // tailwind card bg tint
  href?: string;
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
  {
    id: "zoo",
    icon: "🎪",
    title: "Joyful Zoo",
    titleZh: "欢乐动物园",
    desc: "Practice vowel sounds with zoo animals. Tap each animal and follow along — gentle voice warm-ups, one creature at a time.",
    tag: "Voice · Warm-up",
    accentClass: "border-purple-300 text-purple-500",
    bgClass: "bg-purple-50",
    href: "/voice_training_zoo-English.html",
  },
  {
    id: "giiker",
    icon: "🔐",
    title: "GiiKER Code Breaker",
    titleZh: "代码机",
    desc: "Crack the secret colour code in as few guesses as you can. A digital take on the classic Mastermind puzzle.",
    tag: "Logic · Puzzle",
    accentClass: "border-rose-300 text-rose-500",
    bgClass: "bg-rose-50",
    href: "/giiker/index.html",
  },
];
