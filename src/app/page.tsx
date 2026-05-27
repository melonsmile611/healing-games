import GameGrid from "@/components/GameGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* nav */}
      <nav className="sticky top-0 z-40 bg-cream/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-charcoal tracking-wide">🌿 治愈小屋</span>
          <div className="flex items-center gap-6 text-sm font-semibold text-muted">
            <a href="#games" className="hover:text-mint-600 transition-colors">游戏</a>
            <a href="#about" className="hover:text-mint-600 transition-colors">关于</a>
            <a href="https://www.somewhere-quiet.com" target="_blank" rel="noopener noreferrer" className="hover:text-mint-600 transition-colors">树洞 ↗</a>
            <a
              href="https://www.etsy.com/au/shop/StudioSarahDigital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-mint-400 text-white hover:bg-mint-500 transition-colors shadow-sm"
            >
              我们的小店 ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* hero */}
        <section className="py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-100 text-mint-700 text-sm font-semibold mb-6 border border-mint-200">
            ✨ 慢下来，玩一玩
          </div>
          <h1 className="text-5xl font-bold text-charcoal leading-tight mb-5">
            治愈小屋
            <span className="block text-2xl font-normal text-muted mt-2 tracking-wide">
              Healing Corner
            </span>
          </h1>
          <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
            一个小小的角落，装着几个轻轻的游戏。<br />
            听声音、深呼吸、点泡泡、接落叶。<br />
            没有压力，只是放松。
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
          <h2 className="text-2xl font-bold text-charcoal mb-2">选一个游戏 🎮</h2>
          <p className="text-muted text-sm mb-8">点击任意一个，就可以开始了</p>
          <GameGrid />
        </section>

        {/* about */}
        <section id="about" className="border-t border-border pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">

            <div>
              <h2 className="text-2xl font-bold text-charcoal mb-4">关于我们 🌸</h2>
              <p className="text-muted leading-relaxed mb-4">
                We live in Tasmania — the southern end of the island, closer to Antarctica than to Sydney.
                There's no grand reason for this place. We just wanted somewhere to not think about anything for a bit.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                More games will come. No rush.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted">
                <span>🌿 树洞 · <a href="https://www.somewhere-quiet.com" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">somewhere-quiet.com</a></span>
                <span>🐦 YouTube · <a href="https://youtube.com/@SomeWhereQuiet611" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">@SomeWhereQuiet611</a></span>
                <span>✍️ 博客 · <a href="https://bloomlikecrocus.com" target="_blank" rel="noopener noreferrer" className="text-mint-600 hover:underline">bloomlikecrocus.com</a></span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
              <div className="text-2xl mb-3">🛍️</div>
              <h3 className="font-bold text-charcoal text-lg mb-2">StudioSarahDigital</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                我们在 Etsy 开了一家数字产品小店。有健康规划册、DBS 术后康复手册、
                儿童贴纸，还有更多在路上。每一件都是用心做的。
              </p>
              <a
                href="https://www.etsy.com/au/shop/StudioSarahDigital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mint-400 text-white font-bold text-sm hover:bg-mint-500 transition-colors shadow-md"
              >
                逛逛我们的小店 ↗
              </a>
            </div>

          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted/60 tracking-wide">
        🌱 慢慢来，总会好的 · StudioSarahDigital · Tasmania
      </footer>
    </div>
  );
}
