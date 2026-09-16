import { useCountdown } from '../hooks/useCountdown'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { mapsUrl, wedding } from '../config'

function padZero(num) {
  return String(num).padStart(2, '0')
}

const officialSchedule = [
  { time: '12h00', title: 'Chegada & Recepção' },
  { time: '12h30', title: 'Cerimônia' },
  { time: '13h30', title: 'Almoço & Brinde' },
  { time: '15h30', title: 'Celebração' },
  { time: '18h00', title: 'Encerramento' },
]

export default function CelebrationDetails() {
  const containerRef = useScrollReveal()
  const { days, hours, minutes, seconds } = useCountdown(wedding.datetime)

  return (
    <section className="celebration-section" ref={containerRef}>
      {/* Asset floral em relevo seco no topo da dobra */}
      <img
        src="/assets/floral-top.png"
        alt=""
        className="celebration-floral-top"
        aria-hidden="true"
        decoding="async"
        loading="lazy"
      />

      <div className="celebration-container">
        {/* Sub-bloco 1: Contagem Regressiva Editorial */}
        <div className="celebration-countdown">
          <p className="celebration-eyebrow">A Celebração</p>
          <div className="countdown-digits-row">
            <div className="countdown-unit">
              <span className="countdown-number">{padZero(days)}</span>
              <span className="countdown-label">DIAS</span>
            </div>
            <span className="countdown-sep" aria-hidden="true">·</span>
            <div className="countdown-unit">
              <span className="countdown-number">{padZero(hours)}</span>
              <span className="countdown-label">HORAS</span>
            </div>
            <span className="countdown-sep" aria-hidden="true">·</span>
            <div className="countdown-unit">
              <span className="countdown-number">{padZero(minutes)}</span>
              <span className="countdown-label">MIN</span>
            </div>
            <span className="countdown-sep" aria-hidden="true">·</span>
            <div className="countdown-unit">
              <span className="countdown-number">{padZero(seconds)}</span>
              <span className="countdown-label">SEG</span>
            </div>
          </div>
        </div>

        {/* Divisor Editorial Sutil */}
        <div className="celebration-divider" aria-hidden="true" />

        {/* Sub-bloco 2: O Local (Destaque Arquitetônico Único) */}
        <div className="celebration-venue">
          <h2 className="celebration-subheading">Brooklin — São Paulo</h2>
          <p className="celebration-address">
            Rua João de Lacerda Soares, 31 — Jardim das Acácias
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="celebration-maps-link"
          >
            VER NO GOOGLE MAPS ↗
          </a>
        </div>

        {/* Divisor Editorial Sutil */}
        <div className="celebration-divider" aria-hidden="true" />

        {/* Sub-bloco 3: Programação Oficial do Evento (Linha do Tempo Editorial Integrada) */}
        <div className="celebration-schedule">
          <p className="celebration-eyebrow">Programação do Dia</p>
          <div className="schedule-list">
            {officialSchedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <span className="schedule-time">{item.time}</span>
                <span className="schedule-dot" aria-hidden="true">·</span>
                <span className="schedule-title">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
