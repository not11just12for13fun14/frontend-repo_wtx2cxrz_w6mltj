export default function HowItWorks() {
  const steps = [
    {
      title: 'Connect broker',
      desc: 'Sign up and link your MT4/MT5 broker account to enable rebates on your trading volume.'
    },
    {
      title: 'Trade normally',
      desc: 'Keep your strategy. We track lots traded in real-time and calculate your cash-back.'
    },
    {
      title: 'Get paid',
      desc: 'Withdraw your rebate earnings monthly via bank transfer, card, or crypto.'
    },
  ]

  return (
    <section id="how" className="py-20 border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">How PAYLOT works</h2>
        <p className="text-gray-600 mt-3 max-w-2xl">Simple setup, automated earnings. Built for traders who value speed and transparency.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm">
              <div className="text-xs font-semibold text-gray-500">Step {i + 1}</div>
              <h3 className="text-xl font-bold mt-2">{s.title}</h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
