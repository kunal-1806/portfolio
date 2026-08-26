import { MapPin, GraduationCap, Award } from 'lucide-react'
import { PROFILE } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const FACTS = [
  { icon: MapPin, label: 'Location', value: 'Punjab, India' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE at Lovely Professional University' },
  { icon: Award, label: 'CGPA', value: '8.80' },
]

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Who I Am" title="About Me" />

      <div className="grid gap-6 sm:grid-cols-3">
        {FACTS.map(({ icon: Icon, label, value }) => (
          <div key={label} className={cardClass}>
            <Icon size={24} className="mb-4 text-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
            <p className="mt-1 font-medium text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      <div className={`${cardClass} mt-6`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Bio</p>
        <p className="mt-2 leading-relaxed text-slate-300">{PROFILE.bio}</p>
      </div>
    </section>
  )
}
