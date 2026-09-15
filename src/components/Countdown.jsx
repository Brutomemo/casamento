import { Fragment } from 'react'
import { useCountdown } from '../hooks/useCountdown'
import { wedding } from '../config'

const units = [
  ['days', 'Dias'],
  ['hours', 'Horas'],
  ['minutes', 'Min'],
  ['seconds', 'Seg'],
]

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function Countdown() {
  const remaining = useCountdown(wedding.datetime)

  return (
    <section className="countdown" aria-live="polite">
      <p className="eyebrow">Contagem regressiva</p>
      <div className="countdown-grid">
        {units.map(([key, label], index) => (
          <Fragment key={key}>
            {index > 0 ? (
              <span className="countdown-sep" aria-hidden="true">
                ·
              </span>
            ) : null}
            <div className="countdown-unit">
              <span className="countdown-value">
                {key === 'days' ? remaining[key] : pad(remaining[key])}
              </span>
              <span className="countdown-label">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
