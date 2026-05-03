import { useEffect, useRef } from 'react'
import {
  calcItemTotal,
  formatPrecoCart,
  useCart,
} from '../context/CartContext'
import { adicionais } from '../data/menu'

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.944-1.425A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.04-1.102l-.29-.172-2.936.846.874-2.867-.19-.294A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  )
}

export function CartDrawer() {
  const { items, isOpen, totalPreco, totalItens, removeItem, changeQty, closeCart, clearCart, sendToWhatsApp } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)

  // trap focus & escape
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-hidden
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Seu pedido"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--color-parchment)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-brand-brown)]/10 bg-[var(--color-dark)] px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[var(--color-brand-gold)]">
              Seu pedido
            </h2>
            {totalItens > 0 && (
              <p className="text-xs text-stone-400">
                {totalItens} {totalItens === 1 ? 'item' : 'itens'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 underline transition hover:text-stone-200"
              >
                Limpar
              </button>
            )}
            <button
              onClick={closeCart}
              aria-label="Fechar carrinho"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl" aria-hidden>🥔</span>
              <p className="mt-4 font-medium text-[var(--color-brand-brown)]">
                Seu pedido está vazio
              </p>
              <p className="mt-1 text-sm text-[var(--color-brand-brown)]/60">
                Adicione batatas do cardápio!
              </p>
              <button
                onClick={closeCart}
                className="mt-6 rounded-full border border-[var(--color-brand-gold)] px-5 py-2 text-sm font-semibold text-[var(--color-brand-brown)] transition hover:bg-[var(--color-brand-gold)] hover:text-[var(--color-dark)]"
              >
                Ver cardápio
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const adicionaisPrecoTotal = item.adicionaisEscolhidos.reduce(
                  (acc, nome) => acc + (adicionais.find((a) => a.nome === nome)?.preco ?? 0),
                  0
                )
                const itemTotal = calcItemTotal(item)
                const tamanhoLabel =
                  item.tamanho === 'mini'
                    ? ' · Mini'
                    : item.tamanho === 'padrao'
                      ? ' · Padrão'
                      : ''

                return (
                  <li
                    key={item.cartId}
                    className="rounded-2xl border border-[var(--color-brand-brown)]/10 bg-white/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-[var(--color-brand-brown)]">
                          {item.nome}
                          <span className="text-sm font-normal text-[var(--color-brand-brown)]/60">
                            {tamanhoLabel}
                          </span>
                        </p>
                        {item.adicionaisEscolhidos.length > 0 && (
                          <p className="mt-0.5 text-xs text-[var(--color-brand-brown)]/70">
                            + {item.adicionaisEscolhidos.join(', ')}
                            {adicionaisPrecoTotal > 0 &&
                              ` (+${formatPrecoCart(adicionaisPrecoTotal)})`}
                          </p>
                        )}
                        {item.observacoes && (
                          <p className="mt-0.5 text-xs italic text-[var(--color-brand-brown)]/60">
                            📝 {item.observacoes}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        aria-label={`Remover ${item.nome}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-brand-brown)]/40 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <IconTrash />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-2 rounded-full border border-[var(--color-brand-brown)]/20 bg-white px-1 py-1">
                        <button
                          onClick={() => changeQty(item.cartId, -1)}
                          aria-label="Diminuir quantidade"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-brand-brown)] transition hover:bg-[var(--color-brand-brown)]/10"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden>
                            <path d="M5 12h14" strokeLinecap="round" />
                          </svg>
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-[var(--color-brand-brown)]">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => changeQty(item.cartId, 1)}
                          aria-label="Aumentar quantidade"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-brand-brown)] transition hover:bg-[var(--color-brand-brown)]/10"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden>
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                      <span className="font-bold text-[var(--color-brand-gold)]">
                        {formatPrecoCart(itemTotal)}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-brand-brown)]/10 bg-white/50 px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-brand-brown)]/70">
                Total do pedido
              </span>
              <span className="text-xl font-bold text-[var(--color-brand-brown)]">
                {formatPrecoCart(totalPreco)}
              </span>
            </div>
            <button
              onClick={sendToWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366]"
            >
              <IconWhatsApp />
              Enviar pedido pelo WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-[var(--color-brand-brown)]/50">
              Você será redirecionado para o WhatsApp da loja com a sua comanda completa.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
