export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{title}</h2>
    </div>
  )
}
