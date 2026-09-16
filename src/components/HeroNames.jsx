import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { wedding } from '../config'

gsap.registerPlugin(ScrollTrigger)

export default function HeroNames() {
  const containerRef = useRef(null)
  const photoRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const photo = photoRef.current
    const bg = bgRef.current
    const content = contentRef.current
    const indicator = indicatorRef.current

    if (!container || !bg || !content) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // ============================================================
    // MECÂNICA DO SCROLL CINEMATOGRÁFICO DE CÂMERA (GSAP SCROLL-DRIVEN M3):
    // 1. Fotografia: Recuo de escala (1.05 -> 1.00) e deslocamento vertical (translate3d 0 -> 18%)
    // 2. Bloco de Nomes & Data: Descola da foto (yPercent: -15 / translateY: -30px) com desvanecimento
    // 3. Microindicador: Desvanece nos primeiros ~30px de scroll
    // ============================================================
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Hero Scroll Progress]:', self.progress.toFixed(3))
          }
        },
      },
    })

    // Recuo de escala da foto (scale 1.05 -> 1.00)
    if (photo) {
      st.fromTo(
        photo,
        { scale: 1.05 },
        { scale: 1.0, ease: 'none' },
        0
      )
    }

    // Deslocamento vertical da camada da foto (translate3d / yPercent: 18%)
    st.fromTo(
      bg,
      { yPercent: 0 },
      { yPercent: 18, opacity: 0.85, ease: 'none' },
      0
    )

    // Bloco de Nomes e Data descola mais rápido (yPercent: -15) e perde opacidade
    st.fromTo(
      content,
      { yPercent: 0, opacity: 1 },
      { yPercent: -15, opacity: 0.3, ease: 'none' },
      0
    )

    // Microindicador vertical desvanece rapidamente nos primeiros pixels rolados
    if (indicator) {
      st.to(indicator, { opacity: 0, y: -15, ease: 'power1.out', duration: 0.15 }, 0)
    }

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      st.scrollTrigger?.kill()
      st.kill()
    }
  }, [])

  return (
    <section className="cinematic-hero" ref={containerRef}>
      {/* Camada 0: Textura de papel no fundo (bg.png / bg.jpg) */}
      <div className="hero-texture-bg" aria-hidden="true" />

      {/* Camada 1: Fotografia de fundo em TELA CHEIA (100dvh com 125% de altura para parallax) */}
      <div className="hero-bg-layer" ref={bgRef}>
        <img
          ref={photoRef}
          className="hero-bg-photo"
          src="/photos/1.jpeg"
          alt="Marcos e Grazi"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        {/* Scrim cinematográfico & Névoa de degradê na base da foto */}
        <div className="hero-bottom-fog" aria-hidden="true" />
        <div className="hero-bg-scrim" aria-hidden="true" />
      </div>

      {/* Camada 2: Tipografia Monumental de Capa sobreposta na foto */}
      <div className="hero-content-layer" ref={contentRef}>
        <p className="hero-eyebrow">Convite de Casamento</p>
        <h1 className="hero-title-stack">
          <span className="hero-couple-name">{wedding.groom}</span>
          <span className="hero-couple-amp">&amp;</span>
          <span className="hero-couple-name">{wedding.bride}</span>
        </h1>
        <p className="hero-date-badge">29 · 11 · 2026</p>
      </div>

      {/* Camada 3: Microindicador Discreto no Rodapé (Linha vertical minimalista) */}
      <div className="hero-scroll-indicator" ref={indicatorRef} aria-hidden="true">
        <span className="scroll-indicator-line" />
      </div>
    </section>
  )
}
