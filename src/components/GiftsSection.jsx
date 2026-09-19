import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GiftsSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const content = container.querySelector('.gifts-content')
    if (!content) return

    // Garante que o elemento seja visível imediatamente:
    content.style.opacity = '1'
    content.style.transform = 'none'

    const ctx = gsap.context(() => {
      gsap.from(content, {
        y: 20,
        opacity: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 95%',
          once: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section id="presentes" className="gifts-section" ref={containerRef} aria-label="Lista de Presentes">
      {/* Overlay de textura contínua de papel de algodão */}
      <div className="gifts-paper-overlay" aria-hidden="true" />

      {/* Adorno floral lateral esquerdo em relevo seco */}
      <img
        src="/assets/floral-vine-left.webp"
        alt=""
        width="200"
        height="600"
        className="gifts-vine-left-img"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <div className="gifts-container gifts-content">
        {/* 1. Chancela Visual no Topo: Selo de Cera Oficial */}
        <div className="gifts-seal-wrapper">
          <img
            src="/assets/selo.webp"
            alt="Selo de Cera Marcos &amp; Graziela"
            width="100"
            height="100"
            className="gifts-seal-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 2. Mensagem Afetiva */}
        <p className="gifts-eyebrow">GENTILEZA &amp; CARINHO</p>
        <h2 className="gifts-title">Lista de Presentes</h2>
        <p className="gifts-message">
          A presença de cada um de vocês é o nosso maior presente. Se desejar nos presentear de
          forma adicional, preparamos opções com muito carinho.
        </p>

        {/* Divider sutil */}
        <div className="gifts-divider" aria-hidden="true">
          <span className="gifts-divider-line" />
          <span className="gifts-divider-dot">♦</span>
          <span className="gifts-divider-line" />
        </div>

        {/* 3. Lista de Presentes & Vales Simbólicos (Isolado e Centralizado) */}
        <div className="gifts-online-wrapper gifts-catalog-only">
          <div className="gifts-card-editorial gifts-card-wide">
            {/* Detalhe Botânico Linear */}
            <svg
              width="46"
              height="20"
              viewBox="0 0 46 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#bfa168"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: '0 auto 12px auto', display: 'block', opacity: 0.85 }}
              aria-hidden="true"
            >
              <path d="M23 20V2M23 14C18 14 16 11 16 7C18 9 21 11 23 11M23 14C28 14 30 11 30 7C28 9 25 11 23 11M23 8C19 8 17 5 17 1C19 3 21 5 23 5M23 8C27 8 29 5 29 1C27 3 25 5 23 5" />
            </svg>
            <span className="gifts-card-tag">CATÁLOGO DE EXPERIÊNCIAS</span>
            <a
              href="/presentes"
              className="gifts-link-action gifts-pulse-cta"
            >
              · VER SUGESTÕES DE PRESENTES &amp; VALES ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
