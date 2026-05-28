"use client";

import { useState, useRef, useCallback } from "react";
import { stopAll, type AudioNodes } from "@/lib/audio";
import { SOUNDS } from "./sounds";
import { LEVELS } from "./levels";
import MysteryBox from "./MysteryBox";
import LevelComplete from "./LevelComplete";
import ProgressPips from "./ProgressPips";

type Phase = "playing" | "levelComplete" | "champion";

export default function SoundBox() {
  const [levelIdx,       setLevelIdx]       = useState(0);
  const [correctInLevel, setCorrectInLevel] = useState(0);
  const [phase,          setPhase]          = useState<Phase>("playing");
  const [soundIdx,       setSoundIdx]       = useState(-1);
  const [choices,        setChoices]        = useState<string[]>([]);
  const [usedInLevel,    setUsedInLevel]    = useState<number[]>([]);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [answered,       setAnswered]       = useState(false);
  const [chosenAnswer,   setChosenAnswer]   = useState<string | null>(null);
  const [isCorrect,      setIsCorrect]      = useState(false);
  const [totalScore,     setTotalScore]     = useState(0);

  const ctxRef   = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNodes>([]);

  const stopSound = useCallback(() => {
    stopAll(nodesRef.current); nodesRef.current = []; setIsPlaying(false);
  }, []);

  const pickSound = useCallback((lIdx: number, alreadyUsed: number[]) => {
    stopSound();
    setAnswered(false); setChosenAnswer(null); setIsCorrect(false);

    const level     = LEVELS[lIdx];
    const available = level.soundPool.filter(i => !alreadyUsed.includes(i));
    const pool      = available.length ? available : level.soundPool;
    if (!available.length) setUsedInLevel([]);

    const pick  = pool[Math.floor(Math.random() * pool.length)];
    setUsedInLevel(prev => [...prev, pick]);
    setSoundIdx(pick);

    const snd    = SOUNDS[pick];
    const wrongs = level.wrongChoices(snd.name);
    setChoices([snd.name, ...wrongs].sort(() => Math.random() - 0.5));
  }, [stopSound]);

  const play = useCallback(() => {
    if (soundIdx < 0 || answered) return;
    stopSound();
    if (!ctxRef.current || ctxRef.current.state === "closed")
      ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    nodesRef.current = SOUNDS[soundIdx].make(ctxRef.current);
    setIsPlaying(true);
  }, [soundIdx, answered, stopSound]);

  const checkAnswer = useCallback((choice: string) => {
    if (answered || soundIdx < 0) return;
    stopSound();
    setAnswered(true);
    setChosenAnswer(choice);
    const ok = choice === SOUNDS[soundIdx].name;
    setIsCorrect(ok);

    if (ok) {
      const next = correctInLevel + 1;
      setCorrectInLevel(next);
      setTotalScore(s => s + 1);
      if (next >= LEVELS[levelIdx].toPass) {
        setTimeout(() => {
          setPhase(levelIdx + 1 >= LEVELS.length ? "champion" : "levelComplete");
        }, 1100);
      }
    }
  }, [answered, soundIdx, correctInLevel, levelIdx, stopSound]);

  const nextLevel = useCallback(() => {
    const next = (levelIdx + 1) % LEVELS.length;
    setLevelIdx(next); setCorrectInLevel(0);
    setUsedInLevel([]); setPhase("playing");
    pickSound(next, []);
  }, [levelIdx, pickSound]);

  const restart = useCallback(() => {
    setLevelIdx(0); setCorrectInLevel(0);
    setUsedInLevel([]); setTotalScore(0); setPhase("playing");
    pickSound(0, []);
  }, [pickSound]);

  /* ── start screen ── */
  if (soundIdx === -1) {
    return (
      <div className="flex flex-col items-center gap-7 py-4">
        <MysteryBox playing={false} answered={false} correct={false} revealIcon="" onClick={() => {}} />
        <p className="text-muted text-sm text-center max-w-xs leading-relaxed">
          Listen to a mystery sound and guess what it is.<br />Get 3 right to pass each level. Three levels total.
        </p>
        <button
          onClick={() => pickSound(0, [])}
          className="px-9 py-3 rounded-full bg-mint-400 text-white font-bold text-lg hover:bg-mint-500 transition-colors shadow-lg"
        >
          Start Playing 🎧
        </button>
      </div>
    );
  }

  if (phase === "levelComplete") {
    return <LevelComplete levelIdx={levelIdx} onNext={nextLevel} isChampion={false} />;
  }
  if (phase === "champion") {
    return <LevelComplete levelIdx={levelIdx} onNext={restart} isChampion />;
  }

  const level = LEVELS[levelIdx];
  const snd   = SOUNDS[soundIdx];

  return (
    <div className="flex flex-col items-center gap-4">

      {/* header */}
      <div className="flex items-center justify-between w-full max-w-xs">
        <span className="text-xs font-bold text-mint-700 px-3 py-1 rounded-full bg-mint-50 border border-mint-200">
          {level.label}
        </span>
        <ProgressPips correct={correctInLevel} toPass={level.toPass} />
        <span className="text-xs text-muted">Score {totalScore}</span>
      </div>

      <p className="text-xs text-muted italic">{level.desc}</p>

      <MysteryBox
        playing={isPlaying} answered={answered}
        correct={isCorrect} revealIcon={answered ? snd.icon : ""}
        onClick={play}
      />

      {/* wave bars */}
      {isPlaying && !answered && (
        <div className="flex items-end gap-1" style={{ height: 26 }}>
          {[0, 0.12, 0.06, 0.18, 0.03].map((d, i) => (
            <div key={i} className="w-1.5 rounded-full bg-mint-400"
              style={{ animation:`waveBar 0.72s ${d}s ease-in-out infinite alternate`, height:4 }} />
          ))}
        </div>
      )}

      {/* result text */}
      <div className="h-7 flex items-center justify-center">
        {answered && (
          <p className={`text-sm font-bold ${isCorrect ? "text-mint-600" : "text-blush"}`}>
            {isCorrect ? `✨ Correct! It's ${snd.name}` : `It's ${snd.icon} ${snd.name}`}
          </p>
        )}
      </div>

      {/* choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {choices.map(c => {
          const isRight  = c === snd.name;
          const isChosen = c === chosenAnswer;
          let cls = "py-3 px-3 rounded-2xl border-2 text-sm font-semibold text-center transition-all duration-200 ";
          if (!answered)     cls += "border-border bg-white text-charcoal hover:border-mint-400 hover:bg-mint-50 hover:scale-[1.02] cursor-pointer active:scale-95";
          else if (isRight)  cls += "border-mint-400 bg-mint-100 text-mint-700";
          else if (isChosen) cls += "border-blush bg-red-50 text-blush";
          else               cls += "border-border bg-white text-muted opacity-35";
          return (
            <button key={c} className={cls} disabled={answered} onClick={() => checkAnswer(c)}>
              {c}
            </button>
          );
        })}
      </div>

      {/* next / try again button */}
      {answered && isCorrect && correctInLevel < level.toPass && (
        <button
          onClick={() => pickSound(levelIdx, usedInLevel)}
          className="mt-1 px-6 py-2 rounded-full bg-mint-400 text-white font-bold text-sm hover:bg-mint-500 transition-colors shadow"
        >
          Next →
        </button>
      )}
      {answered && !isCorrect && (
        <button
          onClick={() => pickSound(levelIdx, usedInLevel)}
          className="mt-1 px-6 py-2 rounded-full bg-mint-400 text-white font-bold text-sm hover:bg-mint-500 transition-colors shadow"
        >
          Try another →
        </button>
      )}
    </div>
  );
}
