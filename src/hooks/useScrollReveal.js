import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return ref
}

export function useImageScrollReveal(containerRef) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const targetContainer = containerRef?.current || document.body
    if (!targetContainer) return

    let triggers = []

    const timer = setTimeout(() => {
      // Seleciona todas as imagens da página, exceto as do álbum de fotos, hero principal e envelope
      const images = Array.from(targetContainer.querySelectorAll('img')).filter((img) => {
        return (
          !img.closest('.photo-stack-card') &&
          !img.closest('.photo-stack-passepartout') &&
          !img.closest('.gallery') &&
          !img.classList.contains('hero-bg-photo') &&
          !img.closest('.envelope-hero')
        )
      })

      if (images.length === 0) return

      triggers = images.map((img) => {
        return gsap.fromTo(
          img,
          {
            opacity: 0,
            filter: 'blur(12px)',
            y: 16,
            scale: 1.04,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      triggers.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [containerRef])
}
