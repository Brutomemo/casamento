import { usePhotos } from '../hooks/usePhotos'

const placeholders = [
  { id: 'g1', from: '#F2E0D8', to: '#E8C9BE' },
  { id: 'g2', from: '#C8D5C0', to: '#A9C0B0' },
  { id: 'g3', from: '#C9B0B8', to: '#B894A0' },
  { id: 'g4', from: '#FAF6F0', to: '#EDD9CE' },
  { id: 'g5', from: '#E8D4C6', to: '#F2E0D8' },
  { id: 'g6', from: '#D4C8C0', to: '#C8D5C0' },
]

function PlaceholderThumb({ id, from, to }) {
  return (
    <svg viewBox="0 0 120 160" width="120" height="160" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="120" height="160" rx="8" fill={`url(#${id})`} />
      <circle cx="60" cy="68" r="18" fill="rgba(255,253,249,0.35)" />
      <ellipse cx="60" cy="112" rx="28" ry="22" fill="rgba(255,253,249,0.28)" />
    </svg>
  )
}

export default function Gallery() {
  const photos = usePhotos()

  const items =
    photos.length > 0
      ? photos.map((src, index) => ({
          src,
          alt: `Marcos e Graziela — retrato ${index + 1}`,
        }))
      : placeholders.map((placeholder, index) => ({
          src: null,
          alt: `Marcos e Graziela — retrato ${index + 1}`,
          placeholder,
        }))

  return (
    <section className="gallery" aria-label="Galeria">
      <div className="gallery-track">
        {items.map((item, index) => (
          <div className="gallery-thumb" key={item.alt}>
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{
                  filter: 'sepia(0.18) contrast(1.08) brightness(0.95) saturate(0.85)',
                }}
              />
            ) : (
              <PlaceholderThumb {...placeholders[index]} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
