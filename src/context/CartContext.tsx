import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'
import { adicionais, negocio } from '../data/menu'

export type CartItemTamanho = 'padrao' | 'mini'

export type CartItem = {
  cartId: string
  nome: string
  tamanho?: CartItemTamanho
  adicionaisEscolhidos: string[]
  observacoes: string
  precoBase: number
  quantidade: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; cartId: string }
  | { type: 'CHANGE_QTY'; cartId: string; delta: number }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR' }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item], isOpen: true }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.cartId !== action.cartId),
      }
    case 'CHANGE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.cartId === action.cartId
              ? { ...i, quantidade: i.quantidade + action.delta }
              : i
          )
          .filter((i) => i.quantidade > 0),
      }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function calcItemTotal(item: CartItem): number {
  const adicionaisPreco = item.adicionaisEscolhidos.reduce((acc, nome) => {
    const found = adicionais.find((a) => a.nome === nome)
    return acc + (found?.preco ?? 0)
  }, 0)
  return (item.precoBase + adicionaisPreco) * item.quantidade
}

export function calcCartTotal(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + calcItemTotal(i), 0)
}

export function formatPrecoCart(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function buildWhatsAppMessage(items: CartItem[]): string {
  const linhas = items.map((item) => {
    const tamanhoLabel =
      item.tamanho === 'mini'
        ? ' (Mini)'
        : item.tamanho === 'padrao'
          ? ' (Padrão)'
          : ''
    const adicionaisStr = item.adicionaisEscolhidos
      .map((nome) => {
        const found = adicionais.find((a) => a.nome === nome)
        return `  ➕ ${nome}${found ? ` (+${formatPrecoCart(found.preco)})` : ''}`
      })
      .join('\n')
    const obsStr = item.observacoes.trim()
      ? `  📝 ${item.observacoes.trim()}`
      : ''
    const total = formatPrecoCart(calcItemTotal(item))
    const partes = [
      `*${item.quantidade}x ${item.nome}${tamanhoLabel}* — ${total}`,
      adicionaisStr,
      obsStr,
    ].filter(Boolean)
    return partes.join('\n')
  })

  const total = formatPrecoCart(calcCartTotal(items))
  return [
    `🥔 *Pedido - ${negocio.nome}*`,
    '',
    linhas.join('\n\n'),
    '',
    '━━━━━━━━━━━━',
    `*Total: ${total}*`,
    '',
    'Olá! Gostaria de fazer esse pedido 😊',
  ].join('\n')
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  totalItens: number
  totalPreco: number
  addItem: (item: Omit<CartItem, 'cartId'>) => void
  removeItem: (cartId: string) => void
  changeQty: (cartId: string, delta: number) => void
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
  sendToWhatsApp: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })

  const addItem = useCallback((item: Omit<CartItem, 'cartId'>) => {
    dispatch({
      type: 'ADD_ITEM',
      item: { ...item, cartId: crypto.randomUUID() },
    })
  }, [])

  const removeItem = useCallback((cartId: string) => {
    dispatch({ type: 'REMOVE_ITEM', cartId })
  }, [])

  const changeQty = useCallback((cartId: string, delta: number) => {
    dispatch({ type: 'CHANGE_QTY', cartId, delta })
  }, [])

  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const sendToWhatsApp = useCallback(() => {
    const msg = buildWhatsAppMessage(state.items)
    const url = `${negocio.whatsappUrl}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [state.items])

  const totalItens = state.items.reduce((acc, i) => acc + i.quantidade, 0)
  const totalPreco = calcCartTotal(state.items)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItens,
        totalPreco,
        addItem,
        removeItem,
        changeQty,
        openCart,
        closeCart,
        clearCart,
        sendToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
