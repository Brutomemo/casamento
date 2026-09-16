import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryMessage() {
  const containerRef = useRef(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      }
    )

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="story-message-section" ref={containerRef}>
      <div className="story-message-container">
        <p className="story-eyebrow">No Tempo Certo</p>
        <div className="story-body">
          <p>Há encontros que nascem de propósitos.</p>
          <p>Antes de nos conhecermos, Deus já guardava a nossa oração.</p>
          <p>
            O que celebramos hoje é a certeza de que nenhum caminho se cruza por acaso
            quando é a mão d’Ele que desenha o destino.
          </p>
        </div>
        <blockquote className="story-quote">
          <p className="quote-text">
            &ldquo;Para que todos vejam, saibam, considerem e entendam que a mão do Senhor fez isso.&rdquo;
          </p>
          <cite className="quote-cite">Isaías 41:20</cite>
        </blockquote>

        {/* Ilustração floral de fechamento abaixo de Isaías 41:20 */}
        <img
          src="/assets/flores.png"
          alt=""
          className="story-flores-img"
          aria-hidden="true"
          decoding="async"
          loading="lazy"
        />
      </div>
    </section>
  )
}
