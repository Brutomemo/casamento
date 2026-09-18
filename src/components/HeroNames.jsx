import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { wedding } from '../config'

gsap.registerPlugin(ScrollTrigger)

export default function HeroNames({ inviteVisible = false }) {
  const containerRef = useRef(null)
  const photoRef = useRef(null)
  const bgRef = useRef(null)
  const contentRef = useRef(null)
  const indicatorRef = useRef(null)

  // ============================================================
  // 1. ANIMAÇÃO DE ENTRADA (LENTE FOTOGRÁFICA) — só quando a tela está visível
  // ============================================================
  useEffect(() => {
    if (!inviteVisible) return

    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const names = container.querySelectorAll('.hero-couple-name')
    const amp = container.querySelector('.hero-couple-amp')
    const dateBadge = container.querySelector('.hero-date-badge')
    const eyebrow = container.querySelector('.hero-eyebrow')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      if (names.length) {
        tl.fromTo(
          names,
          { autoAlpha: 0, filter: 'blur(14px)', scale: 1.05, y: 16 },
          { autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          0
        )
      }

      if (amp) {
        tl.fromTo(
          amp,
          { autoAlpha: 0, filter: 'blur(14px)', scale: 1.05, y: 16 },
          { autoAlpha: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          0.1
        )
      }

      if (eyebrow || dateBadge) {
        const subs = []
        if (eyebrow) subs.push(eyebrow)
        if (dateBadge) subs.push(dateBadge)

        tl.fromTo(
          subs,
          { autoAlpha: 0, filter: 'blur(8px)', y: 10 },
          { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power2.out' },
          '-=0.9'
        )
      }
    }, container)

    return () => ctx.revert()
  }, [inviteVisible])

  // ============================================================
  // 2. MECÂNICA DO SCROLL CINEMATOGRÁFICO DE CÂMERA (PARALLAX)
  // ============================================================
  useEffect(() => {
    if (!inviteVisible) return

    const container = containerRef.current
    const bg = bgRef.current
    const content = contentRef.current
    const indicator = indicatorRef.current

    if (!container || !bg || !content) return
    if (window.innerWidth <= 768 || window.matchMedia('(max-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // Deslocamento vertical da camada da foto (translate3d / yPercent: 18%)
    st.fromTo(
      bg,
      { yPercent: 0 },
      { yPercent: 18, opacity: 0.85, ease: 'none' },
      0
    )

    // Bloco de Nomes e Data descola mais rápido (yPercent: -15) e perde opacidade no scroll
    st.to(
      content,
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
  }, [inviteVisible])

  return (
    <section className="cinematic-hero" ref={containerRef}>
      {/* Camada 0: Textura de papel no fundo (bg.png / bg.jpg) */}
      <div className="hero-texture-bg" aria-hidden="true" />

      {/* Camada 1: Fotografia de fundo em TELA CHEIA (100dvh com 125% de altura para parallax) */}
      <div className="hero-bg-layer" ref={bgRef}>
        <img
          ref={photoRef}
          className="hero-bg-photo"
          src="/photos/1.webp"
          alt="Marcos e Graziela"
          width="1920"
          height="1080"
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
