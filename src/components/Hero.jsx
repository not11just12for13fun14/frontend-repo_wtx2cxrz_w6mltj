import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white pointer-events-none" />

      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-sky-400/30 to-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-400/20 to-fuchsia-500/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live now — Forex rebates made simple
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Turn your trading volume into recurring income
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              PAYLOT converts every lot you trade into cash-back. Plug in your broker, trade as usual, and get paid automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#estimator" className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 font-semibold hover:bg-gray-900 transition-colors">
                Estimate your rebates
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-white text-black px-5 py-3 font-semibold border border-black/10 hover:bg-black/5 transition-colors">
                Get started free
              </a>
            </div>
            <div className="text-xs text-gray-500">No fees. No lock-ins. Supports major MT4/MT5 brokers.</div>
          </div>

          <div className="relative h-[420px] md:h-[560px] rounded-2xl overflow-hidden shadow-[0_10px_60px_-15px_rgba(0,0,0,0.2)] bg-white/30 backdrop-blur">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
