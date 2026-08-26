import { Braces, Layers, Database, Wrench, BrainCircuit } from 'lucide-react'
import { SKILLS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const CATEGORY_ICONS = [Braces, Layers, Database, Wrench, BrainCircuit]

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="What I Work With" title="Skills" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map(({ category, items }, i) => {
          const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length]
          return (
            <div key={category} className={cardClass}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Icon size={20} />
                </span>
                <h3 className="font-semibold text-slate-100">{category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
