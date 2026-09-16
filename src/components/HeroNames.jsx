import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { wedding } from '../config'

export default function HeroNames() {
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const bg = bgRef.current
    const content = contentRef.current

    if (!container || !bg || !content) return

    // ============================================================
    // AJUSTES DE VELOCIDADE DO PARALLAX (GSAP MOTION M3):
    // - yPercent da foto (8): movimento da imagem reduzida
    // - yPercent do conteúdo (-16): descolamento da tipografia
    // ============================================================
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    st.to(bg, { yPercent: 8, ease: 'none' }, 0)
    st.to(content, { yPercent: -16, opacity: 0.6, ease: 'none' }, 0)

    return () => {
      st.scrollTrigger?.kill()
      st.kill()
    }
  }, [])

  return (
    <section className="cinematic-hero" ref={containerRef}>
      {/* Camada de fundo: Textura bg.jpg / bg.png dos assets */}
      <div className="hero-texture-bg" aria-hidden="true" />

      {/* Camada 1: Foto com zoom reduzido e névoa difusa no rodapé do espaço vago */}
      <div className="hero-photo-container">
        <div className="hero-bg-layer" ref={bgRef}>
          <img
            className="hero-bg-photo"
            src="/photos/1.jpeg"
            alt="Marcos e Grazi"
            decoding="async"
            loading="eager"
          />
          {/* Névoa difusa focada na parte inferior para mesclar com o espaço vago */}
          <div className="hero-bottom-fog" aria-hidden="true" />
          {/* Scrim sutil de base para legibilidade do texto */}
          <div className="hero-bg-scrim" aria-hidden="true" />
        </div>
      </div>

      {/* Camada 2: Tipografia Monumental de Capa */}
      <div className="hero-content-layer" ref={contentRef}>
        <p className="hero-eyebrow">Convite de Casamento</p>
        <h1 className="hero-title-stack">
          <span className="hero-couple-name">{wedding.groom}</span>
          <span className="hero-couple-amp">&amp;</span>
          <span className="hero-couple-name">{wedding.bride}</span>
        </h1>
        <p className="hero-date-badge">29 · 11 · 2026</p>
      </div>

      {/* Camada 3: Microindicador Discreto no Rodapé */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator-label">Role para explorar</span>
        <span className="scroll-indicator-line" />
      </div>
    </section>
  )
}
