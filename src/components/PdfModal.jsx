import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function PdfModal({ src, title, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="mx-auto mb-4 flex w-full max-w-5xl items-center justify-between">
        <h3 className="truncate pr-4 text-lg font-semibold text-slate-100">{title}</h3>
        <button
          ref={closeRef}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close viewer"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-indigo-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Close <X size={16} />
        </button>
      </div>
      <div
        className="mx-auto flex w-full max-w-5xl flex-1 overflow-hidden rounded-xl border border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe src={`${src}#view=FitH`} title={title} className="h-full min-h-[80vh] w-full bg-white" />
      </div>
    </div>
  )
}
