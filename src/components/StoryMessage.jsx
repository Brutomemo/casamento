import { useScrollReveal } from '../hooks/useScrollReveal'

export default function StoryMessage() {
  const containerRef = useScrollReveal()

  return (
    <section className="story-message-section" ref={containerRef}>
      <div className="story-message-container">
        <p className="story-eyebrow">No Tempo Certo</p>
        <div className="story-body">
          <p>Há encontros que nascem de propósitos.</p>
          <p>Antes de nos conhecermos, Deus já guardava as nossas orações.</p>
          <p>
            O que celebramos hoje é a certeza de que nenhum caminho se cruza por acaso
            quando é a mão d’Ele que desenha o destino.
          </p>
        </div>
        <blockquote className="story-quote">
          <p className="quote-text">
            &ldquo;Para que todos vejam, saibam, considerem e entendam que a mão do Senhor fez isso.&rdquo;
          </p>
          <cite className="quote-cite">Isaías 41:20</cite>
        </blockquote>
      </div>
    </section>
  )
}
