"use client";

import { useState } from "react";
import { GAMES, type GameId } from "@/lib/games";
import dynamic from "next/dynamic";

const GameComponents: Record<GameId, React.ComponentType> = {
  sound:     dynamic(() => import("@/components/games/SoundBox"),     { ssr: false }),
  breathing: dynamic(() => import("@/components/games/BreathingGame"),{ ssr: false }),
  bubbles:   dynamic(() => import("@/components/games/BubbleGame"),   { ssr: false }),
  leaves:    dynamic(() => import("@/components/games/LeafGame"),     { ssr: false }),
};

const ICONS: Record<GameId, React.ReactNode> = {
  sound: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="21" width="28" height="17" rx="3" stroke="currentColor" strokeWidth="2.2"/>
      <rect x="6" y="14" width="32" height="9" rx="2" stroke="currentColor" strokeWidth="2.2"/>
      <line x1="22" y1="14" x2="22" y2="38" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M22 14C19 11 15 10 13 12.5C11 15 13.5 16.5 22 14Z" fill="currentColor" opacity="0.75"/>
      <path d="M22 14C25 11 29 10 31 12.5C33 15 30.5 16.5 22 14Z" fill="currentColor" opacity="0.75"/>
    </svg>
  ),
  breathing: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="4" fill="currentColor"/>
      <circle cx="22" cy="22" r="9"  stroke="currentColor" strokeWidth="2"   opacity="0.65"/>
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  ),
  bubbles: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="28" r="9"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="29" cy="24" r="6"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="22" cy="13" r="4"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" opacity="0.45"/>
      <circle cx="27" cy="20" r="1.2" fill="currentColor" opacity="0.45"/>
    </svg>
  ),
  leaves: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 37C22 37 7 27 7 15C7 9 13 7 22 7C31 7 37 9 37 15C37 27 22 37 22 37Z"
        stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12"/>
      <line x1="22" y1="37" x2="22" y2="13" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="22" y1="22" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="22" y1="28" x2="29" y2="23" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

export default function GameGrid() {
  const [active, setActive] = useState<GameId | null>(null);

  const open = (id: GameId) => setActive(id);
  const close = () => setActive(null);

  const activeGame = active ? GAMES.find(g => g.id === active) : null;
  const ActiveComponent = active ? GameComponents[active] : null;

  return (
    <>
      {/* game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {GAMES.map(g => (
          <button
            key={g.id}
            onClick={() => open(g.id)}
            className={`
              text-left p-6 rounded-3xl border-2 transition-all duration-300 group
              ${active === g.id
                ? `${g.accentClass} bg-white shadow-lg`
                : `border-border bg-white hover:border-mint-300 hover:shadow-md hover:-translate-y-0.5`}
            `}
          >
            <div className={`mb-4 ${active === g.id ? "" : "text-mint-500"}`} style={{ width: 44, height: 44 }}>
              {ICONS[g.id]}
            </div>
            <h3 className="font-bold text-charcoal text-lg leading-tight">{g.title}</h3>
            <p className="text-muted text-sm mt-1 mb-4 leading-relaxed">{g.desc}</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-mint-50 text-mint-600 border border-mint-200">
              {g.tag}
            </span>
          </button>
        ))}
      </div>

      {/* modal overlay */}
      {active && activeGame && ActiveComponent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(42,61,53,0.35)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="bg-cream rounded-3xl w-full max-w-lg shadow-2xl border border-border overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="text-mint-500" style={{ width: 32, height: 32 }}>
                  {ICONS[activeGame.id]}
                </div>
                <h2 className="font-bold text-charcoal text-lg leading-tight">{activeGame.title}</h2>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full border border-border text-muted flex items-center justify-center hover:bg-mint-50 hover:text-charcoal transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* game content */}
            <div className="p-6">
              <ActiveComponent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
