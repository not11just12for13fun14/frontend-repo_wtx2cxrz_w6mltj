import { useEffect, useState } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <label className={`ui-switch ${className}`} aria-label="Toggle theme">
      <input
        type="checkbox"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
        aria-checked={isDark}
      />
      <div className="slider">
        <div className="circle" />
      </div>
    </label>
  )
}
