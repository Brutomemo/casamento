import { useState } from 'react'

type WaxSealProps = {
  initials?: string
  src?: string
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

function SealFallback() {
  return (
    <svg className="wax-seal-fallback" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="waxFill" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f7efe4" />
          <stop offset="55%" stopColor="#ead9c6" />
          <stop offset="100%" stopColor="#d4c2a8" />
        </radialGradient>
      </defs>
      <path
        fill="url(#waxFill)"
        d="M60 4c6.2 0 8.4 5.2 13.2 6.2 4.8 1 9.2-2.6 13.6-.8 4.4 1.8 4.2 7.6 8.6 10.2 4.4 2.6 9.6.4 12.6 4.4 3 4 0.2 8.8 2.2 13.4 2 4.6 7.4 6.2 7.4 12.2s-5.4 7.6-7.4 12.2c-2 4.6 0.8 9.4-2.2 13.4-3 4-8.2 1.8-12.6 4.4-4.4 2.6-4.2 8.4-8.6 10.2-4.4 1.8-8.8-1.8-13.6-.8C68.4 110.8 66.2 116 60 116s-8.4-5.2-13.2-6.2c-4.8-1-9.2 2.6-13.6.8-4.4-1.8-4.2-7.6-8.6-10.2-4.4-2.6-9.6-.4-12.6-4.4-3-4-.2-8.8-2.2-13.4C7.8 77.6 2.4 76 2.4 70s5.4-7.6 7.4-12.2c2-4.6-.8-9.4 2.2-13.4 3-4 8.2-1.8 12.6-4.4 4.4-2.6 4.2-8.4 8.6-10.2 4.4-1.8 8.8 1.8 13.6.8C51.6 9.2 53.8 4 60 4Z"
      />
    </svg>
  )
}

export default function WaxSeal({
  initials = '',
  src = '/assets/selo.webp',
  onClick,
  disabled = false,
  style,
}: WaxSealProps) {
  const [useImage, setUseImage] = useState(true)

  return (
    <button
      type="button"
      className={`wax-seal${!disabled ? ' is-pulse' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      aria-label="Tocar para abrir o convite de casamento de Marcos e Graziela"
    >
      {useImage ? (
        <img
          className="wax-seal-img"
          src={src}
          alt=""
          width="120"
          height="120"
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setUseImage(false)}
        />
      ) : (
        <SealFallback />
      )}
      {initials ? <span className="wax-seal-initials">{initials}</span> : null}
    </button>
  )
}
