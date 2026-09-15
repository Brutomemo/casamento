import FloralDivider from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { wedding, whatsappUrl } from '../config'

export default function Rsvp() {
  const ref = useScrollReveal()

  return (
    <section className="rsvp" ref={ref}>
      <FloralDivider />
      <h2 className="rsvp-title">Confirme sua presença</h2>
      <p className="rsvp-deadline">Até {wedding.rsvpDeadline}</p>
      <a
        className="rsvp-cta"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Confirmar presença
      </a>
      <p className="rsvp-contact">
        WhatsApp ·{' '}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          Marcos
        </a>
      </p>
    </section>
  )
}
