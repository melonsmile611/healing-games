import GameGrid from "@/components/GameGrid";

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
        <section className="py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-100 text-mint-700 text-sm font-semibold mb-6 border border-mint-200">
            ✨ Slow down. Play a little.
          </div>
          <h1 className="font-serif text-6xl text-charcoal leading-tight mb-4">
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
                className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shadow-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {e}
              </span>
            ))}
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
