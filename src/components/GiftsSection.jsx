import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// CHAVES PIX OFICIAIS DO CASAL
// ============================================================
const PIX_NOIVA = '11989128745'
const PIX_NOIVO = '11984335153'

export default function GiftsSection() {
  const containerRef = useRef(null)
  const [copiedGrazi, setCopiedGrazi] = useState(false)
  const [copiedMarcos, setCopiedMarcos] = useState(false)

  const handleCopy = (key, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key).then(() => {
        if (type === 'grazi') {
          setCopiedGrazi(true)
          setTimeout(() => setCopiedGrazi(false), 3000)
        } else {
          setCopiedMarcos(true)
          setTimeout(() => setCopiedMarcos(false), 3000)
        }
      })
    }
  }

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

        {/* 3. Colunas Gêmeas para Duas Chaves Pix (Noiva & Noivo) */}
        <div className="gifts-grid-pix">
          {/* Pix Noiva (Graziela) */}
          <div className="gifts-card-editorial">
            <span className="gifts-card-tag">PIX DA NOIVA · GRAZIELA</span>
            <div className="gifts-key-display">{PIX_NOIVA}</div>
            <button
              type="button"
              className="gifts-copy-action"
              onClick={() => handleCopy(PIX_NOIVA, 'grazi')}
              aria-label="Copiar chave Pix da Noiva"
            >
              {copiedGrazi ? 'CHAVE COPIADA ✓' : 'COPIAR CHAVE ⎘'}
            </button>
            {copiedGrazi && <p className="gifts-toast-msg">Chave copiada com sucesso!</p>}
          </div>

          {/* Pix Noivo (Marcos) */}
          <div className="gifts-card-editorial">
            <span className="gifts-card-tag">PIX DO NOIVO · MARCOS</span>
            <div className="gifts-key-display">{PIX_NOIVO}</div>
            <button
              type="button"
              className="gifts-copy-action"
              onClick={() => handleCopy(PIX_NOIVO, 'marcos')}
              aria-label="Copiar chave Pix do Noivo"
            >
              {copiedMarcos ? 'CHAVE COPIADA ✓' : 'COPIAR CHAVE ⎘'}
            </button>
            {copiedMarcos && <p className="gifts-toast-msg">Chave copiada com sucesso!</p>}
          </div>
        </div>

        {/* 4. Lista de Presentes & Vales Simbólicos */}
        <div className="gifts-online-wrapper">
          <div className="gifts-card-editorial gifts-card-wide">
            <span className="gifts-card-tag">CATÁLOGO DE EXPERIÊNCIAS</span>
            <a
              href="/presentes"
              className="gifts-link-action"
            >
              VER SUGESTÕES DE PRESENTES &amp; VALES ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
