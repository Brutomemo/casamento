export const wedding = {
  groom: 'Marcos',
  bride: 'Grazi',
  datetime: '2026-11-29T16:00:00',
  venueName: 'Brooklin',
  address: 'Rua João de Lacerda Soares, 31 — Jardim das Acácias, São Paulo, SP',
  city: 'São Paulo, SP',
  mapsQuery: 'Rua João de Lacerda Soares, 31, Jardim das Acácias, São Paulo',
  // Substituir pelo WhatsApp real do Marcos (apenas dígitos, com DDI 55)
  whatsapp: '5511999999999',
  rsvpDeadline: '01 · NOV · 2026',
  ceremonyTime: '16h00',
  receptionTime: '18h30',
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.mapsQuery)}`

export const whatsappUrl = `https://wa.me/${wedding.whatsapp}?text=${encodeURIComponent(
  `Olá! Confirmo presença no casamento de ${wedding.groom} e ${wedding.bride}.`,
)}`
