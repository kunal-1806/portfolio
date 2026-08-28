import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function useTypewriter(text, { speed = 70, delay = 300 } = {}) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setLength(text.length))
      return () => cancelAnimationFrame(id)
    }
    let interval
    const timeout = setTimeout(
      () => {
        interval = setInterval(() => {
          setLength((prev) => {
            if (prev >= text.length) {
              clearInterval(interval)
              return prev
            }
            return prev + 1
          })
        }, speed)
      },
      delay,
    )
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, delay])

  return { text: text.slice(0, length), done: length >= text.length }
}
