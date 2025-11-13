import { useState } from 'react'

export default function Estimator() {
  const [lots, setLots] = useState(50)
  const [rate, setRate] = useState(5) // $ per lot

  const monthly = lots * rate
  const yearly = monthly * 12

  return (
    <section id="estimator" className="py-20 border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Estimate your monthly rebates</h2>
            <p className="text-gray-600 mt-3 max-w-xl">Move the sliders to see how much you could earn based on your typical volume and our average payout per lot.</p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Monthly trading volume (lots)</label>
                  <span className="text-sm font-semibold">{lots} lots</span>
                </div>
                <input type="range" min="0" max="1000" value={lots} onChange={(e) => setLots(parseInt(e.target.value))} className="w-full accent-black" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Rebate rate ($ per lot)</label>
                  <span className="text-sm font-semibold">${rate}</span>
                </div>
                <input type="range" min="1" max="15" value={rate} onChange={(e) => setRate(parseInt(e.target.value))} className="w-full accent-black" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-6 bg-gradient-to-br from-gray-50 to-white shadow-sm">
            <div className="text-sm text-gray-500">Your estimated earnings</div>
            <div className="mt-2 text-4xl font-black tracking-tight">${monthly.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per month</div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-black/10 p-4 bg-white">
                <div className="text-xs text-gray-500">Monthly</div>
                <div className="text-2xl font-bold">${monthly.toLocaleString()}</div>
              </div>
              <div className="rounded-xl border border-black/10 p-4 bg-white">
                <div className="text-xs text-gray-500">Yearly</div>
                <div className="text-2xl font-bold">${yearly.toLocaleString()}</div>
              </div>
            </div>
            <a href="#contact" className="mt-6 inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 font-semibold hover:bg-gray-900 transition-colors w-full">
              Start earning now
            </a>
            <p className="text-xs text-gray-500 mt-3">Estimates are for illustration. Actual rates vary by broker, pair, and tier.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
