import { useRef, useState } from 'react'
import WaxSeal from './WaxSeal'
import { wedding } from '../config'

export default function EnvelopeHero({ onOpen, onTriggerLightCore, onTriggerWhiteout }) {
  const [isVideoActive, setIsVideoActive] = useState(false)
  const videoRef = useRef(null)
  const lightTriggeredRef = useRef(false)
  const endTriggeredRef = useRef(false)

  const handleSealClick = () => {
    lightTriggeredRef.current = false
    endTriggeredRef.current = false
    setIsVideoActive(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch((err) => {
        console.error('Erro ao dar play no vídeo:', err)
        onOpen?.()
      })
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration || isNaN(video.duration)) return

    const timeLeft = video.duration - video.currentTime

    // Disparo do feixe de luz (apenas uma vez)
    if (timeLeft <= 3.2 && !lightTriggeredRef.current) {
      lightTriggeredRef.current = true
      onTriggerLightCore?.()
    }

    // Disparo do whiteout / revelação (apenas uma vez)
    if (timeLeft <= 1.2 && !endTriggeredRef.current) {
      endTriggeredRef.current = true
      // Congela o vídeo no frame atual para nunca dar loop ou recuo de frame
      video.pause()
      onTriggerWhiteout?.()
    }
  }

  const handleVideoEnded = () => {
    if (!endTriggeredRef.current) {
      endTriggeredRef.current = true
      onTriggerWhiteout?.()
    }
  }

  return (
    <section
      className={`envelope-hero${isVideoActive ? ' is-opening' : ''}`}
      aria-label="Convite de Casamento de Marcos e Graziela"
    >
      {/* Background textura rica com bg.jpg */}
      <div className="hero-bg-texture" aria-hidden="true" />

      {/* Camada de seda fluida com movimento sutil */}
      <div className="hero-silk" aria-hidden="true" />

      {/* 1. Conteúdo Estático Inicial (Envelope Físico e Selo de Cera) */}
      <div className={`hero-static-content ${isVideoActive ? 'is-hidden' : ''}`}>
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

        {/* Camada de névoa de contraste superior */}
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
            <WaxSeal onClick={handleSealClick} disabled={isVideoActive} />
          </div>
        </div>

        {/* Indicação discreta de interação */}
        <div className="envelope-hint">
          <span>toque no selo para abrir</span>
        </div>
      </div>

      {/* 2. Camada de Vídeo de Abertura Cinematográfico */}
      <div className={`hero-video-wrapper ${isVideoActive ? 'is-visible' : ''}`}>
        <video
          ref={videoRef}
          src="/assets/intro-convite.mp4"
          className="envelope-video-element"
          playsInline
          muted
          preload="auto"
          autoPlay={false}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
        />
      </div>
    </section>
  )
}
