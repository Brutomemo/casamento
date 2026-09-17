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
import { useLenis } from './hooks/useLenis'
import { useImageScrollReveal } from './hooks/useScrollReveal'

function Invitation() {
  useLenis()
  useImageScrollReveal()

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
  const [phase, setPhase] = useState('cover')
  const [lightCoreActive, setLightCoreActive] = useState(false)
  const [whiteoutActive, setWhiteoutActive] = useState(false)

  useEffect(() => {
    const locked = phase !== 'invite'
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    document.body.style.overflow = locked ? 'hidden' : ''

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [phase])

  const handleTriggerLightCore = () => {
    setLightCoreActive(true)
  }

  const handleTriggerWhiteout = () => {
    setWhiteoutActive(true)
  }

  const handleOpen = () => {
    setPhase('invite')
    setTimeout(() => {
      setWhiteoutActive(false)
      setLightCoreActive(false)
    }, 250)
  }

  return (
    <>
      {phase !== 'invite' ? (
        <EnvelopeHero
          onOpen={handleOpen}
          onTriggerLightCore={handleTriggerLightCore}
          onTriggerWhiteout={handleTriggerWhiteout}
        />
      ) : null}

      {/* Camada 1: Glow óptico que queima o centro e expande */}
      <div className={`cinematic-light-core${lightCoreActive ? ' active' : ''}`} aria-hidden="true" />

      {/* Camada 2: Lavagem final total em marfim suave (#FCFBF7) */}
      <div className={`cinematic-whiteout${whiteoutActive ? ' active' : ''}`} aria-hidden="true" />

      {phase === 'invite' ? <Invitation /> : null}
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

    return <Cover />
  }

  return (
    <AudioProvider>
      {renderContent()}
      <AudioControl />
    </AudioProvider>
  )
}
