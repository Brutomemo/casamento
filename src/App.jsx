import { useEffect, useState } from 'react'
import EnvelopeHero from './components/EnvelopeHero'
import HeroNames from './components/HeroNames'
import StoryMessage from './components/StoryMessage'
import CelebrationDetails from './components/CelebrationDetails'
import EditorialGallery from './components/EditorialGallery'
import GiftsSection from './components/GiftsSection'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import AssetsPage from './pages/assets'
import GiftsPage from './pages/GiftsPage'
import { useLenis } from './hooks/useLenis'

function Invitation() {
  useLenis()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 150)
        return () => clearTimeout(timer)
      }
    }
    return undefined
  }, [])

  return (
    <div className="page page-enter">
      <HeroNames />
      <StoryMessage />
      <CelebrationDetails />
      <EditorialGallery />
      <GiftsSection />
      <Rsvp />
      <Footer />
    </div>
  )
}

function Cover() {
  const [phase, setPhase] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      (window.location.hash || sessionStorage.getItem('envelope_opened') === 'true')
    ) {
      return 'invite'
    }
    return 'cover'
  })

  useEffect(() => {
    if (phase === 'invite') {
      sessionStorage.setItem('envelope_opened', 'true')
    }
  }, [phase])

  useEffect(() => {
    const locked = phase !== 'invite'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    document.body.style.overflow = locked ? 'hidden' : ''

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'opening') return undefined
    const id = window.setTimeout(() => setPhase('bloom'), 950)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'bloom') return undefined
    const id = window.setTimeout(() => setPhase('invite'), 1150)
    return () => window.clearTimeout(id)
  }, [phase])

  function openEnvelope() {
    if (phase !== 'cover') return
    setPhase('opening')
  }

  return (
    <>
      {phase !== 'invite' ? (
        <EnvelopeHero phase={phase} onOpen={openEnvelope} />
      ) : null}

      {phase === 'bloom' || phase === 'invite' ? (
        <div
          className={`invite-bloom${phase === 'bloom' ? ' is-on' : ''}${phase === 'invite' ? ' is-out' : ''}`}
          aria-hidden="true"
        />
      ) : null}

      {phase === 'invite' ? <Invitation /> : null}
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (path === '/assets') {
    return <AssetsPage />
  }

  if (path === '/presentes' || path === '/lista') {
    return <GiftsPage />
  }

  return <Cover />
}
