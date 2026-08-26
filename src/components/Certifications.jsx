import { ArrowUpRight, FileBadge2, Trophy } from 'lucide-react'
import { CERTIFICATES, ACHIEVEMENTS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const cardClass =
  'w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

export default function Certifications({ onOpenCert }) {
  const ref = useReveal()

  return (
    <section id="certifications" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Credentials" title="Certifications & Achievements" />

      <div className="grid gap-6 md:grid-cols-3">
        {CERTIFICATES.map(({ title, issuer, date, src }) => (
          <button key={src} type="button" onClick={() => onOpenCert({ title, issuer, date, src })} className={cardClass}>
            <FileBadge2 size={26} className="mb-4 text-indigo-400" />
            <h3 className="font-semibold leading-snug text-slate-100">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {issuer} · {date}
            </p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">
              View certificate <ArrowUpRight size={15} />
            </p>
          </button>
        ))}
      </div>

      {ACHIEVEMENTS.map(({ text, date }) => (
        <div
          key={text}
          className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Trophy size={20} />
          </span>
          <p className="font-medium text-slate-200">{text}</p>
          <span className="ml-auto rounded-full border border-indigo-500/30 px-3 py-1 text-xs text-indigo-300">{date}</span>
        </div>
      ))}
    </section>
  )
}
