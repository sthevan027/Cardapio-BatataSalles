export type BatataItem = {
  id: string
  nome: string
  ingredientes: string
  precoPadrao: number
  precoMini: number
  /** Caminho em /public para foto do prato; omitir = placeholder na UI */
  imagemSrc?: string
}

export type ItemSimples = {
  nome: string
  preco: number
}

export const negocio = {
  nome: "Batata Salle's",
  slogan: 'As batatas recheadas mais irresistíveis da região!',
  sloganCurto: 'Batata recheada ultra cremosa',
  destaque: 'Produção limitada — garanta a sua!',
  whatsappUrl: 'https://wa.me/5527988548006',
  whatsappLabel: '(27) 98854-8006',
  regioes: 'Nova Almeida e Praia Grande',
  entregas: 'Entregas a partir das 18h',
  tempoMedio: 'Tempo médio: 1h a 1h30',
  instagram: 'https://www.instagram.com/batatasalles/',
  instagramHandle: '@BATATASALLES',
  facebook: 'https://www.facebook.com/batatasalles',
  facebookHandle: '@BATATASALLES',
  disclaimer: 'Preços sujeitos à disponibilidade do dia',
  bebidasNota: 'Refrigerantes e bebidas disponíveis — consulte no pedido.',
} as const

export const batatas: BatataItem[] = [
  {
    id: 'classica-cremosa',
    nome: 'Clássica Cremosa',
    ingredientes:
      'Creme especial, frango cremoso, requeijão e muito queijo.',
    precoPadrao: 32,
    precoMini: 20,
  },
  {
    id: 'explosao-bacon',
    nome: 'Explosão de Bacon',
    ingredientes: 'Creme especial, bacon crocante, requeijão e queijo.',
    precoPadrao: 34,
    precoMini: 22,
  },
  {
    id: 'salles-especial',
    nome: "Salle's Especial",
    ingredientes:
      'Creme especial, frango cremoso, bacon, milho e requeijão.',
    precoPadrao: 36,
    precoMini: 24,
  },
  {
    id: 'batata-premium',
    nome: 'Batata Premium',
    ingredientes:
      'Creme especial, calabresa, bacon, cheddar, queijo e requeijão.',
    precoPadrao: 39,
    precoMini: 27,
  },
]

export const adicionais: ItemSimples[] = [
  { nome: 'Arroz', preco: 7 },
  { nome: 'Bacon', preco: 6 },
  { nome: 'Frango', preco: 6 },
  { nome: 'Queijo parmesão ralado', preco: 4 },
  { nome: 'Milho', preco: 3 },
  { nome: 'Mussarela', preco: 3 },
]

export const sobremesas: ItemSimples[] = [
  { nome: 'Sorvete com chocolate meio amargo', preco: 12 },
  { nome: 'Maracujá', preco: 12 },
]

export function formatPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
