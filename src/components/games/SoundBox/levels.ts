export interface Level {
  label: string;
  desc: string;
  soundPool: number[];
  wrongChoices: (correct: string) => string[];
  toPass: number;
}

export const LEVELS: Level[] = [
  {
    // Rain, Typing, Wind Chimes, Birds, Cat Purring — very distinct sounds
    label: "Level 1",
    desc: "Five very different sounds. Listen and guess.",
    soundPool: [0, 1, 2, 3, 4],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Rain":        ["Typing",      "Wind Chimes", "Cat Purring"],
        "Typing":      ["Wind Chimes", "Birds",       "Rain"],
        "Wind Chimes": ["Birds",       "Cat Purring", "Typing"],
        "Birds":       ["Wind Chimes", "Rain",        "Typing"],
        "Cat Purring": ["Birds",       "Wind Chimes", "Typing"],
      };
      return map[correct] ?? ["Typing", "Wind Chimes", "Birds"];
    },
    toPass: 3,
  },
  {
    // Ocean Waves, Campfire, River Stream, Rustling Leaves, Buzzing Bees
    // — all NEW sounds, some acoustically similar to each other
    label: "Level 2",
    desc: "Five new sounds — some of them are easy to mix up.",
    soundPool: [5, 6, 7, 8, 9],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Ocean Waves":    ["River Stream",   "Rustling Leaves", "Campfire"],
        "Campfire":       ["River Stream",   "Ocean Waves",     "Buzzing Bees"],
        "River Stream":   ["Ocean Waves",    "Rustling Leaves", "Campfire"],
        "Rustling Leaves":["River Stream",   "Ocean Waves",     "Buzzing Bees"],
        "Buzzing Bees":   ["Campfire",       "Rustling Leaves", "River Stream"],
      };
      return map[correct] ?? ["Ocean Waves", "River Stream", "Campfire"];
    },
    toPass: 3,
  },
  {
    // All 10 sounds — acoustically similar pairs as distractors
    label: "Level 3",
    desc: "All ten sounds mixed together. The tricky pairs are back.",
    soundPool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Rain":            ["River Stream",    "Ocean Waves",     "Rustling Leaves"],
        "Typing":          ["Campfire",        "Rain",            "Birds"],
        "Wind Chimes":     ["Birds",           "Buzzing Bees",    "Cat Purring"],
        "Birds":           ["Wind Chimes",     "Buzzing Bees",    "Rustling Leaves"],
        "Cat Purring":     ["Buzzing Bees",    "River Stream",    "Ocean Waves"],
        "Ocean Waves":     ["River Stream",    "Rain",            "Rustling Leaves"],
        "Campfire":        ["Rain",            "River Stream",    "Typing"],
        "River Stream":    ["Rain",            "Ocean Waves",     "Rustling Leaves"],
        "Rustling Leaves": ["River Stream",    "Ocean Waves",     "Rain"],
        "Buzzing Bees":    ["Cat Purring",     "Wind Chimes",     "Birds"],
      };
      return map[correct] ?? ["Ocean Waves", "Rain", "River Stream"];
    },
    toPass: 3,
  },
];
