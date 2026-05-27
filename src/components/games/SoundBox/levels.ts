export interface Level {
  label: string;
  desc: string;
  soundPool: number[];
  wrongChoices: (correct: string) => string[];
  toPass: number;
}

export const LEVELS: Level[] = [
  {
    label: "Level 1",
    desc: "What sound is this?",
    soundPool: [0, 1, 2, 3, 4],   // Rain, Typing, Wind Chimes, Birds, Cat Purring
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Rain":        ["Typing",      "Wind Chimes", "Cat Purring"],
        "Typing":      ["Wind Chimes", "Birds",       "Rain"],
        "Wind Chimes": ["Cat Purring", "Typing",      "Birds"],
        "Birds":       ["Typing",      "Wind Chimes", "Rain"],
        "Cat Purring": ["Wind Chimes", "Typing",      "Birds"],
      };
      return map[correct] ?? ["Typing", "Wind Chimes", "Birds"];
    },
    toPass: 3,
  },
  {
    label: "Level 2",
    desc: "Getting trickier — listen carefully.",
    soundPool: [0, 1, 2, 3, 4, 5, 6, 7],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Rain":          ["Ocean Waves",  "River Stream", "Campfire"],
        "Typing":        ["Campfire",     "Rain",         "Birds"],
        "Wind Chimes":   ["Birds",        "Cat Purring",  "Ocean Waves"],
        "Birds":         ["Wind Chimes",  "Cat Purring",  "Buzzing Bees"],
        "Cat Purring":   ["Ocean Waves",  "Buzzing Bees", "River Stream"],
        "Ocean Waves":   ["Rain",         "River Stream", "Campfire"],
        "Campfire":      ["Rain",         "River Stream", "Ocean Waves"],
        "River Stream":  ["Rain",         "Ocean Waves",  "Campfire"],
      };
      return map[correct] ?? ["Ocean Waves", "Rain", "Campfire"];
    },
    toPass: 3,
  },
  {
    label: "Level 3",
    desc: "The hardest level — these sound very similar!",
    soundPool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "Rain":            ["River Stream",   "Ocean Waves",  "Rustling Leaves"],
        "Typing":          ["Campfire",        "Rain",         "River Stream"],
        "Wind Chimes":     ["Birds",           "Buzzing Bees", "Cat Purring"],
        "Birds":           ["Wind Chimes",     "Buzzing Bees", "Rustling Leaves"],
        "Cat Purring":     ["Buzzing Bees",    "River Stream", "Ocean Waves"],
        "Ocean Waves":     ["River Stream",    "Rain",         "Rustling Leaves"],
        "Campfire":        ["Rain",            "River Stream", "Rustling Leaves"],
        "River Stream":    ["Rain",            "Ocean Waves",  "Rustling Leaves"],
        "Rustling Leaves": ["Ocean Waves",     "Rain",         "River Stream"],
        "Buzzing Bees":    ["Cat Purring",     "Rustling Leaves", "River Stream"],
      };
      return map[correct] ?? ["Ocean Waves", "Rain", "River Stream"];
    },
    toPass: 3,
  },
];
