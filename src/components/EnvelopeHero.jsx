import { useState, useRef } from 'react'
import WaxSeal from './WaxSeal'
import { wedding } from '../config'

export default function EnvelopeHero({ onOpen, onTriggerLightCore, onTriggerWhiteout }) {
  const [isOpening, setIsOpening] = useState(false)
  const [overexposed, setOverexposed] = useState(false)
  const [coreTriggered, setCoreTriggered] = useState(false)
  const [whiteoutTriggered, setWhiteoutTriggered] = useState(false)
  const videoRef = useRef(null)

  const handleSealClick = () => {
    if (isOpening) return
    setIsOpening(true)

    const video = videoRef.current
    if (video) {
      video.muted = true
      try {
        video.currentTime = 0
      } catch (err) {
        console.warn('Error setting currentTime:', err)
      }

      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video play error, triggering fallback:', err)
          if (onTriggerLightCore) onTriggerLightCore()
          setTimeout(() => {
            if (onTriggerWhiteout) onTriggerWhiteout()
            setTimeout(() => onOpen(), 800)
          }, 1000)
        })
      }
    } else {
      if (onTriggerLightCore) onTriggerLightCore()
      setTimeout(() => {
        if (onTriggerWhiteout) onTriggerWhiteout()
        setTimeout(() => onOpen(), 800)
      }, 1000)
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const timeLeft = video.duration - video.currentTime

    // Faltando 2.2s para terminar o vídeo: ativa a superexposição do vídeo e o glow óptico no centro
    if (timeLeft <= 2.2 && !coreTriggered) {
      setCoreTriggered(true)
      setOverexposed(true)
      if (onTriggerLightCore) onTriggerLightCore()
    }

    // Faltando 0.8s para terminar o vídeo: ativa a lavagem total em marfim suave (#FCFBF7)
    if (timeLeft <= 0.8 && !whiteoutTriggered) {
      setWhiteoutTriggered(true)
      if (onTriggerWhiteout) onTriggerWhiteout()
    }
  }

  const handleVideoEnded = () => {
    onOpen()
  }

  return (
    <section
      className={`envelope-hero${isOpening ? ' is-opening' : ''}`}
      aria-label="Convite de Casamento de Marcos e Graziela"
    >
      {/* Camada de Vídeo de Abertura do Envelope */}
      <div className={`hero-video-wrapper${isOpening ? ' is-visible' : ''}`}>
        <video
          ref={videoRef}
          className={`envelope-video-element${overexposed ? ' overexpose' : ''}`}
          src="/assets/intro%20convite.mp4"
          playsInline
          muted
          preload="auto"
          autoPlay={false}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
        />
      </div>

      {/* Camada Inicial Estática do Convite */}
      <div className={`hero-static-content${isOpening ? ' is-hidden' : ''}`}>
        {/* Background textura rica com bg.jpg */}
        <div className="hero-bg-texture" aria-hidden="true" />

        {/* Camada de seda fluida com movimento sutil */}
        <div className="hero-silk" aria-hidden="true" />

        {/* Florais decorativos fixos nos cantos */}
        <img
          className="hero-floral hero-floral-top"
          src="/assets/flores.webp"
          alt=""
          aria-hidden="true"
          width="320"
          height="320"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <img
          className="hero-floral hero-floral-bottom"
          src="/assets/flores.webp"
          alt=""
          aria-hidden="true"
          width="320"
          height="320"
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        {/* Camada de névoa de contraste superior (abaixo do texto, acima da imagem) */}
        <div className="top-fog-overlay" aria-hidden="true" />

        {/* Nomes e Data em tipografia editorial premium */}
        <header className="hero-opening-header">
          <p className="opening-eyebrow">Convite de Casamento</p>
          <h1 className="opening-couple-names">
            <span>{wedding.groom}</span>
            <span className="opening-amp">&</span>
            <span>{wedding.bride}</span>
          </h1>
          <p className="opening-date">29 · 11 · 2026</p>
        </header>

        <div className="invite-card">
          <div className="envelope-scene">
            <div className="envelope-bg-picture" aria-hidden="true">
              <picture>
                <source media="(max-width: 768px)" srcSet="/assets/envelope-mobile.webp" />
                <img
                  className="envelope-bg-img"
                  src="/assets/envelope.webp"
                  alt="Envelope físico do convite de casamento"
                  width="4016"
                  height="5622"
                  draggable="false"
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            </div>

            {/* Camada de textura orgânica de papel e luz natural difusa (Overlay) */}
            <div className="paper-texture-overlay" aria-hidden="true" />

            {/* Overlay esfumaçado com transparência nas bordas */}
            <div className="envelope-fog-overlay" aria-hidden="true" />

            <div className="envelope-inner-light" aria-hidden="true" />

            {/* Lacre de cera (WaxSeal) posicionado sobre o bico do envelope */}
            <WaxSeal onClick={handleSealClick} disabled={isOpening} />
          </div>
        </div>

        {/* Indicação discreta e elegante de interação */}
        <div className="envelope-hint">
          <span>toque no selo para abrir</span>
        </div>
      </div>
    </section>
  )
}
