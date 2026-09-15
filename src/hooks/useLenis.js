import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

export function useLenis() {
  useEffect(() => {
    if (isCoarsePointer()) {
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return undefined
    }

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])
}
