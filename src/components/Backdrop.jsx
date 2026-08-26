export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift-a absolute -left-32 -top-32 h-[42rem] w-[42rem] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="animate-drift-b absolute -bottom-40 -right-24 h-[38rem] w-[38rem] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="animate-drift-c absolute left-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-[110px]" />
      <div className="bg-grid-fade absolute inset-0" />
      <div className="bg-grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
