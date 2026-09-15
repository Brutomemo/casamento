import WaxSeal from './WaxSeal'

export default function EnvelopeHero({ phase, onOpen }) {
  const opening = phase === 'opening' || phase === 'bloom'

  return (
    <section
      className={`envelope-hero${opening ? ' is-opening' : ''}${phase === 'bloom' ? ' is-bloom' : ''}`}
    >
      {/* Background textura rica usando bg.jpg */}
      <div className="hero-bg-texture" aria-hidden="true" />

      {/* Florais decorativos combinados de forma sofisticada com flores.png */}
      <img
        className="hero-floral hero-floral-top"
        src="/assets/flores.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable="false"
      />
      <img
        className="hero-floral hero-floral-bottom"
        src="/assets/flores.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable="false"
      />

      <div className="invite-card">
        <div className="invite-grain" aria-hidden="true" />

        <div className="envelope-scene">
          <picture className="envelope-bg-picture" aria-hidden="true">
            <source media="(max-width: 639px)" srcSet="/assets/envelope-mobile.jpg" />
            <img
              className="envelope-bg-img"
              src="/assets/envelope.jpg"
              alt=""
              draggable="false"
              decoding="async"
            />
          </picture>

          <div className="envelope-inner-light" aria-hidden="true" />

          {/* Lacre de cera (WaxSeal) posicionado sobre o bico do envelope */}
          <WaxSeal onClick={onOpen} disabled={opening} />
        </div>

        <p className="eyebrow invite-label">Convite digital</p>
        <p className={`envelope-hint${opening ? ' is-open' : ''}`}>
          {opening ? '' : 'toque no selo para abrir'}
        </p>
      </div>
    </section>
  )
}
