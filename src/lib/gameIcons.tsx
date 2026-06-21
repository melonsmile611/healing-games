import type { GameId } from "./games";

export const ICONS: Record<GameId, React.ReactNode> = {
  sound: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28 C8 10 36 10 36 28" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <rect x="3"  y="26" width="11" height="14" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="30" y="26" width="11" height="14" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  breathing: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="4" fill="currentColor"/>
      <circle cx="22" cy="22" r="9"  stroke="currentColor" strokeWidth="2"   opacity="0.65"/>
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  ),
  glyph: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* dim unlit dots */}
      <circle cx="10" cy="10" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="22" cy="10" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="34" cy="10" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="10" cy="22" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="34" cy="22" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="10" cy="34" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="22" cy="34" r="2.2" fill="currentColor" opacity="0.2"/>
      <circle cx="34" cy="34" r="2.2" fill="currentColor" opacity="0.2"/>
      {/* bright lit dots forming an L-shape */}
      <circle cx="22" cy="22" r="3.5" fill="currentColor"/>
      <circle cx="22" cy="22" r="6"   fill="currentColor" opacity="0.18"/>
    </svg>
  ),
  leaves: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 37C22 37 7 27 7 15C7 9 13 7 22 7C31 7 37 9 37 15C37 27 22 37 22 37Z"
        stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.12"/>
      <line x1="22" y1="37" x2="22" y2="13" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="22" y1="22" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="22" y1="28" x2="29" y2="23" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  zoo: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* paw pad */}
      <ellipse cx="22" cy="28" rx="9" ry="7" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2"/>
      {/* toes */}
      <circle cx="13" cy="19" r="3.2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="19" cy="15" r="3.2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="25" cy="15" r="3.2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="31" cy="19" r="3.2" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  giiker: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* four colour pegs */}
      <circle cx="11" cy="22" r="5" fill="currentColor" fillOpacity="0.85"/>
      <circle cx="22" cy="22" r="5" fill="currentColor" fillOpacity="0.45"/>
      <circle cx="33" cy="22" r="5" fill="currentColor" fillOpacity="0.85"/>
      <circle cx="22" cy="11" r="5" fill="currentColor" fillOpacity="0.45"/>
      {/* hint dot — correct position */}
      <circle cx="22" cy="34" r="3" fill="currentColor"/>
      <circle cx="31" cy="34" r="3" fill="currentColor" fillOpacity="0.35"/>
    </svg>
  ),
};

export const ICON_LIST: GameId[] = ["sound", "breathing", "glyph", "leaves", "zoo", "giiker"];
