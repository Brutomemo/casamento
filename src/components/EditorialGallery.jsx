import { usePhotos } from '../hooks/usePhotos'

const STACK_CARDS_META = [
  {
    roman: 'I',
    title: 'O ENCONTRO',
    location: 'SÃO PAULO · 2024',
  },
  {
    roman: 'II',
    title: 'O CAMINHO',
    location: 'REGISTROS',
  },
  {
    roman: 'III',
    title: 'A PROMESSA',
    location: 'MEMÓRIA DE AFETO',
  },
  {
    roman: 'IV',
    title: 'O CUIDADO',
    location: 'DIÁRIO DE BORDO',
  },
  {
    roman: 'V',
    title: 'CÚMPLICES NO TEMPO',
    location: 'BROOKLIN · SP',
  },
  {
    roman: 'VI',
    title: 'A CERTEZA',
    location: 'ALMANAQUE',
  },
  {
    roman: 'VII',
    title: 'O ABRAÇO',
    location: 'SÃO PAULO',
  },
  {
    roman: 'VIII',
    title: 'O SORRISO',
    location: 'MEMÓRIAS DE AFETO',
  },
  {
    roman: 'IX',
    title: 'DESTEMIDO AFETO',
    location: 'SANTOS · SP',
  },
  {
    roman: 'X',
    title: 'EM HARMONIA',
    location: 'REGISTROS',
  },
  {
    roman: 'XI',
    title: 'LUMINESCÊNCIA',
    location: 'DIÁRIO DE BORDO',
  },
  {
    roman: 'XII',
    title: 'CÚMPLICES',
    location: 'ALMANAQUE',
  },
  {
    roman: 'XIII',
    title: 'O HORIZONTE',
    location: 'SÃO PAULO',
  },
  {
    roman: 'XIV',
    title: 'A CELEBRAÇÃO',
    location: 'AFETO & FÉ',
  },
  {
    roman: 'XV',
    title: 'PARA SEMPRE',
    location: 'MARCOS & GRAZI',
  },
]

export default function EditorialGallery() {
  const allPhotos = usePhotos()

  // Exclui a foto /photos/1 para não repetir o Hero principal
  const filteredPhotos = allPhotos.filter(
    (src) => !src.endsWith('/1.jpeg') && !src.endsWith('/1.png') && !src.endsWith('/1.jpg')
  )

  const photosToDisplay =
    filteredPhotos.length > 0
      ? filteredPhotos
      : [
          '/photos/2.jpeg',
          '/photos/3.jpeg',
          '/photos/4.jpeg',
          '/photos/5.jpeg',
          '/photos/6.jpeg',
          '/photos/7.jpeg',
          '/photos/8.jpeg',
          '/photos/9.jpeg',
          '/photos/10.jpeg',
          '/photos/11.jpeg',
          '/photos/12.jpeg',
          '/photos/13.jpeg',
          '/photos/14.jpeg',
          '/photos/15.jpeg',
          '/photos/16.jpeg',
        ]

  return (
    <section className="editorial-gallery" aria-label="Galeria de Registros">
      {/* Overlay de textura contínua de papel de algodão */}
      <div className="editorial-paper-overlay" aria-hidden="true" />

      <div className="editorial-container">
        {/* Cabeçalho Poético Refinado */}
        <header className="editorial-header">
          <p className="editorial-eyebrow">FRAGMENTOS &amp; MEMÓRIAS</p>
          <h2 className="editorial-title">Registros de Afeto</h2>
          <div className="editorial-divider" aria-hidden="true">
            <span className="editorial-divider-line" />
            <span className="editorial-divider-dot">♦</span>
            <span className="editorial-divider-line" />
          </div>
        </header>

        {/* Trilho de Empilhamento Sticky Card Stack */}
        <div className="photo-stack-container">
          {photosToDisplay.map((src, idx) => {
            const meta = STACK_CARDS_META[idx % STACK_CARDS_META.length]
            const photoNum = idx + 2

            return (
              <article
                key={src}
                className="photo-stack-card"
                style={{ zIndex: idx + 1 }}
              >
                <div className="photo-stack-passepartout">
                  <div className={`photo-stack-img-wrapper ${idx === 0 ? 'is-landscape' : ''}`}>
                    <img
                      src={src}
                      alt={`Marcos e Grazi — Retrato ${photoNum}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="photo-stack-img"
                    />
                  </div>
                  <figcaption className="photo-stack-caption">
                    <span className="photo-stack-roman">
                      {meta.roman} · {meta.title}
                    </span>
                    <span className="photo-stack-location">{meta.location}</span>
                  </figcaption>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

