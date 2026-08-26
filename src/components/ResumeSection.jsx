import { Download } from 'lucide-react'
import { RESUME } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

export default function ResumeSection() {
  const ref = useReveal()

  return (
    <section id="resume" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Resume" title="Resume / CV" />

      <div className="flex justify-center">
        <a
          href={RESUME.downloadHref}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          <Download size={18} /> Download PDF
        </a>
      </div>

      <iframe
        src={RESUME.viewSrc}
        title="Kunal Tyagi — Resume"
        className="mt-10 h-[800px] w-full rounded-xl border border-slate-800"
      />

      <p className="mt-3 text-center text-sm text-slate-500">
        PDF not loading?{' '}
        <a href={RESUME.downloadHref} download className="text-indigo-400 transition hover:text-indigo-300">
          Download it instead
        </a>
        .
      </p>
    </section>
  )
}
