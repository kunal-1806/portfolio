import { MapPin, GraduationCap, Award, FolderGit2, FileBadge2, Code2, Terminal, Medal } from 'lucide-react'
import { PROFILE, PROJECTS, CERTIFICATES, ABOUT, PROBLEM_STATS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'
import ProfileAvatar from './ProfileAvatar'

const FACTS = [
  { icon: MapPin, label: 'Location', value: 'Punjab, India' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE at Lovely Professional University' },
  { icon: Award, label: 'CGPA', value: '8.80' },
]

const ICONS = { LeetCode: Code2, Codetantra: Terminal, HackerRank: Medal }

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

function CountStat({ icon: Icon, target, suffix, label }) {
  const [ref, inView] = useInView(0.4)
  const value = useCountUp(target, inView)
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 rounded-2xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 to-cyan-400/5 p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-slate-100">
          {value}
          {suffix}
        </p>
        <p className="text-xs uppercase tracking-widest text-slate-500">{label}</p>
      </div>
    </div>
  )
}

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

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CountStat icon={FolderGit2} target={PROJECTS.length} suffix="" label="Projects built" />
        {PROBLEM_STATS.map(({ platform, count, suffix }) => (
          <CountStat key={platform} icon={ICONS[platform]} target={count} suffix={suffix} label={`${platform} problems`} />
        ))}
      </div>

      <div className={`${cardClass} mt-6`}>
        <div className="mb-5 flex items-center gap-4">
          <ProfileAvatar className="h-20 w-20" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">My Story</p>
            <h3 className="text-xl font-bold text-slate-100">{PROFILE.name}</h3>
            <p className="text-sm text-indigo-300">{PROFILE.role}</p>
          </div>
        </div>
        <div className="space-y-4">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-5 border-t border-slate-800 pt-4 text-sm italic text-slate-500">
          Based in {PROFILE.location} · pursuing B.Tech CSE at Lovely Professional University (Aug 2025 – Present).
        </p>
      </div>
    </section>
  )
}
