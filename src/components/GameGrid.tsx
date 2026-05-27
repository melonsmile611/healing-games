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
            <span className="text-4xl block mb-3">{g.icon}</span>
            <h3 className="font-bold text-charcoal text-lg leading-tight">{g.titleZh}</h3>
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
                <span className="text-3xl">{activeGame.icon}</span>
                <div>
                  <h2 className="font-bold text-charcoal text-lg leading-tight">{activeGame.titleZh}</h2>
                  <p className="text-muted text-xs">{activeGame.title}</p>
                </div>
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
