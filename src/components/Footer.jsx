import { Code2 } from 'lucide-react'
import { PROFILE } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-sm text-slate-500 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Code2 size={14} />
          </span>
          {PROFILE.name}
        </a>
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React &amp; Tailwind CSS
        </p>
        <a href={`mailto:${PROFILE.email}`} className="transition hover:text-indigo-300">
          {PROFILE.email}
        </a>
      </div>
    </footer>
  )
}
