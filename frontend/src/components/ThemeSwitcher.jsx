import { useEffect, useRef, useState } from 'react'

const themes = [
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'dark', label: 'Dark', icon: '◐' },
  { value: 'system', label: 'System', icon: '⚙' },
]

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem('projectflow-theme') || 'system')
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches)
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
      localStorage.setItem('projectflow-theme', theme)
    }

    applyTheme()
    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [theme])

  useEffect(() => {
    const closeMenu = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeMenu)
    return () => document.removeEventListener('pointerdown', closeMenu)
  }, [])

  const selected = themes.find((item) => item.value === theme) || themes[0]

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        className="theme-trigger"
        type="button"
        aria-label={`Theme: ${selected.label}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{selected.icon}</span>
        <span className="theme-trigger-label">{selected.label}</span>
      </button>

      {open && (
        <div className="theme-menu" role="menu">
          <div className="theme-menu-title">Appearance</div>
          {themes.map((item) => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              className={theme === item.value ? 'active' : ''}
              onClick={() => {
                setTheme(item.value)
                setOpen(false)
              }}
            >
              <span className="theme-option-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {theme === item.value && <span className="theme-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
