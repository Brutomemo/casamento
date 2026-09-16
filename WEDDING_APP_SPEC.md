# WEDDING APP SPECIFICATION

## Versão 1.0

## 1. OBJETIVO

Criar um aplicativo web de convite de casamento, mobile-first, responsivo e instalável como PWA quando tecnicamente conveniente.

O aplicativo deve combinar:

* experiência visual premium
* narrativa do casal
* informações do casamento
* confirmação de presença
* gerenciamento de convidados
* lista/sugestões de presentes
* localização
* galeria
* contagem regressiva

---

# 2. EXPERIÊNCIA DO USUÁRIO

Fluxo principal:

OPENING
↓
ABRIR CONVITE
↓
HERO
↓
NOSSA HISTÓRIA
↓
O CASAMENTO
↓
LOCAL
↓
PRESENTES
↓
GALERIA
↓
RSVP

O usuário deve conseguir acessar qualquer informação importante sem precisar assistir a uma animação completa.

---

# 3. CONVIDADOS

O sistema deve possuir estrutura para gerenciamento de convidados.

Dados mínimos:

* nome
* sobrenome
* grupo/família
* telefone opcional
* e-mail opcional
* quantidade de convidados vinculados
* status do convite
* status de confirmação
* observações

Status:

PENDING
CONFIRMED
DECLINED

---

# 4. RSVP

O convidado deve poder confirmar presença através de formulário simples.

Fluxo:

CONFIRMAR PRESENÇA
↓
Nome
↓
Identificação do convite
↓
Confirmação
↓
Quantidade de pessoas
↓
Mensagem opcional
↓
Enviar

O formulário deve ser extremamente simples no celular.

Após confirmação:

"Presença confirmada."

Não exigir cadastro complexo.

---

# 5. CONTROLE DO CASAL

Deve existir uma área administrativa protegida para o casal.

Dashboard mínimo:

* total de convidados
* convites enviados
* confirmações
* recusas
* pendentes
* quantidade total de pessoas confirmadas

Tabela:

Nome | Grupo | Status | Pessoas | Observação

Possibilidade de pesquisar convidados.

---

# 6. LISTA DE PRESENTES

Criar seção:

"Presentes"

A linguagem deve ser elegante e não transmitir obrigação.

Possibilidades:

* lista de presentes
* sugestões de presentes
* links externos
* categorias
* descrição
* imagem opcional

Cada item pode possuir:

* nome
* descrição
* imagem
* link
* categoria
* ordem de apresentação

Os links podem direcionar para lojas ou plataformas externas.

---

# 7. LOCAL

Criar seção:

"O Grande Dia"

Informações:

* data
* horário
* cerimônia
* endereço
* recepção, caso seja diferente
* informações adicionais

CTA:

"Ver no mapa"

O botão deve abrir uma URL de mapa externa.

Não implementar mapa complexo dentro da aplicação na primeira versão.

Prioridade:

funcionar perfeitamente no celular.

---

# 8. CONTAGEM REGRESSIVA

Exibir:

DIAS
HORAS
MINUTOS
SEGUNDOS

A contagem deve utilizar a data configurada em um único arquivo/configuração.

---

# 9. GALERIA

Galeria responsiva.

Possibilidades:

* grid
* carrossel
* lightbox

Priorizar performance.

Não carregar todas as imagens em resolução máxima inicialmente.

---

# 10. MÚSICA

Se houver música:

* usuário deve iniciar a experiência voluntariamente
* nunca depender de autoplay com áudio
* oferecer controle de reprodução

A música deve ser tratada como complemento e não como requisito para compreender o convite.

---

# 11. RESPONSIVIDADE

Breakpoints devem ser centralizados.

Prioridade:

1. smartphone
2. tablet
3. desktop

O conteúdo deve continuar funcional mesmo em dispositivos de baixa potência.

---

# 12. CONFIGURAÇÃO

Informações do casamento devem ser separadas da implementação visual.

Criar estrutura equivalente a:

wedding.config.ts

Contendo:

* nomes
* data
* horários
* endereço
* mapa
* textos
* links
* presentes
* imagens
* configurações de animação

Alterações de conteúdo não devem exigir alteração de componentes.

---

# 13. ARQUITETURA

Separar:

CONTENT
DESIGN SYSTEM
COMPONENTS
SCENES
DATA
SERVICES

Evitar misturar lógica de RSVP com componentes puramente visuais.

---

# 14. BACKEND

O backend deve ser escolhido pela solução mais simples, segura e rápida de implementar.

O objetivo não é criar uma plataforma de casamento genérica.

É criar uma aplicação funcional para um casamento específico.

Evitar infraestrutura desnecessária.

---

# 15. ADMIN

A área administrativa deve ser simples.

Funcionalidades essenciais:

* visualizar convidados
* pesquisar
* editar status
* visualizar confirmações
* visualizar quantidade de pessoas
* cadastrar/editar presentes
* alterar informações do casamento

---

# 16. SEGURANÇA

Informações administrativas nunca devem ser expostas publicamente.

Dados de convidados devem possuir regras de acesso adequadas.

Não colocar credenciais ou secrets no frontend.

---

# 17. PRIORIDADE DE IMPLEMENTAÇÃO

P0 — obrigatório:

* opening
* hero
* informações do casamento
* localização
* RSVP
* controle de convidados
* presentes
* responsividade

P1 — importante:

* cinematic scroll
* galeria
* countdown
* música

P2 — refinamento:

* microinterações
* parallax avançado
* efeitos adicionais
* PWA

Nunca atrasar o lançamento para implementar P2.

---

# 18. REGRA DE ESCOPO

O aplicativo deve ser lançado rapidamente.

Quando existir escolha entre:

A) efeito sofisticado que exige muita infraestrutura

B) solução simples que produz resultado visual semelhante

preferir B.

A sofisticação deve vir principalmente de:

* direção de arte
* composição
* tipografia
* fotografia
* motion bem executado
* qualidade dos detalhes

e não da quantidade de código.

---

# 19. CRITÉRIO DE SUCESSO

O aplicativo será considerado pronto quando:

1. abrir rapidamente no celular
2. parecer visualmente premium
3. possuir uma abertura memorável
4. permitir navegar sem confusão
5. permitir confirmar presença
6. permitir controlar convidados
7. apresentar informações do casamento
8. abrir corretamente a localização
9. apresentar lista/sugestões de presentes
10. funcionar corretamente em smartphones
11. funcionar mesmo com animações reduzidas/desativadas
