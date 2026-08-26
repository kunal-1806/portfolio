import { Braces, Layers, Database, Wrench, BrainCircuit } from 'lucide-react'
import { SKILLS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const CATEGORY_ICONS = [Braces, Layers, Database, Wrench, BrainCircuit]

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

const ICONS = {
  Python: `${DEVICON}/python/python-original.svg`,
  C: `${DEVICON}/c/c-original.svg`,
  FastAPI: `${DEVICON}/fastapi/fastapi-original.svg`,
  Streamlit: `${DEVICON}/streamlit/streamlit-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  Git: `${DEVICON}/git/git-original.svg`,
  GitHub: `${DEVICON}/github/github-original.svg`,
  Linux: `${DEVICON}/linux/linux-original.svg`,
  'VS Code': `${DEVICON}/vscode/vscode-original.svg`,
}

function monogram(name) {
  if (/^[A-Z0-9]{1,4}$/.test(name)) return name
  if (name.length <= 2) return name.toUpperCase()
  const parts = name.replace(/([a-z])([A-Z])/g, '$1 $2').split(/[\s\-&]+/).filter(Boolean)
  return (
    parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('') || name[0].toUpperCase()
  )
}

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
                    className="flex items-center gap-2 rounded-md border border-slate-700/60 bg-slate-800/60 py-1.5 pl-2 pr-3 text-sm text-slate-300"
                  >
                    {ICONS[item] ? (
                      <img src={ICONS[item]} alt="" aria-hidden="true" loading="lazy" className="h-4 w-4 object-contain" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-4 min-w-4 items-center justify-center rounded bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 px-0.5 text-[8px] font-bold leading-none text-indigo-200"
                      >
                        {monogram(item)}
                      </span>
                    )}
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
