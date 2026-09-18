import { usePhotos } from '../hooks/usePhotos'

const STACK_CARDS_META = [
  {
    roman: 'I',
    title: 'Grandes coisas fez o Senhor por nós',
    location: 'Salmos 126:3',
  },
  {
    roman: 'II',
    title: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.',
    location: '1 Coríntios 13:4',
  },
  {
    roman: 'III',
    title: 'Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.',
    location: 'Colossenses 3:14',
  },
  {
    roman: 'IV',
    title: 'Que a paz de Cristo seja o juiz em seu coração, visto que vocês foram chamados para viver em paz, como membros de um só corpo.',
    location: 'Colossenses 3:15',
  },
  {
    roman: 'V',
    title: 'Mulheres, sujeite-se cada uma a seu marido, como convém a quem está no Senhor',
    location: 'Colossenses 3:18',
  },
  {
    roman: 'VI',
    title: 'Maridos, ame cada um a sua mulher e não a tratem com amargura.',
    location: 'Colossenses 3:19',
  },
  {
    roman: 'VII',
    title: 'Habite ricamente em vocês a palavra de Cristo; ensinem e aconselhem-se uns aos outros com toda a sabedoria e cantem salmos, hinos e cânticos espirituais com gratidão a Deus em seu coração',
    location: 'Colossenses 3:16',
  },
  {
    roman: 'VIII',
    title: 'Porque sou eu que conheço os planos que tenho para vocês", diz o Senhor, "planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro"',
    location: 'Jeremias 29:11',
  },
  {
    roman: 'IX',
    title: 'Tudo o que fizerem, seja em palavra seja em ação, façam-no em nome do Senhor Jesus, dando por meio dele graças a Deus Pai',
    location: 'Colossenses 3:17',
  },
  {
    roman: 'X',
    title: 'E, quando Deus concede riquezas e bens a alguém e o capacita a desfrutá-los, a aceitar a sua sorte e a ser feliz em seu trabalho, isso é um presente de Deus',
    location: 'Eclesiastes 5:19',
  },
  {
    roman: 'XI',
    title: 'O seu falar seja sempre agradável e temperado com sal, para que saibam como responder a cada um.',
    location: 'Colossenses 4:6',
  },
  {
    roman: 'XII',
    title: 'Se eu subir aos céus, lá estás; se eu fizer a minha cama na sepultura, também lá estás. Se eu subir com as asas da alvorada e morar na extremidade do mar, mesmo ali a tua mão direita me guiará e me susterá.',
    location: 'Salmos 139:8-10',
  },
  {
    roman: 'XIII',
    title: 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem se desanime, pois o Senhor, o seu Deus, estará com você por onde você andar',
    location: 'Josué 1:9',
  },
  {
    roman: 'XIV',
    title: 'Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens,',
    location: 'Colossenses 3:23',
  },
  {
    roman: 'XV',
    title: 'Filhos, obedeçam a seus pais em tudo, pois isso agrada ao Senhor.',
    location: 'Colossenses 3:20',
  },
]

export default function EditorialGallery() {
  const allPhotos = usePhotos()

  // Exclui a foto /photos/1 para não repetir o Hero principal
  const filteredPhotos = allPhotos.filter(
    (src) => !src.endsWith('/1.webp') && !src.endsWith('/1.jpeg') && !src.endsWith('/1.png') && !src.endsWith('/1.jpg')
  )

  const photosToDisplay =
    filteredPhotos.length > 0
      ? filteredPhotos
      : [
          '/photos/2.webp',
          '/photos/3.webp',
          '/photos/4.webp',
          '/photos/5.webp',
          '/photos/6.webp',
          '/photos/7.webp',
          '/photos/8.webp',
          '/photos/9.webp',
          '/photos/10.webp',
          '/photos/11.webp',
          '/photos/12.webp',
          '/photos/13.webp',
          '/photos/14.webp',
          '/photos/15.webp',
          '/photos/16.webp',
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
            const meta = STACK_CARDS_META[idx % STACK_CARDS_META.length] || { roman: '', title: '', location: '' }
            const photoNum = idx + 2
            const isEager = idx < 2 || idx >= photosToDisplay.length - 2
            const isLandscapeOrFull = idx === 0 || meta.roman === 'XIV' || meta.roman === 'XV'

            const calculatedZIndex = (idx + 1) * 10

            return (
              <article
                key={src}
                className="photo-stack-card"
                style={{
                  zIndex: calculatedZIndex,
                  isolation: 'isolate',
                }}
              >
                <div className="photo-stack-passepartout">
                  <div className={`photo-stack-img-wrapper ${meta.roman === 'III' || meta.roman === 'XIII' ? 'is-portrait' : ''} ${idx === 0 ? 'is-landscape' : ''} ${meta.roman === 'XI' ? 'is-luminescencia' : ''} ${meta.roman === 'XIV' || meta.roman === 'XV' ? 'is-landscape-full' : ''}`}>
                    <img
                      src={src}
                      alt={`Marcos e Graziela — Retrato ${photoNum}`}
                      width={isLandscapeOrFull ? '1600' : '800'}
                      height={isLandscapeOrFull ? '1000' : '1000'}
                      loading={isEager ? 'eager' : 'lazy'}
                      decoding={isEager ? 'sync' : 'async'}
                      className="photo-stack-img"
                      style={{
                        filter: 'sepia(0.18) contrast(1.08) brightness(0.95) saturate(0.85)',
                      }}
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

