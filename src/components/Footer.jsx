export default function Footer() {
  return (
    <footer className="footer" aria-label="Rodapé do Convite">
      {/* Overlay de textura de papel de algodão */}
      <div className="footer-paper-overlay" aria-hidden="true" />

      <div className="footer-content">
        {/* Selo de Cera Oficial */}
        <img
          src="/assets/selo.webp"
          alt="Selo de Cera Marcos &amp; Graziela"
          width="85"
          height="85"
          className="footer-seal"
          loading="lazy"
          decoding="async"
        />

        {/* Nomes por Extenso */}
        <h3 className="footer-names">Marcos &amp; Graziela</h3>

        {/* Imagem Editorial de Alianças */}
        <div className="footer-rings-wrapper">
          <img
            src="/assets/alianca.svg"
            alt="Alianças de Casamento"
            width="44"
            height="44"
            className="footer-rings-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Separador Analógico com micro-losango */}
        <div className="footer-divider" aria-hidden="true">
          <span className="footer-divider-line" />
          <span className="footer-divider-dot">◆</span>
          <span className="footer-divider-line" />
        </div>

        {/* Data & Local em Microtipografia */}
        <p className="footer-date">29 DE NOVEMBRO DE 2026 · SÃO PAULO</p>

        {/* Assinatura Afetiva Editorial */}
        <p className="footer-signature">Com todo o nosso carinho</p>

        {/* Acesso aos Noivos */}
        <div className="footer-admin-entry">
          <a href="/gestao" className="admin-access-link" title="Área dos Noivos">
            Área dos Noivos ✦
          </a>
        </div>
      </div>
    </footer>
  )
}

