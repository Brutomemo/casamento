import { mapsUrl, wedding } from '../config'
import { useScrollReveal } from '../hooks/useScrollReveal'

function PinIcon() {
  return (
    <svg className="info-card-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 3.5c-4.1 0-7.5 3.2-7.5 7.4 0 5.4 7.5 13.6 7.5 13.6s7.5-8.2 7.5-13.6c0-4.2-3.4-7.4-7.5-7.4Z"
        stroke="#C9A96E"
        strokeWidth="1.2"
      />
      <circle cx="14" cy="10.6" r="2.4" stroke="#C9A96E" strokeWidth="1.2" />
    </svg>
  )
}

function TableIcon() {
  return (
    <svg className="info-card-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M8 5v5.5" stroke="#C9B0B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.8 5v5" stroke="#C9B0B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.2 5v5" stroke="#C9B0B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 10.5v12" stroke="#C9B0B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19.5 5.5v17" stroke="#C9B0B8" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M19.5 5.5c3.2 1.6 3.4 7.2 0 9.2"
        stroke="#C9B0B8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function InfoCards() {
  const ref = useScrollReveal()

  return (
    <section className="info-cards" ref={ref}>
      <article className="info-card">
        <PinIcon />
        <div>
          <h2 className="info-card-title">Cerimônia</h2>
          <p className="info-card-text">
            <span>{wedding.venueName}</span>
            <span>{wedding.address}</span>
            <span>{wedding.ceremonyTime}</span>
          </p>
          <a
            className="info-card-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver no mapa ↗
          </a>
        </div>
      </article>

      <article className="info-card">
        <TableIcon />
        <div>
          <h2 className="info-card-title">Recepção</h2>
          <p className="info-card-text">
            <span>{wedding.venueName}</span>
            <span>{wedding.address}</span>
            <span>{wedding.receptionTime}</span>
          </p>
          <a
            className="info-card-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver no mapa ↗
          </a>
        </div>
      </article>
    </section>
  )
}
