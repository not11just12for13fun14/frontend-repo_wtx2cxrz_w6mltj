import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: 'How it works', href: '#how' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 shadow-inner" />
            <span className="text-xl font-black tracking-tight">PAYLOT</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-black transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors">
              Get started
            </a>
          </nav>

          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="block px-2 py-2 rounded-md hover:bg-black/5" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="block text-center rounded-lg bg-black text-white px-4 py-2 hover:bg-gray-900" onClick={() => setOpen(false)}>
                Get started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
