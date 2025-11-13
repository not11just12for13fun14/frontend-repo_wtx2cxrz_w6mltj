import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function StatCard({ label, value, suffix, sub }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      <div className="mt-1 text-3xl font-black tracking-tight">
        {value}
        {suffix && <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold ml-1">{suffix}</span>}
      </div>
      {sub && <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

function LineChart({ data, height = 180, color = '#0ea5e9' }) {
  // data: [{ month: 'YYYY-MM', volume: number }]
  const paddingX = 24
  const paddingY = 16
  const width = 12 * 48 // 12 months
  const maxV = Math.max(1, ...data.map(d => d.volume || 0))

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / Math.max(1, data.length - 1)
    const y = height - paddingY - ((d.volume || 0) / maxV) * (height - 2 * paddingY)
    return [x, y]
  })

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')

  const areaPath = `M${paddingX},${height - paddingY} ` +
    points.map((p) => `L${p[0]},${p[1]}`).join(' ') +
    ` L${paddingX + (width - 2 * paddingX)},${height - paddingY} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill="transparent" />
      {/* grid */}
      {[0.25, 0.5, 0.75, 1].map((g, idx) => (
        <line key={idx} x1={paddingX} x2={width - paddingX} y1={paddingY + (height - 2*paddingY) * g} y2={paddingY + (height - 2*paddingY) * g} stroke="#e5e7eb" className="dark:stroke-neutral-800" strokeWidth="1" />
      ))}
      {/* area */}
      <path d={areaPath} fill="url(#grad)" />
      {/* line */}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />
      ))}
      {/* x labels */}
      {data.map((d, i) => {
        const x = paddingX + (i * (width - 2 * paddingX)) / Math.max(1, data.length - 1)
        const label = d.month.slice(2) // 'YY-MM'
        return (
          <text key={d.month} x={x} y={height - 2} textAnchor="middle" className="fill-gray-400 text-[10px]">{label}</text>
        )
      })}
    </svg>
  )
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState({ totals: { total_leads: 0, total_volume: 0, conversion_rate: 0, active_brokers: 0 }, series: [] })
  const [leads, setLeads] = useState([])

  useEffect(() => {
    let ignore = false
    async function fetchAll() {
      try {
        setLoading(true)
        setError('')
        const [sumRes, leadRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard`).then(r => r.json()),
          fetch(`${API_BASE}/api/leads?limit=10`).then(r => r.json())
        ])
        if (!ignore) {
          setSummary(sumRes)
          setLeads(Array.isArray(leadRes) ? leadRes : [])
        }
      } catch (e) {
        if (!ignore) setError('Unable to load dashboard. Ensure the backend is running and CORS is allowed.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchAll()
    return () => { ignore = true }
  }, [])

  const cards = useMemo(() => ([
    { label: 'Total leads', value: summary?.totals?.total_leads?.toLocaleString?.() ?? '0' },
    { label: 'Est. monthly volume', value: `$${(summary?.totals?.total_volume ?? 0).toLocaleString()}` },
    { label: 'Conversion rate', value: summary?.totals?.conversion_rate ?? 0, suffix: '%' },
    { label: 'Active brokers', value: summary?.totals?.active_brokers ?? 0 },
  ]), [summary])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track leads, volume, and performance over time.</p>
          </div>
          <a href="#contact" className="hidden sm:inline-flex items-center rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200">Add lead</a>
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-gray-500">Loading…</div>
        ) : error ? (
          <div className="mt-10 text-sm text-red-600">{error}</div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((c) => (
                <StatCard key={c.label} {...c} />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Est. monthly volume</div>
                    <div className="text-2xl font-bold">${(summary?.totals?.total_volume ?? 0).toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <LineChart data={summary?.series ?? []} />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
                <div className="text-sm text-gray-600 dark:text-gray-400">Breakdown</div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Leads with volume</span>
                    <span className="font-semibold">{(summary?.totals?.conversion_rate ?? 0).toFixed?.(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active brokers</span>
                    <span className="font-semibold">{summary?.totals?.active_brokers ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recent leads</div>
                  <div className="text-lg font-semibold">Last 10 signups</div>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 dark:text-gray-400">
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Broker</th>
                      <th className="py-2 pr-4 font-medium">Volume (lots)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td className="py-4 text-gray-500 dark:text-gray-400" colSpan={4}>No leads yet.</td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id} className="border-t border-black/5 dark:border-white/5">
                          <td className="py-2 pr-4">{l.name}</td>
                          <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">{l.email}</td>
                          <td className="py-2 pr-4">{l.broker || '-'}</td>
                          <td className="py-2 pr-4">{(l.expected_monthly_volume ?? 0).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
