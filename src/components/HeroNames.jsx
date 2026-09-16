import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { wedding } from '../config'

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

    // Respeita preferência do usuário por movimento reduzido (Acessibilidade)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // ============================================================
    // SISTEMA CINEMATOGRÁFICO DE CÂMERA EM TELA CHEIA (GSAP SCROLL-DRIVEN M3):
    // 1. Câmera recua (pull-back: scale 1.04 -> 1.00) e desloca verticalmente (~20% do scroll)
    // 2. Nomes do casal descolam em velocidade distinta (~12% do scroll) criando profundidade
    // 3. Microindicador desvanece rápido nos primeiros ~40px de scroll
    // ============================================================
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // Camada 1 (Foto em Tela Cheia): Recuo sutil de câmera (pull-back 1.04 -> 1.00)
    if (photo) {
      st.fromTo(
        photo,
        { scale: 1.04 },
        { scale: 1.0, ease: 'none' },
        0
      )
    }

    // Camada 1 (Fundo): Deslocamento vertical suave da foto (~20% do scroll)
    st.to(bg, { yPercent: 12, opacity: 0.85, ease: 'none' }, 0)

    // Camada 2 (Nomes & Conteúdo sobrepostos): Deslocamento óptico 3D (~12% do scroll)
    st.to(content, { yPercent: -12, opacity: 0.5, ease: 'none' }, 0)

    // Camada 3 (Microindicador): Desvanece rapidamente nos primeiros ~40px rolados
    if (indicator) {
      st.to(indicator, { opacity: 0, y: -10, ease: 'power1.out' }, 0)
    }

    return () => {
      st.scrollTrigger?.kill()
      st.kill()
    }
  }, [])

  return (
    <section className="cinematic-hero" ref={containerRef}>
      {/* Camada 0: Textura de papel no fundo (bg.png / bg.jpg) */}
      <div className="hero-texture-bg" aria-hidden="true" />

      {/* Camada 1: Fotografia de fundo em TELA CHEIA de ponta a ponta (100dvh) */}
      <div className="hero-bg-layer" ref={bgRef}>
        <img
          ref={photoRef}
          className="hero-bg-photo"
          src="/photos/1.jpeg"
          alt="Marcos e Grazi"
          decoding="async"
          loading="eager"
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
