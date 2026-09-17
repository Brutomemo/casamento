import { useState, useEffect, useMemo } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function AdminRsvpPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('admin_authenticated') === 'true'
  )
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')

  const [loading, setLoading] = useState(true)
  const [rsvps, setRsvps] = useState([])
  const [fetchError, setFetchError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all', 'confirmed', 'declined'

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'marcosgrazi2026'

  // Buscar dados quando autenticado
  const fetchRsvps = async () => {
    setLoading(true)
    setFetchError(null)

    if (!isSupabaseConfigured()) {
      setFetchError('O Supabase não está configurado no ambiente (chaves VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não encontradas).')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar RSVPs no Supabase:', error)
        setFetchError(
          `Erro ao consultar dados (${error.code || 'RLS'}): ${error.message}. ` +
          'Se for um erro de permissão RLS, garanta que a política SELECT esteja ativa no Supabase.'
        )
      } else {
        setRsvps(data || [])
      }
    } catch (err) {
      console.error('Exceção ao buscar RSVPs:', err)
      setFetchError('Ocorreu uma falha inesperada de conexão ao consultar as confirmações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchRsvps()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    setAuthError('')
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
      setPasswordInput('')
    } else {
      setAuthError('Senha incorreta. Por favor, tente novamente.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
  }

  // Filtragem dos dados
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      // Filtro de Status
      if (statusFilter === 'confirmed' && !item.confirmado) return false
      if (statusFilter === 'declined' && item.confirmado) return false

      // Filtro de Busca por Texto
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim()
        const nome = (item.nome_completo || '').toLowerCase()
        const acomp = (item.nomes_acompanhantes || '').toLowerCase()
        const fone = (item.telefone || '').toLowerCase()
        const msg = (item.mensagem || '').toLowerCase()
        return (
          nome.includes(query) ||
          acomp.includes(query) ||
          fone.includes(query) ||
          msg.includes(query)
        )
      }

      return true
    })
  }, [rsvps, statusFilter, searchTerm])

  // Métricas
  const metrics = useMemo(() => {
    let totalConfirmados = 0
    let totalAdultos = 0
    let totalCriancas = 0
    let totalRecusas = 0

    rsvps.forEach((item) => {
      if (item.confirmado) {
        totalConfirmados += 1
        totalAdultos += Number(item.qtd_adultos || 1)
        totalCriancas += Number(item.qtd_criancas || 0)
      } else {
        totalRecusas += 1
      }
    })

    return {
      totalRegistros: rsvps.length,
      totalConfirmados,
      totalAdultos,
      totalCriancas,
      totalRecusas,
      totalPessoas: totalAdultos + totalCriancas,
    }
  }, [rsvps])

  // Formatação de link de WhatsApp
  const formatWhatsappLink = (phoneStr) => {
    if (!phoneStr) return null
    const cleaned = phoneStr.replace(/\D/g, '')
    if (!cleaned) return null
    // Se não tiver DDI 55 e tiver 10 ou 11 dígitos, adiciona 55
    const fullPhone = cleaned.length <= 11 && !cleaned.startsWith('55') ? `55${cleaned}` : cleaned
    return `https://wa.me/${fullPhone}`
  }

  // Exportar para CSV
  const handleExportCSV = () => {
    if (rsvps.length === 0) return

    const headers = [
      'Data e Hora',
      'Nome Completo',
      'Telefone',
      'Status',
      'Qtd Adultos',
      'Qtd Criancas',
      'Acompanhantes',
      'Mensagem',
    ]

    const rows = filteredRsvps.map((item) => {
      const dataStr = item.created_at
        ? new Date(item.created_at).toLocaleString('pt-BR')
        : ''
      const statusStr = item.confirmado ? 'Confirmado' : 'Recusado'
      const nome = `"${(item.nome_completo || '').replace(/"/g, '""')}"`
      const fone = `"${(item.telefone || '').replace(/"/g, '""')}"`
      const acomp = `"${(item.nomes_acompanhantes || '').replace(/"/g, '""')}"`
      const msg = `"${(item.mensagem || '').replace(/"/g, '""')}"`

      return [
        `"${dataStr}"`,
        nome,
        fone,
        `"${statusStr}"`,
        item.confirmado ? item.qtd_adultos || 1 : 0,
        item.confirmado ? item.qtd_criancas || 0 : 0,
        acomp,
        msg,
      ].join(';')
    })

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `confirmacoes_casamento_marcos_e_graziela.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 1. Tela de Login / Bloqueio
  if (!isAuthenticated) {
    return (
      <div className="admin-page admin-login-wrapper">
        <div className="admin-login-card">
          <span className="admin-monogram">M &amp; G</span>
          <h1 className="admin-login-title">Área dos Noivos</h1>
          <p className="admin-login-subtitle">
            Digite a senha de acesso para visualizar e gerenciar a lista de confirmações.
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="admin-password">Senha de Acesso</label>
              <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
              />
            </div>

            {authError && <div className="admin-error-badge">{authError}</div>}

            <button type="submit" className="admin-btn-primary">
              Entrar no Painel ✦
            </button>
          </form>

          <a href="/" className="admin-back-link">
            ← Voltar para o convite
          </a>
        </div>
      </div>
    )
  }

  // 2. Tela Principal do Painel
  return (
    <div className="admin-page">
      {/* Topo / Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-brand">
            <span className="admin-brand-icon">✦</span>
            <div>
              <h1 className="admin-title">Gestão de Presenças</h1>
              <p className="admin-subtitle">Marcos &amp; Graziela • 29.11.2026</p>
            </div>
          </div>

          <div className="admin-actions">
            <button
              onClick={fetchRsvps}
              className="admin-btn-outline"
              title="Atualizar dados"
            >
              🔄 Atualizar
            </button>
            <a href="/" className="admin-btn-outline">
              ← Ver Convite
            </a>
            <button onClick={handleLogout} className="admin-btn-ghost">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        {/* Mensagem de Erro Supabase */}
        {fetchError && (
          <div className="admin-alert-banner">
            <div className="admin-alert-title">⚠️ Erro ao carregar dados do Supabase</div>
            <p className="admin-alert-desc">{fetchError}</p>
            <div className="admin-alert-hint">
              <strong>Solução para o Supabase:</strong> Execute a linha SQL abaixo no Editor do Supabase para autorizar o acesso de leitura:
              <code className="admin-code-block">
                CREATE POLICY &quot;Permitir SELECT publico&quot; ON public.rsvp FOR SELECT USING (true);
              </code>
            </div>
          </div>
        )}

        {/* Métricas / Cards */}
        <section className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-label">Total de Respostas</div>
            <div className="admin-metric-value">{metrics.totalRegistros}</div>
            <div className="admin-metric-detail">Formulários enviados</div>
          </div>

          <div className="admin-metric-card highlight-green">
            <div className="admin-metric-label">Total de Pessoas Confirmadas</div>
            <div className="admin-metric-value">{metrics.totalPessoas}</div>
            <div className="admin-metric-detail">
              {metrics.totalAdultos} adultos · {metrics.totalCriancas} crianças
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-label">Adultos Confirmados</div>
            <div className="admin-metric-value">{metrics.totalAdultos}</div>
            <div className="admin-metric-detail">Para contagem de buffet</div>
          </div>

          <div className="admin-metric-card highlight-red">
            <div className="admin-metric-label">Recusas</div>
            <div className="admin-metric-value">{metrics.totalRecusas}</div>
            <div className="admin-metric-detail">Não poderão comparecer</div>
          </div>
        </section>

        {/* Barra de Filtros e Busca */}
        <section className="admin-controls-bar">
          <div className="admin-search-box">
            <span className="admin-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nome, acompanhante ou mensagem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="admin-clear-search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="admin-filter-tabs">
            <button
              className={`admin-tab ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Todos ({metrics.totalRegistros})
            </button>
            <button
              className={`admin-tab ${statusFilter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('confirmed')}
            >
              Confirmados ({metrics.totalConfirmados})
            </button>
            <button
              className={`admin-tab ${statusFilter === 'declined' ? 'active' : ''}`}
              onClick={() => setStatusFilter('declined')}
            >
              Recusados ({metrics.totalRecusas})
            </button>
          </div>

          <div className="admin-export-container">
            <button
              onClick={handleExportCSV}
              disabled={filteredRsvps.length === 0}
              className="admin-btn-export"
            >
              📥 Exportar CSV
            </button>
          </div>
        </section>

        {/* Tabela de Confirmações */}
        <section className="admin-table-wrapper">
          {loading ? (
            <div className="admin-state-container">
              <div className="admin-spinner" />
              <p>Carregando confirmações do Supabase...</p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="admin-state-container">
              <p className="admin-empty-text">
                {searchTerm || statusFilter !== 'all'
                  ? 'Nenhum convidado encontrado para os filtros selecionados.'
                  : 'Nenhuma confirmação de presença registrada até o momento.'}
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Titular</th>
                  <th>WhatsApp / Contato</th>
                  <th>Status</th>
                  <th>Adultos</th>
                  <th>Crianças</th>
                  <th>Acompanhantes</th>
                  <th>Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {filteredRsvps.map((row, idx) => {
                  const waLink = formatWhatsappLink(row.telefone)
                  const dateStr = row.created_at
                    ? new Date(row.created_at).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'

                  return (
                    <tr key={row.id || `rsvp-${idx}`}>
                      <td className="cell-date">{dateStr}</td>
                      <td className="cell-name">
                        <strong>{row.nome_completo}</strong>
                      </td>
                      <td className="cell-phone">
                        {row.telefone ? (
                          waLink ? (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-whatsapp-link"
                            >
                              <span>📱 {row.telefone}</span>
                            </a>
                          ) : (
                            <span>{row.telefone}</span>
                          )
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="cell-status">
                        {row.confirmado ? (
                          <span className="badge badge-success">✓ Confirmado</span>
                        ) : (
                          <span className="badge badge-danger">✕ Recusou</span>
                        )}
                      </td>
                      <td className="cell-number">
                        {row.confirmado ? row.qtd_adultos || 1 : '—'}
                      </td>
                      <td className="cell-number">
                        {row.confirmado ? row.qtd_criancas || 0 : '—'}
                      </td>
                      <td className="cell-companions">
                        {row.confirmado && row.nomes_acompanhantes ? (
                          <span className="text-companions">{row.nomes_acompanhantes}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="cell-message">
                        {row.mensagem ? (
                          <p className="admin-msg-bubble">&ldquo;{row.mensagem}&rdquo;</p>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  )
}
