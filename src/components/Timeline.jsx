import { useScrollReveal } from '../hooks/useScrollReveal'

const items = [
  ['12h00', 'Recepção'],
  ['19h00', 'Encerramento'],
]

export default function Timeline() {
  const ref = useScrollReveal()

  return (
    <section className="timeline" ref={ref}>
      <ol className="timeline-list">
        {items.map(([time, event]) => (
          <li className="timeline-item" key={time}>
            <span className="timeline-dot" aria-hidden="true" />
            <div>
              <span className="timeline-time">{time}</span>
              <p className="timeline-event">{event}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
