import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', broker: '', expected_monthly_volume: '', message: '', consent: true })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = { ...form, expected_monthly_volume: form.expected_monthly_volume ? parseFloat(form.expected_monthly_volume) : null }
      const res = await fetch(`${baseUrl}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Submission failed')
      setStatus('success')
      setForm({ name: '', email: '', broker: '', expected_monthly_volume: '', message: '', consent: true })
    } catch (err) {
      setStatus({ error: err.message })
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Ready to turn lots into income?</h2>
            <p className="text-gray-600 mt-3 max-w-xl">Tell us about your trading and we’ll set up the best rebate plan for you.</p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>• Personalized rates based on your monthly volume</li>
              <li>• Works with major regulated brokers</li>
              <li>• Zero fees, transparent payouts</li>
            </ul>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm grid gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input required name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Jane Trader" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="jane@fxmail.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Broker</label>
                <input name="broker" value={form.broker} onChange={handleChange} className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Your broker name" />
              </div>
              <div>
                <label className="text-sm font-medium">Monthly volume (lots)</label>
                <input name="expected_monthly_volume" value={form.expected_monthly_volume} onChange={handleChange} className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="e.g. 120" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20" placeholder="Anything else we should know?" />
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="rounded border-black/20" />
              I agree to be contacted about PAYLOT.
            </label>
            <button className="inline-flex items-center justify-center rounded-lg bg-black text-white px-5 py-3 font-semibold hover:bg-gray-900 transition-colors">
              {status === 'loading' ? 'Sending...' : 'Request my plan'}
            </button>
            {status?.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status === 'success' && <p className="text-sm text-emerald-600">Thanks! We’ll be in touch shortly.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
