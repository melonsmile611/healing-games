export interface Level {
  label: string;
  desc: string;
  soundPool: number[];
  wrongChoices: (correct: string) => string[];
  toPass: number;
}

export const LEVELS: Level[] = [
  {
    label: "第一关",
    desc: "听听这是什么声音？",
    soundPool: [0, 1, 2, 3, 4],   // rain, typing, chimes, birds, purr
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "下雨声":   ["打字声",  "风铃声",  "猫咪呼噜"],
        "打字声":   ["风铃声",  "鸟叫声",  "下雨声"],
        "风铃声":   ["猫咪呼噜","打字声",  "鸟叫声"],
        "鸟叫声":   ["打字声",  "风铃声",  "下雨声"],
        "猫咪呼噜": ["风铃声",  "打字声",  "鸟叫声"],
      };
      return map[correct] ?? ["打字声", "风铃声", "鸟叫声"];
    },
    toPass: 3,
  },
  {
    label: "第二关",
    desc: "有点难了，仔细听！",
    soundPool: [0, 1, 2, 3, 4, 5, 6, 7],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "下雨声":   ["海浪声",  "河流声",  "篝火声"],
        "打字声":   ["篝火声",  "下雨声",  "鸟叫声"],
        "风铃声":   ["鸟叫声",  "猫咪呼噜","海浪声"],
        "鸟叫声":   ["风铃声",  "猫咪呼噜","蜜蜂嗡嗡"],
        "猫咪呼噜": ["海浪声",  "蜜蜂嗡嗡","河流声"],
        "海浪声":   ["下雨声",  "河流声",  "篝火声"],
        "篝火声":   ["下雨声",  "河流声",  "海浪声"],
        "河流声":   ["下雨声",  "海浪声",  "篝火声"],
      };
      return map[correct] ?? ["海浪声", "下雨声", "篝火声"];
    },
    toPass: 3,
  },
  {
    label: "第三关",
    desc: "最难的来了，声音很像哦！",
    soundPool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    wrongChoices: (correct) => {
      const map: Record<string, string[]> = {
        "下雨声":   ["河流声",  "海浪声",  "风吹树叶"],
        "打字声":   ["篝火声",  "下雨声",  "河流声"],
        "风铃声":   ["鸟叫声",  "蜜蜂嗡嗡","猫咪呼噜"],
        "鸟叫声":   ["风铃声",  "蜜蜂嗡嗡","风吹树叶"],
        "猫咪呼噜": ["蜜蜂嗡嗡","河流声",  "海浪声"],
        "海浪声":   ["河流声",  "下雨声",  "风吹树叶"],
        "篝火声":   ["下雨声",  "河流声",  "风吹树叶"],
        "河流声":   ["下雨声",  "海浪声",  "风吹树叶"],
        "风吹树叶": ["海浪声",  "下雨声",  "河流声"],
        "蜜蜂嗡嗡": ["猫咪呼噜","风吹树叶","河流声"],
      };
      return map[correct] ?? ["海浪声", "下雨声", "河流声"];
    },
    toPass: 3,
  },
];
