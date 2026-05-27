"use client";

import { LEVELS } from "./levels";

interface Props {
  levelIdx: number;   // the level just completed (0-based)
  onNext: () => void;
  isChampion: boolean;
}

export default function LevelComplete({ levelIdx, onNext, isChampion }: Props) {
  const nextLabel = LEVELS[levelIdx + 1]?.label;

  return (
    <div className="flex flex-col items-center gap-5 py-6" style={{ animation: "levelBurst 0.5s ease-out forwards" }}>
      <div className="text-5xl" style={{ animation: "starPop 0.45s 0.1s ease-out both" }}>
        {isChampion ? "🏆" : "⭐"}
      </div>
      <h3 className="text-2xl font-bold text-charcoal text-center">
        {isChampion ? "全部通关！" : `${LEVELS[levelIdx].label} 通过！`}
      </h3>
      <p className="text-muted text-sm text-center leading-relaxed max-w-xs">
        {isChampion
          ? "三关全部答对，你的耳朵真的很灵！🌿"
          : `恭喜！耳朵很灵！${nextLabel ? `准备好迎接${nextLabel}了吗？` : ""}`}
      </p>
      <div className="flex gap-1 text-2xl" style={{ animation: "starPop 0.4s 0.25s ease-out both" }}>
        {isChampion ? "🎉✨🎉" : "🎉"}
      </div>
      <button
        onClick={onNext}
        className="px-9 py-3 rounded-full bg-mint-400 text-white font-bold text-base hover:bg-mint-500 transition-colors shadow-lg"
      >
        {isChampion ? "再玩一次 ↩" : `进入${nextLabel} →`}
      </button>
    </div>
  );
}
