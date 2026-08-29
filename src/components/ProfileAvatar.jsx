import { useState } from 'react'

export default function ProfileAvatar({ src = '/profile.jpg', alt = 'Kunal Tyagi', className = '' }) {
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-3xl font-extrabold text-slate-950 ${className}`}
      >
        KT
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={`rounded-full object-cover ring-2 ring-indigo-500/40 shadow-[0_0_40px_-5px_rgba(99,102,241,0.5)] ${className}`}
    />
  )
}
