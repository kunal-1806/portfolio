import { ChevronRight, CalendarDays } from 'lucide-react'
import { GitHubIcon } from './icons'
import { PROJECTS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const cardClass =
  'group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="What I've Built" title="Featured Projects" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map(({ title, date, repo, points, tech }) => (
          <article key={title} className={`${cardClass} flex flex-col`}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug text-slate-100">{title}</h3>
              <div className="flex shrink-0 items-center gap-2">
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${title} — source code on GitHub`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition hover:border-indigo-500/60 hover:text-white"
                  >
                    <GitHubIcon size={14} />
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                  <CalendarDays size={12} /> {date}
                </span>
              </div>
            </div>
            <ul className="mb-5 space-y-2 text-sm text-slate-400">
              {points.map((point) => (
                <li key={point} className="flex gap-2">
                  <ChevronRight size={15} className="mt-0.5 shrink-0 text-indigo-400" />
                  {point}
                </li>
              ))}
            </ul>
            <ul className="mt-auto flex flex-wrap gap-2 border-t border-slate-800 pt-4">
              {tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-cyan-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
