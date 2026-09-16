import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { usePhotos } from '../hooks/usePhotos'

gsap.registerPlugin(ScrollTrigger)

const EDITORIAL_META = [
  {
    num: '02',
    caption: 'FRAGMENTO I · REGISTRO DE UM AFETO',
    layout: 'layout-left',
    location: 'NOVA YORK · 2024',
  },
  {
    num: '03',
    caption: 'FRAGMENTO II · OLHARES & SILÊNCIOS',
    layout: 'layout-right',
    location: 'REGISTROS',
  },
  {
    num: '04',
    caption: 'FRAGMENTO III · A CAMINHO DA CELEBRAÇÃO',
    layout: 'layout-center',
    location: 'MEMÓRIA DE AFETO',
  },
  {
    num: '05',
    caption: 'FRAGMENTO IV · DETALHES & SEGREDO',
    layout: 'layout-offset-left',
    location: 'DIÁRIO DE BORDO',
  },
  {
    num: '06',
    caption: 'FRAGMENTO V · CÚMPLICES NO TEMPO',
    layout: 'layout-offset-right',
    location: 'BROOKLIN · SP',
  },
  {
    num: '07',
    caption: 'FRAGMENTO VI · A PROMESSA',
    layout: 'layout-left',
    location: 'ALMANAQUE',
  },
  {
    num: '08',
    caption: 'FRAGMENTO VII · PARA SEMPRE',
    layout: 'layout-center-wide',
    location: 'MARCOS & GRAZI',
  },
]

export default function EditorialGallery() {
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const allPhotos = usePhotos()

  // Exclui expressamente a foto /photos/1.jpeg para não repetir o Hero principal
  const filteredPhotos = allPhotos.filter(
    (src) => !src.endsWith('/1.jpeg') && !src.endsWith('/1.png') && !src.endsWith('/1.jpg')
  )

  const photosToDisplay =
    filteredPhotos.length > 0
      ? filteredPhotos
      : [
          '/photos/2.jpeg',
          '/photos/3.jpeg',
          '/photos/4.jpeg',
          '/photos/5.jpeg',
          '/photos/6.jpeg',
          '/photos/7.jpeg',
          '/photos/8.jpeg',
        ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const triggers = []

    // 1. Revelação suave do cabeçalho (fade-up 1.1s)
    const header = container.querySelector('.editorial-header')
    if (header) {
      const headerTween = gsap.fromTo(
        header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true,
          },
        }
      )
      triggers.push(headerTween)
    }

    // 2. Animação de revelação por item (soft curtain fade-up 1.2s) + micro-parallax da fotografia
    itemsRef.current.forEach((item) => {
      if (!item) return

      // Revelação Fade-Up com curva natural
      const fadeTween = gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
        }
      )
      triggers.push(fadeTween)

      // Micro-parallax vertical na imagem dentro do container
      const img = item.querySelector('.editorial-img')
      if (img) {
        const parallaxTween = gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
        triggers.push(parallaxTween)
      }
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      triggers.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [photosToDisplay.length])

  return (
    <section className="editorial-gallery" ref={containerRef} aria-label="Galeria de Registros">
      {/* Overlay de textura contínua de papel de algodão */}
      <div className="editorial-paper-overlay" aria-hidden="true" />

      <div className="editorial-container">
        {/* Cabeçalho Poético Refinado */}
        <header className="editorial-header">
          <p className="editorial-eyebrow">FRAGMENTOS &amp; MEMÓRIAS</p>
          <h2 className="editorial-title">Registros de Afeto</h2>
          <div className="editorial-divider" aria-hidden="true">
            <span className="editorial-divider-line" />
            <span className="editorial-divider-dot">♦</span>
            <span className="editorial-divider-line" />
          </div>
        </header>

        {/* Grid Editorial Vertical Assimétrico */}
        <div className="editorial-grid">
          {photosToDisplay.map((src, idx) => {
            const meta = EDITORIAL_META[idx % EDITORIAL_META.length]
            const photoNum = idx + 2

            return (
              <figure
                key={src}
                ref={(el) => {
                  itemsRef.current[idx] = el
                }}
                className={`editorial-item ${meta.layout}`}
              >
                <div className="editorial-passepartout">
                  <div className="editorial-img-wrapper">
                    <img
                      src={src}
                      alt={`Marcos e Grazi — Retrato ${photoNum}`}
                      loading="lazy"
                      decoding="async"
                      className="editorial-img"
                    />
                  </div>
                  <figcaption className="editorial-caption">
                    <span className="caption-tag">{meta.location}</span>
                    <span className="caption-title">{meta.caption}</span>
                  </figcaption>
                </div>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
