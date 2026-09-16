import WaxSeal from './WaxSeal'
import { wedding } from '../config'

export default function EnvelopeHero({ phase, onOpen }) {
  const opening = phase === 'opening' || phase === 'bloom'

  return (
    <section
      className={`envelope-hero${opening ? ' is-opening' : ''}${phase === 'bloom' ? ' is-bloom' : ''}`}
      aria-label="Convite de Casamento de Marcos e Grazi"
    >
      {/* Background textura rica com bg.jpg */}
      <div className="hero-bg-texture" aria-hidden="true" />

      {/* Camada de seda fluida com movimento sutil */}
      <div className="hero-silk" aria-hidden="true" />

      {/* Florais decorativos fixos nos cantos */}
      <img
        className="hero-floral hero-floral-top"
        src="/assets/flores.webp"
        alt=""
        aria-hidden="true"
        width="320"
        height="320"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <img
        className="hero-floral hero-floral-bottom"
        src="/assets/flores.webp"
        alt=""
        aria-hidden="true"
        width="320"
        height="320"
        loading="lazy"
        decoding="async"
        draggable="false"
      />

      {/* Camada de névoa de contraste superior (abaixo do texto, acima da imagem) */}
      <div className="top-fog-overlay" aria-hidden="true" />

      {/* Nomes e Data em tipografia editorial premium */}
      <header className="hero-opening-header">
        <p className="opening-eyebrow">Convite de Casamento</p>
        <h1 className="opening-couple-names">
          <span>{wedding.groom}</span>
          <span className="opening-amp">&</span>
          <span>{wedding.bride}</span>
        </h1>
        <p className="opening-date">29 · 11 · 2026</p>
      </header>

      <div className="invite-card">
        <div className="envelope-scene">
          <div className="envelope-bg-picture" aria-hidden="true">
            <picture>
              <source media="(max-width: 768px)" srcSet="/assets/envelope-mobile.webp" />
              <img
                className="envelope-bg-img"
                src="/assets/envelope.webp"
                alt="Envelope físico do convite de casamento"
                width="4016"
                height="5622"
                draggable="false"
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>

          {/* Camada de textura orgânica de papel e luz natural difusa (Overlay) */}
          <div className="paper-texture-overlay" aria-hidden="true" />

          {/* Overlay esfumaçado com transparência nas bordas */}
          <div className="envelope-fog-overlay" aria-hidden="true" />

          <div className="envelope-inner-light" aria-hidden="true" />

          {/* Lacre de cera (WaxSeal) posicionado sobre o bico do envelope */}
          <WaxSeal onClick={onOpen} disabled={opening} />
        </div>
      </div>

      {/* Indicação discreta e elegante de interação */}
      <div className={`envelope-hint${opening ? ' is-open' : ''}`}>
        <span>toque no selo para abrir</span>
      </div>
    </section>
  )
}
