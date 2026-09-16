import { useState, useEffect } from 'react'
import { wedding } from '../config'

const GIFTS_CATALOG = [
  {
    id: 'noite-cinema-pipoca',
    category: 'ENCONTROS & BRINDES',
    title: 'Noite de Pipoca & Cinema em Casa',
    value: 'R$ 80,00',
    price: 'R$ 80,00',
    description: 'Para nossas maratonas de filmes no sofá, com pipoca quentinha e muito aconchego a dois.',
    image: '/gifts/cinema-pipoca.jpg',
    featured: false,
  },
  {
    id: 'moedor-graos-cafe',
    category: 'NOSSO LAR',
    title: 'Moedor de Grãos de Café',
    value: 'R$ 56,00',
    price: 'R$ 56,00',
    description: 'Para moer os grãos na hora e completar nossa rotina de café fresco com a PrimaLatte.',
    image: '/gifts/moedor-cafe.jpg',
    featured: false,
  },
  {
    id: 'cafeteira-primalatte',
    category: 'NOSSO LAR',
    title: 'Aparelho de Café Espresso & Grãos',
    value: 'R$ 809,90',
    price: 'R$ 809,90',
    description: 'Para começarmos nossas manhãs com aroma de café fresco e conversas à mesa.',
    image: '/gifts/cafeteira-primalatte.jpg',
    featured: false,
  },

  {
    id: 'cafe-manha-cama',
    category: 'NOSSO LAR',
    title: 'Café da Manhã Especial na Cama',
    value: 'R$ 100,00',
    price: 'R$ 100,00',
    description: 'Para começar os sábados com waffles quentinhos, frutas frescas e muito carinho.',
    image: '/gifts/cafe-manha.jpg',
    featured: false,
  },
  {
    id: 'cota-cruzeiro-msc-virtuosa',
    category: 'LUA DE MEL',
    title: 'Cota do Cruzeiro MSC Virtuosa 2026',
    value: 'R$ 500,00',
    price: 'R$ 500,00',
    description: 'Uma contribuição especial para navegarmos juntos em alto-mar, celebrando nossos primeiros dias de casados.',
    image: '/gifts/msc-virtuosa.jpg',
    featured: true,
  },
  {
    id: 'jantar-terraco-italia',
    category: 'ENCONTROS & BRINDES',
    title: 'Cota de Jantar Romântico a Dois',
    value: 'R$ 200,00',
    price: 'R$ 200,00',
    description: 'Uma noite inesquecível para brindarmos ao amor com vista panorâmica da cidade no Terraço Itália.',
    image: '/gifts/terraco-italia.jpg',
    featured: false,
  },
  {
    id: 'garrafa-vinho-comemorativa',
    category: 'ENCONTROS & BRINDES',
    title: 'Garrafa de Vinho Comemorativa',
    value: 'R$ 160,00',
    price: 'R$ 160,00',
    description: 'Um rótulo especial reservado para brindarmos a uma data marcante da nossa nova história.',
    image: '/gifts/vinho-comemorativo.jpg',
    featured: false,
  },
  {
    id: 'diaria-hotel-lua-de-mel',
    category: 'LUA DE MEL',
    title: 'Diária de Hotel na Lua de Mel',
    value: 'R$ 450,00',
    price: 'R$ 450,00',
    description: 'Um dia inesquecível de descanso, conforto e momentos a dois com vista inspiradora para o mar.',
    image: '/gifts/hotel-lua-de-mel.jpg',
    featured: true,
  },
  {
    id: 'passeio-praia-familia',
    category: 'LUA DE MEL',
    title: 'Cota de Passeio na Praia com a Família',
    value: 'R$ 300,00',
    price: 'R$ 300,00',
    description: 'Momentos especiais de descanso e sol à beira-mar compartilhando sorrisos com quem amamos.',
    image: '/gifts/passeio-praia.jpg',
    featured: false,
  },
]

export default function GiftsPage() {
  const [selectedGift, setSelectedGift] = useState(null)
  const [copiedGrazi, setCopiedGrazi] = useState(false)
  const [copiedMarcos, setCopiedMarcos] = useState(false)

  const pixGrazi = wedding.pixGrazi || '11989128745'
  const pixMarcos = wedding.pixMarcos || '11984335153'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleCopy = (key, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key).then(() => {
        if (type === 'grazi') {
          setCopiedGrazi(true)
          setTimeout(() => setCopiedGrazi(false), 3000)
        } else {
          setCopiedMarcos(true)
          setTimeout(() => setCopiedMarcos(false), 3000)
        }
      })
    }
  }

  const getWhatsappGiftUrl = (gift) => {
    const text = `Olá Marcos & Grazi! Escolhi o vale "${gift.title}" (${gift.price || gift.value}) para presentear vocês com muito carinho!`
    return `https://wa.me/${wedding.whatsapp}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="gifts-page-root">
      {/* Overlay de textura de papel de algodão */}
      <div className="gifts-paper-overlay" aria-hidden="true" />

      {/* Adorno floral lateral esquerdo */}
      <img
        src="/assets/floral-vine-left.png"
        alt=""
        className="gifts-vine-left-img"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <div className="gifts-page-container">
        {/* Navegação de Retorno */}
        <nav className="gifts-nav-top">
          <a href="/#presentes" className="gifts-back-link">
            ← VOLTAR AO CONVITE
          </a>
        </nav>

        {/* Cabeçalho Editorial */}
        <header className="gifts-page-header">
          <div className="gifts-seal-wrapper">
            <img
              src="/assets/selo.png"
              alt="Selo de Cera M&amp;G"
              className="gifts-seal-img"
              loading="eager"
            />
          </div>
          <p className="gifts-eyebrow">NOSSA LISTA DE DESEJOS</p>
          <h1 className="gifts-page-title">Sugestões de Vales &amp; Experiências</h1>
          <p className="gifts-page-subtitle">
            Cada vale representa uma memória ou experiência afetiva que você nos ajuda a realizar.
            Escolha o gesto que mais combina com o seu carinho por nós.
          </p>
          <div className="gifts-divider" aria-hidden="true">
            <span className="gifts-divider-line" />
            <span className="gifts-divider-dot">♦</span>
            <span className="gifts-divider-line" />
          </div>
        </header>

        {/* Grid Editorial Alternado de Vales */}
        <div className="gifts-catalog-grid">
          {GIFTS_CATALOG.map((item) => (
            <article
              key={item.id}
              className={`gift-card-item ${item.featured ? 'gift-card-featured' : ''}`}
            >
              {item.image && (
                <div className="gift-card-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gift-card-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement
                      if (parent) parent.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="gift-card-body">
                <div className="gift-card-header">
                  <span className="gift-card-category">{item.category}</span>
                  <span className="gift-card-price">{item.price || item.value}</span>
                </div>
                <h3 className="gift-card-title">{item.title}</h3>
                <p className="gift-card-desc">{item.description}</p>
                <button
                  type="button"
                  className="gift-card-action"
                  onClick={() => setSelectedGift(item)}
                >
                  PRESENTEAR ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal / Drawer Editorial de Presentear */}
      {selectedGift && (
        <div className="gift-modal-backdrop" onClick={() => setSelectedGift(null)}>
          <div className="gift-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gift-modal-close"
              onClick={() => setSelectedGift(null)}
              aria-label="Fechar"
            >
              ✕
            </button>

            {selectedGift.image && (
              <div className="gift-modal-img-wrapper">
                <img
                  src={selectedGift.image}
                  alt={selectedGift.title}
                  className="gift-modal-img"
                  loading="lazy"
                />
              </div>
            )}

            <span className="gift-card-category">{selectedGift.category}</span>
            <h3 className="gift-modal-title">{selectedGift.title}</h3>
            <p className="gift-modal-value">{selectedGift.price || selectedGift.value}</p>
            <p className="gift-modal-desc">{selectedGift.description}</p>

            <div className="gifts-divider" aria-hidden="true">
              <span className="gifts-divider-line" />
              <span className="gifts-divider-dot">♦</span>
              <span className="gifts-divider-line" />
            </div>

            <p className="gift-modal-instruction">
              Para presentear com este vale, utilize qualquer uma das chaves Pix abaixo e nos avise
              pelo WhatsApp:
            </p>

            <div className="gift-modal-pix-grid">
              {/* Pix Noiva */}
              <div className="gift-modal-pix-box">
                <span className="gift-modal-pix-tag">PIX DA NOIVA · GRAZI</span>
                <span className="gift-modal-pix-key">{pixGrazi}</span>
                <button
                  type="button"
                  className="gifts-copy-action"
                  onClick={() => handleCopy(pixGrazi, 'grazi')}
                >
                  {copiedGrazi ? 'CHAVE COPIADA ✓' : 'COPIAR CHAVE ⎘'}
                </button>
              </div>

              {/* Pix Noivo */}
              <div className="gift-modal-pix-box">
                <span className="gift-modal-pix-tag">PIX DO NOIVO · MARCOS</span>
                <span className="gift-modal-pix-key">{pixMarcos}</span>
                <button
                  type="button"
                  className="gifts-copy-action"
                  onClick={() => handleCopy(pixMarcos, 'marcos')}
                >
                  {copiedMarcos ? 'CHAVE COPIADA ✓' : 'COPIAR CHAVE ⎘'}
                </button>
              </div>
            </div>

            {/* Ação WhatsApp */}
            <div className="gift-modal-footer">
              <a
                href={getWhatsappGiftUrl(selectedGift)}
                target="_blank"
                rel="noopener noreferrer"
                className="gift-whatsapp-btn"
              >
                ENVIAR RECADO &amp; COMPROVANTE PELO WHATSAPP 💬
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
