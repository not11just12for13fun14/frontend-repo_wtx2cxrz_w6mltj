export default function Benefits() {
  const items = [
    { title: 'High-paying tiers', desc: 'Earn more as you trade more. Competitive rates across major pairs.' },
    { title: 'Instant tracking', desc: 'Live dashboard with real-time lots and estimated payouts.' },
    { title: 'Trusted partners', desc: 'Work with regulated brokers that support MT4/MT5 and cTrader.' },
    { title: 'Fast payouts', desc: 'Monthly withdrawals to your bank, card, or stablecoins.' },
  ]

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Why traders choose PAYLOT</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {items.map((b, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm">
              <h3 className="text-lg font-bold">{b.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
