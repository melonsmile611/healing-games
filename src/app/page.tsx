import GameGrid from "@/components/GameGrid";

const HERO_BG = "https://pub-9231efe19a5243b79b24e44c1e722520.r2.dev/healing-hut/mid-jouney/Tinaking611_A_soft_anime_aesthetic_illustration_of_the_interi_de59075f-85ce-4fce-aca1-14488eeb72cd_3.png";

const SPARKLES = [
  { top: "10%", left:  "6%", delay: "0s",    size: 5 },
  { top: "22%", left: "82%", delay: "0.8s",  size: 4 },
  { top:  "6%", left: "50%", delay: "1.4s",  size: 6 },
  { top: "38%", left: "10%", delay: "0.3s",  size: 4 },
  { top: "16%", left: "36%", delay: "2.0s",  size: 5 },
  { top: "48%", left: "74%", delay: "1.1s",  size: 4 },
  { top: "28%", left: "93%", delay: "1.7s",  size: 5 },
  { top:  "8%", left: "66%", delay: "2.3s",  size: 6 },
  { top: "14%", left: "22%", delay: "0.5s",  size: 4 },
  { top: "55%", left: "88%", delay: "1.5s",  size: 4 },
  { top: "32%", left: "58%", delay: "0.9s",  size: 3 },
  { top: "44%", left: "30%", delay: "1.2s",  size: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* nav */}
      <nav className="sticky top-0 z-40 bg-cream/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-charcoal tracking-wide">🌿 Healing Corner</span>
          <div className="flex items-center gap-6 text-sm font-semibold text-muted">
            <a href="#games" className="hover:text-mint-600 transition-colors">Games</a>
            <a href="#about" className="hover:text-mint-600 transition-colors">About</a>
            <a href="https://www.somewhere-quiet.com" target="_blank" rel="noopener noreferrer" className="hover:text-mint-600 transition-colors">Tree Hole ↗</a>
            <a
              href="https://www.etsy.com/au/shop/StudioSarahDigital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-mint-400 text-white hover:bg-mint-500 transition-colors shadow-sm"
            >
              Our Shop ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* hero */}
        <section className="relative text-center overflow-hidden rounded-3xl mb-12" style={{ minHeight: 520 }}>

          {/* background image */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            zIndex: 0,
          }} />

          {/* gradient fade to cream at bottom */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(255,251,245,0.08) 0%, rgba(255,251,245,0.55) 55%, rgba(255,251,245,1) 88%)",
            zIndex: 1,
          }} />

          {/* sparkles */}
          {SPARKLES.map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(255,255,255,0.7), 0 0 3px 1px rgba(77,184,156,0.5)`,
              animation: `sparkle ${2.2 + i * 0.15}s ${s.delay} ease-in-out infinite`,
              pointerEvents: "none",
              zIndex: 2,
            }} />
          ))}

          {/* content */}
          <div className="relative flex flex-col items-center pt-16 pb-14 px-6" style={{ zIndex: 3 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 text-mint-700 text-sm font-semibold mb-6 border border-mint-200 backdrop-blur-sm">
              ✨ Slow down. Play a little.
            </div>
            <h1 className="font-cormorant text-7xl text-charcoal leading-tight mb-4 italic" style={{ fontWeight: 300, letterSpacing: "0.01em" }}>
              Healing Corner
            </h1>
            <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
              A little corner with gentle games.<br />
              Listen, breathe, pop, catch.<br />
              No pressure — just a moment to rest.
            </p>
            <div className="flex justify-center gap-3 mt-8 text-3xl">
              {["🎧","🌬️","🫧","🍃"].map((e, i) => (
                <span
                  key={i}
                  className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-sm"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* games */}
        <section id="games" className="mb-24">
          <h2 className="font-serif text-3xl text-charcoal mb-2">Pick a game 🎮</h2>
          <p className="text-muted text-sm mb-8">Tap any one to begin</p>
          <GameGrid />
        </section>

        {/* about */}
        <section id="about" className="border-t border-border pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">

            <div>
              <h2 className="font-serif text-3xl text-charcoal mb-4">About Us 🌸</h2>
              <p className="text-muted leading-relaxed mb-4">
                We live in Tasmania — the southern end of the island, closer to Antarctica than to Sydney.
                There's no grand reason for this place. We just wanted somewhere to not think about anything for a bit.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                More games will come. No rush.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted">
                <span>🌿 Tree Hole · <a href="https://www.somewhere-quiet.com" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">somewhere-quiet.com</a></span>
                <span>🐦 YouTube · <a href="https://youtube.com/@SomeWhereQuiet611" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">@SomeWhereQuiet611</a></span>
                <span>🛒 Gumroad · <a href="https://studioSarahDigital.gumroad.com" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">studioSarahDigital.gumroad.com</a></span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <div className="text-2xl mb-3">🛍️</div>
              <h3 className="font-serif text-xl text-charcoal mb-2">StudioSarahDigital</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Our little Etsy shop for digital products — wellness planners, a DBS recovery handbook,
                kids name stickers, and more on the way. Each one made with care.
              </p>
              <a
                href="https://www.etsy.com/au/shop/StudioSarahDigital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mint-400 text-white font-bold text-sm hover:bg-mint-500 transition-colors shadow-md"
              >
                Visit our shop ↗
              </a>
            </div>

          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted/60 tracking-wide">
        🌱 Take it slow · StudioSarahDigital · Tasmania
      </footer>
    </div>
  );
}
