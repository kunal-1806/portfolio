import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const clamped = Math.min(Math.max(pct, 0), 100)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      <div className="relative h-[3px] w-full bg-slate-800/40">
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${clamped}%` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 opacity-60 blur-[6px]" />
          <div className="animate-shimmer absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.95),0_0_20px_rgba(99,102,241,0.6)]"
          style={{ left: `calc(${clamped}% - 5px)` }}
        />
      </div>
    </div>
  )
}
