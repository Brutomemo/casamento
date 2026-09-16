import { useState } from 'react'
import FloralDivider from './FloralDivider'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { wedding } from '../config'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Rsvp() {
  const ref = useScrollReveal()

  const [nomeCompleto, setNomeCompleto] = useState('')
  const [telefone, setTelefone] = useState('')
  const [confirmado, setConfirmado] = useState(true)
  const [qtdAdultos, setQtdAdultos] = useState(1)
  const [qtdCriancas, setQtdCriancas] = useState(0)
  const [nomesAdultosExtras, setNomesAdultosExtras] = useState([])
  const [nomesCriancas, setNomesCriancas] = useState([])
  const [mensagem, setMensagem] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const phoneGrazi = wedding.whatsappGrazi || '5511989128745'
  const phoneMarcos = wedding.whatsappMarcos || '5511984335153'

  const msgGrazi = 'Olá Grazi! Confirmo com alegria minha presença no casamento de vocês!'
  const msgMarcos = 'Olá Marcos! Confirmo com alegria minha presença no casamento de vocês!'

  const linkGrazi = `https://wa.me/${phoneGrazi}?text=${encodeURIComponent(msgGrazi)}`
  const linkMarcos = `https://wa.me/${phoneMarcos}?text=${encodeURIComponent(msgMarcos)}`

  const handleQtdAdultosChange = (val) => {
    const num = Number(val)
    setQtdAdultos(num)
    const neededExtras = Math.max(0, num - 1)
    setNomesAdultosExtras((prev) => {
      const next = [...prev]
      if (next.length < neededExtras) {
        while (next.length < neededExtras) next.push('')
      } else {
        next.length = neededExtras
      }
      return next
    })
  }

  const handleQtdCriancasChange = (val) => {
    const num = Number(val)
    setQtdCriancas(num)
    setNomesCriancas((prev) => {
      const next = [...prev]
      if (next.length < num) {
        while (next.length < num) next.push('')
      } else {
        next.length = num
      }
      return next
    })
  }

  const handleAdultoExtraChange = (index, value) => {
    setNomesAdultosExtras((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleCriancaChange = (index, value) => {
    setNomesCriancas((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validação Titular
    const nameWords = nomeCompleto.trim().split(/\s+/).filter(Boolean)
    if (nameWords.length < 2) {
      setErrorMessage(
        'Por gentileza, informe seu nome e sobrenome completos conforme documento para a lista da portaria (não utilizar apenas o primeiro nome ou apelidos).',
      )
      return
    }

    // Validação Acompanhantes se confirmou presença
    if (confirmado) {
      for (let i = 0; i < nomesAdultosExtras.length; i++) {
        const extraName = (nomesAdultosExtras[i] || '').trim()
        const extraWords = extraName.split(/\s+/).filter(Boolean)
        if (extraWords.length < 2) {
          setErrorMessage(
            `Por gentileza, informe o nome e sobrenome completos do ${i + 2}º adulto para a portaria.`,
          )
          return
        }
      }

      for (let i = 0; i < nomesCriancas.length; i++) {
        const childName = (nomesCriancas[i] || '').trim()
        if (!childName) {
          setErrorMessage(
            `Por gentileza, informe o nome completo da ${i + 1}ª criança para a portaria.`,
          )
          return
        }
      }
    }

    setSubmitting(true)

    try {
      let nomesAcompanhantesString = ''
      const listaAcompanhantes = []

      if (confirmado) {
        if (nomesAdultosExtras.length > 0) {
          const adultosStr = nomesAdultosExtras
            .map((s) => s.trim())
            .filter(Boolean)
            .join(', ')
          if (adultosStr) {
            listaAcompanhantes.push(`Adultos extras: ${adultosStr}`)
          }
        }
        if (nomesCriancas.length > 0) {
          const criancasStr = nomesCriancas
            .map((s) => s.trim())
            .filter(Boolean)
            .join(', ')
          if (criancasStr) {
            listaAcompanhantes.push(`Crianças: ${criancasStr}`)
          }
        }
      }

      nomesAcompanhantesString = listaAcompanhantes.join(' | ')

      const payload = {
        nome_completo: nomeCompleto.trim(),
        telefone: telefone.trim(),
        confirmado,
        qtd_adultos: confirmado ? Number(qtdAdultos) : 0,
        qtd_criancas: confirmado ? Number(qtdCriancas) : 0,
        nomes_acompanhantes: confirmado ? nomesAcompanhantesString : '',
        mensagem: mensagem.trim(),
      }

      if (isSupabaseConfigured()) {
        const { error } = await supabase
          .schema('casamento')
          .from('rsvp')
          .insert([payload])
          .select()

        if (error) {
          console.error('Erro detalhado retornado pelo Supabase:', error)
          setErrorMessage(
            `Falha no envio ao banco de dados: ${error.message || 'Erro de conexão com o Supabase'}`,
          )
          setSubmitting(false)
          return
        }
      } else {
        console.warn('Supabase não configurado. Exibindo simulador local.')
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      // Apenas com sucesso confirmado do banco de dados:
      setSubmitted(true)
    } catch (err) {
      console.error('Erro de execução no envio do RSVP:', err)
      setErrorMessage(
        'Não foi possível registrar via formulário neste momento. Por gentileza, tente novamente ou confirme diretamente por WhatsApp abaixo.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setNomeCompleto('')
    setTelefone('')
    setConfirmado(true)
    setQtdAdultos(1)
    setQtdCriancas(0)
    setNomesAdultosExtras([])
    setNomesCriancas([])
    setMensagem('')
    setErrorMessage(null)
  }

  return (
    <section className="rsvp" ref={ref} aria-label="Confirmação de Presença">
      {/* Overlay de textura de papel de algodão contínuo */}
      <div className="rsvp-paper-overlay" aria-hidden="true" />

      <div className="rsvp-container">
        {/* Imagem do Buquê no topo da dobra de RSVP */}
        <img
          src="/assets/buque.png"
          alt="Buquê Floral"
          className="rsvp-bouquet-img"
          loading="lazy"
          decoding="async"
        />

        <span className="rsvp-eyebrow"></span>

        <h2 className="rsvp-title">Confirme sua Presença</h2>

        <FloralDivider />

        <p className="rsvp-deadline">
          POR GENTILEZA, CONFIRME ATÉ 01 DE NOVEMBRO DE 2026
        </p>

        {/* Nota Oficial de Acesso para Portaria */}
        <div className="rsvp-access-notice">
          <p>
            <strong>Importante para o acesso:</strong> Por motivos de organização e segurança, a entrada no evento será autorizada exclusivamente mediante conferência nominal na portaria. Solicitamos a gentileza de informar o <strong>nome completo</strong> (sem abreviações ou apelidos) do titular e de todos os acompanhantes.
          </p>
        </div>

        {submitted ? (
          <div className="rsvp-success-card">
            <div className="rsvp-success-icon">✦</div>
            <h3 className="rsvp-success-title">Presença Registrada!</h3>
            <p className="rsvp-success-message">
              {confirmado
                ? 'Sua presença foi confirmada com muito carinho. Estamos radiantes em compartilhar esse momento inesquecível com você!'
                : 'Agradecemos o seu carinho e mensagem. Sentiremos a sua falta nessa celebração!'}
            </p>
            <button
              type="button"
              className="rsvp-btn-reset"
              onClick={handleReset}
            >
              ENVIAR OUTRA RESPOSTA
            </button>
          </div>
        ) : (
          <form className="rsvp-form-editorial" onSubmit={handleSubmit}>
            {/* Opção Sim / Não */}
            <div className="rsvp-radio-group">
              <label
                className={`rsvp-radio-card ${confirmado ? 'is-active' : ''}`}
              >
                <input
                  type="radio"
                  name="confirmado"
                  checked={confirmado === true}
                  onChange={() => setConfirmado(true)}
                />
                <span className="rsvp-radio-title">Sim, com certeza irei! ✨</span>
              </label>

              <label
                className={`rsvp-radio-card ${!confirmado ? 'is-active' : ''}`}
              >
                <input
                  type="radio"
                  name="confirmado"
                  checked={confirmado === false}
                  onChange={() => setConfirmado(false)}
                />
                <span className="rsvp-radio-title">
                  Infelizmente não poderei ir 🤍
                </span>
              </label>
            </div>

            {/* Nome Completo do Titular */}
            <div className="rsvp-field">
              <label htmlFor="rsvp-nome" className="rsvp-label">
                NOME COMPLETO (CONFORME RG / DOCUMENTO) *
              </label>
              <input
                id="rsvp-nome"
                type="text"
                className="rsvp-input"
                placeholder="Nome e sobrenome completos (não utilizar apelidos)"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                required
              />
            </div>

            {/* Telefone / WhatsApp */}
            <div className="rsvp-field">
              <label htmlFor="rsvp-telefone" className="rsvp-label">
                WHATSAPP / TELEFONE
              </label>
              <input
                id="rsvp-telefone"
                type="tel"
                className="rsvp-input"
                placeholder="(11) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            {/* Quantidades e Campos Dinâmicos de Acompanhantes (Se confirmou presença) */}
            {confirmado && (
              <>
                <div className="rsvp-field-row">
                  <div className="rsvp-field">
                    <label htmlFor="rsvp-adultos" className="rsvp-label">
                      ADULTOS
                    </label>
                    <select
                      id="rsvp-adultos"
                      className="rsvp-select"
                      value={qtdAdultos}
                      onChange={(e) => handleQtdAdultosChange(e.target.value)}
                    >
                      <option value={1}>1 Adulto (apenas o titular)</option>
                      <option value={2}>2 Adultos</option>
                      <option value={3}>3 Adultos</option>
                    </select>
                  </div>

                  <div className="rsvp-field">
                    <label htmlFor="rsvp-criancas" className="rsvp-label">
                      CRIANÇAS
                    </label>
                    <select
                      id="rsvp-criancas"
                      className="rsvp-select"
                      value={qtdCriancas}
                      onChange={(e) => handleQtdCriancasChange(e.target.value)}
                    >
                      <option value={0}>0 Crianças</option>
                      <option value={1}>1 Criança</option>
                      <option value={2}>2 Crianças</option>
                      <option value={3}>3 Crianças</option>
                    </select>
                  </div>
                </div>

                {/* Renderização Dinâmica de Adultos Extras */}
                {nomesAdultosExtras.map((nome, index) => (
                  <div className="rsvp-field" key={`adulto-extra-${index}`}>
                    <label
                      htmlFor={`rsvp-adulto-extra-${index}`}
                      className="rsvp-label"
                    >
                      NOME COMPLETO DO {index + 2}º ADULTO *
                    </label>
                    <input
                      id={`rsvp-adulto-extra-${index}`}
                      type="text"
                      className="rsvp-input"
                      placeholder="Nome e sobrenome para a lista da portaria"
                      value={nome}
                      onChange={(e) =>
                        handleAdultoExtraChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}

                {/* Renderização Dinâmica de Crianças */}
                {nomesCriancas.map((nome, index) => (
                  <div className="rsvp-field" key={`crianca-${index}`}>
                    <label
                      htmlFor={`rsvp-crianca-${index}`}
                      className="rsvp-label"
                    >
                      NOME COMPLETO DA {index + 1}ª CRIANÇA *
                    </label>
                    <input
                      id={`rsvp-crianca-${index}`}
                      type="text"
                      className="rsvp-input"
                      placeholder="Nome e sobrenome para a lista da portaria"
                      value={nome}
                      onChange={(e) =>
                        handleCriancaChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
              </>
            )}

            {/* Mensagem / Recado */}
            <div className="rsvp-field">
              <label htmlFor="rsvp-mensagem" className="rsvp-label">
                RECADO / MENSAGEM PARA OS NOIVOS
              </label>
              <textarea
                id="rsvp-mensagem"
                className="rsvp-textarea"
                rows="3"
                placeholder="Deixe uma mensagem especial para nós..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </div>

            {/* Mensagem de Erro */}
            {errorMessage && (
              <p className="rsvp-error-msg" role="alert">
                {errorMessage}
              </p>
            )}

            {/* Botão de Envio */}
            <button
              type="submit"
              className="rsvp-submit-btn"
              disabled={submitting}
            >
              {submitting ? 'ENVIANDO CONFIRMAÇÃO...' : 'ENVIAR CONFIRMAÇÃO ✦'}
            </button>
          </form>
        )}

        {/* Separador e Opções Alternativas de WhatsApp */}
        <div className="rsvp-whatsapp-header">
          <span className="rsvp-whatsapp-title">OU CONFIRME DIRETAMENTE VIA WHATSAPP</span>
        </div>

        <div className="rsvp-actions-grid">
          <a
            className="rsvp-cta-ghost"
            href={linkGrazi}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Confirmar presença com a Grazi via WhatsApp"
          >
            FALAR COM A GRAZI ↗
          </a>
          <a
            className="rsvp-cta-ghost"
            href={linkMarcos}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Confirmar presença com o Marcos via WhatsApp"
          >
            FALAR COM O MARCOS ↗
          </a>
        </div>

        {/* Imagem Flores Brancas no final da dobra de RSVP */}
        <img
          src="/assets/flores-brancas.png"
          alt=""
          className="rsvp-flores-brancas-bottom"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
