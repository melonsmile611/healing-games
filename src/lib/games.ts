export type GameId = "sound" | "breathing" | "bubbles" | "leaves";

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
    id: "bubbles",
    icon: "🫧",
    title: "Bubble Popper",
    titleZh: "点泡泡",
    desc: "Floating glowing bubbles drift upward. Tap to pop — each one makes a tiny sound. No score, just peace.",
    tag: "Tap & Release",
    accentClass: "border-mint-300 text-mint-500",
    bgClass: "bg-mint-50",
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
