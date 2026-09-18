import { useEffect, useState } from 'react'
import EnvelopeHero from './components/EnvelopeHero'
import HeroNames from './components/HeroNames'
import StoryMessage from './components/StoryMessage'
import CelebrationDetails from './components/CelebrationDetails'
import EditorialGallery from './components/EditorialGallery'
import GiftsSection from './components/GiftsSection'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import AudioControl from './components/AudioControl'
import { AudioProvider } from './context/AudioContext'
import AssetsPage from './pages/assets'
import GiftsPage from './pages/GiftsPage'
import AdminRsvpPage from './pages/AdminRsvpPage'
import { useLenis } from './hooks/useLenis'
import { useImageScrollReveal } from './hooks/useScrollReveal'

function Invitation({ inviteVisible }) {
  useLenis()
  useImageScrollReveal(undefined, inviteVisible)

  return (
    <div className="page page-enter">
      <HeroNames inviteVisible={inviteVisible} />
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
  const [phase, setPhase] = useState('cover')
  const [lightCoreActive, setLightCoreActive] = useState(false)
  const [whiteoutActive, setWhiteoutActive] = useState(false)
  const [envelopeDismissed, setEnvelopeDismissed] = useState(false)
  const [inviteVisible, setInviteVisible] = useState(false)

  useEffect(() => {
    const locked = phase !== 'invite'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    document.body.style.overflow = locked ? 'hidden' : ''

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [phase])

  // Fallback: se o transitionend do whiteout não disparar, revela após o fade de 900ms
  useEffect(() => {
    if (inviteVisible || whiteoutActive || phase !== 'invite') return

    const revealTimer = window.setTimeout(() => {
      setInviteVisible(true)
    }, 1000)

    return () => window.clearTimeout(revealTimer)
  }, [inviteVisible, whiteoutActive, phase])

  const handleTriggerLightCore = () => {
    setLightCoreActive(true)
  }

  const handleTriggerWhiteout = () => {
    setWhiteoutActive(true)

    window.setTimeout(() => {
      setEnvelopeDismissed(true)
      setPhase('invite')

      window.setTimeout(() => {
        setWhiteoutActive(false)
        setLightCoreActive(false)
      }, 150)
    }, 950)
  }

  const handleOpen = () => {
    setPhase('invite')
    setEnvelopeDismissed(true)
    setInviteVisible(true)
  }

  const handleWhiteoutTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.propertyName !== 'opacity') return
    if (event.currentTarget.classList.contains('active')) return
    setInviteVisible(true)
  }

  return (
    <>
      {/* 1. Página principal pré-montada por baixo desde o início para evitar repaint flash no mobile */}
      <Invitation inviteVisible={inviteVisible} />

      {/* 2. Camada de Envelope sobreposta (z-index: 50) */}
      {!envelopeDismissed ? (
        <EnvelopeHero
          onOpen={handleOpen}
          onTriggerLightCore={handleTriggerLightCore}
          onTriggerWhiteout={handleTriggerWhiteout}
        />
      ) : null}

      {/* Camada 1: Glow óptico que queima o centro e expande */}
      <div className={`cinematic-light-core${lightCoreActive ? ' active' : ''}`} aria-hidden="true" />

      {/* Camada 2: Lavagem final total em marfim suave (#FCFBF7) */}
      <div
        className={`cinematic-whiteout${whiteoutActive ? ' active' : ''}`}
        aria-hidden="true"
        onTransitionEnd={handleWhiteoutTransitionEnd}
      />
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  const renderContent = () => {
    if (path === '/assets') {
      return <AssetsPage />
    }

    if (path === '/presentes' || path === '/lista') {
      return <GiftsPage />
    }

    if (path === '/gestao' || path === '/admin') {
      return <AdminRsvpPage />
    }

    return <Cover />
  }

  return (
    <AudioProvider>
      {renderContent()}
      <AudioControl />
    </AudioProvider>
  )
}
