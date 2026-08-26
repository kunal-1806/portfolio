import { GraduationCap } from 'lucide-react'
import { EDUCATION } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

export default function Education() {
  const ref = useReveal()

  return (
    <section id="education" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Where I Studied" title="Education" />

      <ol className="relative space-y-8 border-l border-slate-800 pl-8">
        {EDUCATION.map(({ school, degree, score, period }) => (
          <li key={school} className="relative">
            <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
              <GraduationCap size={12} />
            </span>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-500/50">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-100">{school}</h3>
                <span className="text-sm text-slate-500">{period}</span>
              </div>
              <p className="mt-1 text-slate-300">
                {degree} · <span className="font-medium text-cyan-300">{score}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
