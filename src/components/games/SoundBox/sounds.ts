import {
  makeRain, makeOcean, makeFireplace, makeStream, makeWind,
  makeBirds, makePurr, makeTyping, makeWindChimes, makeBees,
  type AudioNodes,
} from "@/lib/audio";

export interface Sound {
  name: string;
  icon: string;
  make: (ctx: AudioContext) => AudioNodes;
}

export const SOUNDS: Sound[] = [
  { name: "下雨声",   icon: "🌧️", make: makeRain       },
  { name: "打字声",   icon: "⌨️", make: makeTyping     },
  { name: "风铃声",   icon: "🎐", make: makeWindChimes  },
  { name: "鸟叫声",   icon: "🐦", make: makeBirds      },
  { name: "猫咪呼噜", icon: "😺", make: makePurr       },
  { name: "海浪声",   icon: "🌊", make: makeOcean      },
  { name: "篝火声",   icon: "🔥", make: makeFireplace  },
  { name: "河流声",   icon: "💧", make: makeStream     },
  { name: "风吹树叶", icon: "🌿", make: makeWind       },
  { name: "蜜蜂嗡嗡", icon: "🐝", make: makeBees       },
];
