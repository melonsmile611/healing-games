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
  { name: "Rain",          icon: "🌧️", make: makeRain       },
  { name: "Typing",        icon: "⌨️", make: makeTyping     },
  { name: "Wind Chimes",   icon: "🎐", make: makeWindChimes  },
  { name: "Birds",         icon: "🐦", make: makeBirds      },
  { name: "Cat Purring",   icon: "😺", make: makePurr       },
  { name: "Ocean Waves",   icon: "🌊", make: makeOcean      },
  { name: "Campfire",      icon: "🔥", make: makeFireplace  },
  { name: "River Stream",  icon: "💧", make: makeStream     },
  { name: "Rustling Leaves", icon: "🌿", make: makeWind    },
  { name: "Buzzing Bees",  icon: "🐝", make: makeBees       },
];
