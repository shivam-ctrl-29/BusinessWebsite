import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Fleet from './components/Fleet'
import Industries from './components/Industries'
import Quote from './components/Quote'
import Testimonials from './components/Testimonials'
import Branches from './components/Branches'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ServiceModal from './components/ServiceModal'
import LegalModal from './components/LegalModal'
import AiChat from './components/AiChat'
import FloatingButtons from './components/FloatingButtons'
import SectionNav from './components/SectionNav'
import Toast from './components/Toast'

export default function App() {
  const [dark, setDark] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: '' })
  const [modalKey, setModalKey] = useState(null)
  const [legalDoc, setLegalDoc] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : '')
  }, [dark])

  useEffect(() => {
    window.scrollTo(0, 0)
    history.replaceState(null, '', '/')
    const t = setTimeout(() => setLoaded(true), 1800)
    return () => clearTimeout(t)
  }, [])

  const showToast = (msg) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 3000)
  }

  return (
    <>
      <Loader hidden={loaded} />
      <Toast show={toast.show} msg={toast.msg} />
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Services onCardClick={setModalKey} />
      <WhyUs />
      <Fleet />
      <Industries />
      <Quote showToast={showToast} />
      <Testimonials />
      <Branches />
      <Contact showToast={showToast} />
      <Footer onLegalClick={setLegalDoc} />
      <ServiceModal serviceKey={modalKey} onClose={() => setModalKey(null)} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <FloatingButtons />
      <SectionNav />
      <AiChat showToast={showToast} />
    </>
  )
}
