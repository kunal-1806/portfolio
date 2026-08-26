import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import ResumeSection from './components/ResumeSection'
import Education from './components/Education'
import Footer from './components/Footer'
import PdfModal from './components/PdfModal'
import Backdrop from './components/Backdrop'
import { RESUME } from './data'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [activeCert, setActiveCert] = useState(null)

  return (
    <div className="min-h-screen">
      <Backdrop />
      <Navbar />
      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Certifications onOpenCert={setActiveCert} />
        <ResumeSection />
        <Education />
      </main>
      <Footer />

      {resumeOpen && (
        <PdfModal
          src={RESUME.viewSrc}
          title="Kunal Tyagi — Resume"
          onClose={() => setResumeOpen(false)}
        />
      )}
      {activeCert && (
        <PdfModal
          src={activeCert.src}
          title={`${activeCert.title} — ${activeCert.issuer}`}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  )
}
