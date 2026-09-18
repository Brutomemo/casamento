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

export function useImageScrollReveal(containerRef, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const targetContainer = containerRef?.current || document.body
    if (!targetContainer) return

    let triggers = []

    const timer = setTimeout(() => {
      // Inclusão positiva: apenas elementos decorativos (ilustrações, florais, divisores, ornamentos)
      // NUNCA fotos do casal
      const decorativeSelectors = [
        '.floral-divider',
        '.editorial-divider',
        '.hero-floral',
        '.floral-icon',
        'svg[aria-hidden="true"]',
      ]

      const decoratives = Array.from(
        targetContainer.querySelectorAll(decorativeSelectors.join(', '))
      ).filter((el) => {
        if (el.closest('.envelope-hero')) return false
        if (el.closest('.photo-stack-card')) return false
        if (el.closest('.hero-bg-layer')) return false
        if (el.classList.contains('hero-bg-photo') || el.classList.contains('photo-stack-img')) return false
        return true
      })

      if (decoratives.length === 0) return

      triggers = decoratives.map((el) => {
        return gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            filter: 'blur(10px)',
            y: 12,
          },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      triggers.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [containerRef, enabled])
}
