# WEDDING EXPERIENCE DESIGN SYSTEM

## Versão 1.0 — Design & Motion Specification

## 1. PROPÓSITO

Este projeto não deve ser tratado como um simples site institucional ou uma página convencional de convite.

É uma experiência digital de casamento, mobile-first, com linguagem editorial, cinematográfica, sofisticada e emocional.

O objetivo é criar uma experiência que transmita:

* intimidade
* elegância
* sofisticação
* romantismo contemporâneo
* exclusividade
* atemporalidade

O resultado deve parecer um produto digital premium, e não um template genérico de convite.

---

# 2. PRINCÍPIO CENTRAL

A experiência deve seguir a regra:

DESIGN PREMIUM + MOTION SUTIL + CONTEÚDO EMOCIONAL + FUNCIONALIDADE SIMPLES

Não utilizar excesso de animações apenas para demonstrar tecnologia.

Cada movimento deve ter uma função narrativa.

---

# 3. DIREÇÃO DE ARTE

Estética:

* editorial
* romântica contemporânea
* sofisticada
* minimalista
* cinematográfica
* orgânica
* atemporal

Evitar:

* estética infantil
* excesso de elementos florais
* aparência de template
* excesso de dourado
* efeitos "glitter"
* animações exageradas
* gradientes genéricos
* tipografia excessivamente decorativa
* visual de aplicativo corporativo
* estética "luxury wedding" exagerada

O convite deve parecer elegante mesmo quando todos os efeitos de movimento estiverem desativados.

---

# 4. PALETA

A paleta definitiva deve ser centralizada em tokens.

Tokens iniciais:

--color-ivory
--color-warm-white
--color-charcoal
--color-muted-gold
--color-soft-green

Os valores hexadecimais devem ser definidos em um único arquivo de tokens e nunca espalhados pelo código.

Não criar novas cores arbitrariamente dentro dos componentes.

---

# 5. TIPOGRAFIA

Utilizar no máximo três famílias tipográficas.

### DISPLAY

Fonte serifada editorial.

Uso:

* nomes
* títulos principais
* frases de destaque

### BODY

Fonte sans-serif elegante e altamente legível.

Uso:

* textos
* informações
* botões
* formulários

### ACCENT

Fonte manuscrita ou caligráfica apenas quando houver necessidade narrativa.

Uso extremamente restrito.

Nunca utilizar fonte decorativa em grandes blocos de texto.

---

# 6. COMPOSIÇÃO

O layout deve possuir bastante espaço negativo.

Priorizar:

* respiro
* hierarquia
* assimetria controlada
* fotografia como elemento principal
* tipografia como elemento visual
* sobreposição sutil de elementos

Evitar:

* blocos excessivamente cheios
* excesso de cards
* grids rígidos em todas as seções
* elementos competindo pela atenção

---

# 7. ELEMENTOS VISUAIS

Elementos permitidos:

* papel
* textura de papel
* cera
* selo
* flores
* folhas
* fotografia
* linhas finas
* molduras discretas
* pequenos ornamentos

Os elementos florais e de cera devem possuir aparência fotorealista/editorial.

As flores devem funcionar como elementos de composição e não como decoração repetitiva.

---

# 8. OPENING EXPERIENCE

A abertura é uma das principais experiências do convite.

Conceito:

Um convite físico transformado em experiência digital.

Possíveis elementos:

* fundo de papel
* envelope
* selo de cera
* flores
* nomes do casal
* convite
* botão "Abrir convite"

A interação inicial deve ser simples.

Não criar uma sequência longa que impeça o usuário de acessar o conteúdo.

Depois da interação:

OPENING
↓
TRANSITION
↓
MAIN EXPERIENCE

---

# 9. HERO

Após a abertura, apresentar uma cena hero cinematográfica.

Elementos:

* nomes do casal
* data
* fotografia ou vídeo
* elemento visual principal

A primeira tela deve comunicar imediatamente:

"Este é o nosso casamento."

Não utilizar excesso de informação.

---

# 10. MOTION SYSTEM

Todo movimento deve ser controlado por um sistema central.

Categorias:

M1 — MICRO MOTION
M2 — REVEAL
M3 — PARALLAX
M4 — CINEMATIC SCROLL

---

## M1 — MICRO MOTION

Utilizado em:

* botões
* ícones
* pequenos elementos
* hover
* feedback de interação

Movimentos discretos.

---

## M2 — REVEAL

Entrada de conteúdo:

opacity: 0 → 1

com pequeno deslocamento vertical.

Evitar entradas excessivamente rápidas ou elásticas.

---

## M3 — PARALLAX

Elementos em diferentes velocidades.

Exemplo:

BACKGROUND = 0.2
DECORATION = 0.4
IMAGE = 0.8
TEXT = 1.0

O efeito deve ser sutil.

---

# 11. CINEMATIC SCROLL

Algumas cenas poderão utilizar scroll-driven animation.

O scroll controla o progresso da cena.

Conceito:

scroll progress
↓
0 → 1
↓
animation timeline

A timeline pode controlar:

* vídeo
* escala
* posição
* opacidade
* elementos gráficos
* texto

O efeito deve parecer uma sequência cinematográfica.

---

# 12. USO DE VÍDEO

Vídeo deve ser utilizado somente quando agregar valor visual.

Não transformar toda a página em vídeo.

Priorizar:

* vídeos curtos
* compressão adequada
* carregamento progressivo
* poster image
* formatos modernos quando possível

Para cenas que exigem controle preciso por scroll, avaliar:

1. vídeo controlado por currentTime
2. sequência de frames
3. animação baseada em imagens/SVG

Escolher a solução mais performática para cada cena.

---

# 13. MOBILE FIRST

O dispositivo principal é o smartphone.

A experiência deve ser projetada primeiro para:

360px–430px de largura.

Desktop deve ser adaptação da experiência mobile.

Nunca assumir que uma animação adequada no desktop funcionará automaticamente no mobile.

---

# 14. REDUCED MOTION

Respeitar:

prefers-reduced-motion

Quando ativado:

* reduzir parallax
* eliminar movimentos desnecessários
* evitar animações longas
* manter conteúdo totalmente acessível

A experiência deve continuar bonita sem motion.

---

# 15. IMAGENS

Priorizar:

* WebP
* AVIF quando adequado
* resolução responsiva
* lazy loading fora da área inicial

Imagens hero devem possuir versões otimizadas.

Nunca utilizar imagens gigantescas sem necessidade.

---

# 16. COMPONENTES VISUAIS

Componentes principais:

OpeningExperience
WaxSeal
FloralDecoration
Hero
CinematicScene
ParallaxImage
StorySection
WeddingDetails
Countdown
Gallery
LocationCard
GiftSection
RSVPSection
Footer

Os componentes devem ser reutilizáveis.

---

# 17. REGRA DE CONSISTÊNCIA

Nenhum componente deve introduzir:

* nova paleta
* nova tipografia
* novo sistema de espaçamento
* novo comportamento de animação
* novo estilo visual

sem atualizar primeiro este Design System.

---

# 18. PRINCÍPIO DE PERFORMANCE

Impacto visual não pode depender de peso excessivo.

Preferir:

"efeito simples muito bem executado"

em vez de:

"muitos efeitos medianos".

A experiência deve carregar rapidamente em conexão móvel.

---

# 19. PRINCÍPIO FINAL

O usuário não deve perceber a tecnologia.

Ele deve perceber:

a história,
o casal,
a celebração,
a beleza
e a expectativa do casamento.

A tecnologia existe para servir a experiência.
