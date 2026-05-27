import type { GameId } from "./games";

export const ICONS: Record<GameId, React.ReactNode> = {
  sound: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="21" width="28" height="17" rx="3" stroke="currentColor" strokeWidth="2.2"/>
      <rect x="6" y="14" width="32" height="9" rx="2" stroke="currentColor" strokeWidth="2.2"/>
      <line x1="22" y1="14" x2="22" y2="38" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M22 14C19 11 15 10 13 12.5C11 15 13.5 16.5 22 14Z" fill="currentColor" opacity="0.75"/>
      <path d="M22 14C25 11 29 10 31 12.5C33 15 30.5 16.5 22 14Z" fill="currentColor" opacity="0.75"/>
    </svg>
  ),
  breathing: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="4" fill="currentColor"/>
      <circle cx="22" cy="22" r="9"  stroke="currentColor" strokeWidth="2"   opacity="0.65"/>
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  ),
  bubbles: (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="28" r="9"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="29" cy="24" r="6"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="22" cy="13" r="4"  stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="24" r="1.5" fill="currentColor" opacity="0.45"/>
      <circle cx="27" cy="20" r="1.2" fill="currentColor" opacity="0.45"/>
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
};

export const ICON_LIST: GameId[] = ["sound", "breathing", "bubbles", "leaves"];
