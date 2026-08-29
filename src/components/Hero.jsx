import { Mail, Phone, MapPin, Eye, Download } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from './icons'
import { PROFILE, RESUME } from '../data'
import useReveal from '../hooks/useReveal'
import useTypewriter from '../hooks/useTypewriter'

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 transition hover:border-indigo-500/50'

const TERMINAL_USER = 'kunal@dev'

export default function Hero({ onOpenResume }) {
  const ref = useReveal()
  const { text: typedName } = useTypewriter(PROFILE.name)

  return (
    <section
      id="top"
      ref={ref}
      className="reveal mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pt-16 sm:px-6"
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/5 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs text-slate-500">{TERMINAL_USER} — zsh</span>
        </div>

        <div className="p-6 font-mono text-sm leading-relaxed sm:p-8">
          <p className="text-slate-500">
            <span className="text-indigo-400">{TERMINAL_USER}</span>:<span className="text-cyan-300">~</span>${' '}
            whoami
          </p>
          <h1
            className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
            aria-label={PROFILE.name}
          >
            <span
              aria-hidden="true"
              className={`type-caret bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent ${typedName ? '' : 'opacity-0'}`}
            >
              {typedName}
            </span>
          </h1>

          <p className="mt-4 text-slate-500">
            <span className="text-indigo-400">{TERMINAL_USER}</span>:<span className="text-cyan-300">~</span>${' '}
            cat role.txt
          </p>
          <p className="mt-1 font-semibold text-slate-200">{PROFILE.role}</p>

          <p className="mt-5 text-slate-300">{PROFILE.bio}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 text-sm text-slate-300 sm:px-8">
          <a href={`mailto:${PROFILE.email}`} className={chipClass}>
            <Mail size={15} className="text-indigo-400" /> {PROFILE.email}
          </a>
          <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`} className={chipClass}>
            <Phone size={15} className="text-indigo-400" /> {PROFILE.phone}
          </a>
          <span className={chipClass}>
            <MapPin size={15} className="text-indigo-400" /> {PROFILE.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 px-6 pb-8 pt-4 sm:px-8">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
          >
            <Eye size={18} /> View Resume
          </button>
          <a
            href={RESUME.downloadHref}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
          >
            <Download size={18} /> Download Resume
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
          >
            <GitHubIcon size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
