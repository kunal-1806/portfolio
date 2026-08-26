import { Code2 } from 'lucide-react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#resume', label: 'Resume' },
  { href: '#education', label: 'Education' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Code2 size={18} />
          </span>
          Kunal&nbsp;<span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">Tyagi</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-slate-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#resume"
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 md:hidden"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
