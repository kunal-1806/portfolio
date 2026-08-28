import { Mail, Phone, MapPin, Eye, Download } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from './icons'
import { PROFILE, RESUME } from '../data'
import useReveal from '../hooks/useReveal'
import useTypewriter from '../hooks/useTypewriter'

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 transition hover:border-indigo-500/50'

export default function Hero({ onOpenResume }) {
  const ref = useReveal()
  const { text: typedName } = useTypewriter(PROFILE.name)

  return (
    <section
      id="top"
      ref={ref}
      className="reveal mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pt-16 text-center sm:px-6"
    >
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
        {PROFILE.role}
      </span>

      <h1
        className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        aria-label={PROFILE.name}
      >
        <span
          aria-hidden="true"
          className={`type-caret bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent ${typedName ? '' : 'opacity-0'}`}
        >
          {typedName}
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{PROFILE.bio}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
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

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  )
}
