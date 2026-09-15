import FloralDivider from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function HeroNames() {
  const ref = useScrollReveal()

  return (
    <section className="hero-names" ref={ref}>
      <p className="eyebrow">Casamento</p>
      <FloralDivider />
      <h1 className="hero-names-stack">
        <span className="hero-name">Marcos</span>
        <span className="hero-amp">&amp;</span>
        <span className="hero-name">Grazi</span>
      </h1>
      <p className="hero-date-row">
        <span className="hero-date-line" aria-hidden="true" />
        <span className="hero-date">29 · NOV · 2026 · DOMINGO</span>
        <span className="hero-date-line" aria-hidden="true" />
      </p>
      <p className="hero-venue">Broklin — São Paulo, SP</p>
    </section>
  )
}
