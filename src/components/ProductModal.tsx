import { useEffect, useRef, useState } from 'react'
import { adicionais, formatPreco } from '../data/menu'
import type { BatataItem } from '../data/menu'
import type { CartItemTamanho } from '../context/CartContext'
import { useCart } from '../context/CartContext'

type Props = {
  item: BatataItem
  onClose: () => void
}

export function ProductModal({ item, onClose }: Props) {
  const { addItem } = useCart()
  const [tamanho, setTamanho] = useState<CartItemTamanho>('padrao')
  const [adicionaisEscolhidos, setAdicionaisEscolhidos] = useState<string[]>([])
  const [observacoes, setObservacoes] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function toggleAdicional(nome: string) {
    setAdicionaisEscolhidos((prev) =>
      prev.includes(nome) ? prev.filter((n) => n !== nome) : [...prev, nome]
    )
  }

  const precoBase = tamanho === 'padrao' ? item.precoPadrao : item.precoMini
  const adicionaisTotal = adicionaisEscolhidos.reduce((acc, nome) => {
    const found = adicionais.find((a) => a.nome === nome)
    return acc + (found?.preco ?? 0)
  }, 0)
  const totalItem = precoBase + adicionaisTotal

  function handleAdd() {
    addItem({
      nome: item.nome,
      tamanho,
      adicionaisEscolhidos,
      observacoes,
      precoBase,
      quantidade: 1,
    })
    onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="w-full max-w-md rounded-t-3xl bg-[var(--color-parchment)] sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--color-brand-brown)]/10 px-6 pb-4 pt-6">
          <div>
            <h2
              id="modal-title"
              className="font-display text-2xl font-bold text-[var(--color-brand-brown)]"
            >
              {item.nome}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-brand-brown)]/75">
              {item.ingredientes}
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Fechar"
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-brown)]/10 text-[var(--color-brand-brown)] transition hover:bg-[var(--color-brand-brown)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-gold)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {/* Tamanho */}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-brown)]/60">
              Tamanho
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  { value: 'padrao', label: 'Padrão', preco: item.precoPadrao },
                  { value: 'mini', label: 'Mini', preco: item.precoMini },
                ] as const
              ).map(({ value, label, preco }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer flex-col rounded-2xl border-2 px-4 py-3 transition ${
                    tamanho === value
                      ? 'border-[var(--color-brand-gold)] bg-[var(--color-brand-gold)]/10'
                      : 'border-[var(--color-brand-brown)]/15 bg-white/60 hover:border-[var(--color-brand-gold)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="tamanho"
                    value={value}
                    checked={tamanho === value}
                    onChange={() => setTamanho(value)}
                    className="sr-only"
                  />
                  <span className="font-semibold text-[var(--color-brand-brown)]">
                    {label}
                  </span>
                  <span className="text-lg font-bold text-[var(--color-brand-gold)]">
                    {formatPreco(preco)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Adicionais */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-brown)]/60">
              Adicionais
            </legend>
            <ul className="mt-3 divide-y divide-[var(--color-brand-brown)]/10 rounded-2xl border border-[var(--color-brand-brown)]/15 bg-white/60">
              {adicionais.map((ad) => (
                <li key={ad.nome}>
                  <label className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 transition hover:bg-[var(--color-brand-gold)]/5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                          adicionaisEscolhidos.includes(ad.nome)
                            ? 'border-[var(--color-brand-gold)] bg-[var(--color-brand-gold)]'
                            : 'border-[var(--color-brand-brown)]/30 bg-white'
                        }`}
                      >
                        {adicionaisEscolhidos.includes(ad.nome) && (
                          <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" className="h-3 w-3" aria-hidden>
                            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={adicionaisEscolhidos.includes(ad.nome)}
                        onChange={() => toggleAdicional(ad.nome)}
                      />
                      <span className="text-sm font-medium text-[var(--color-brand-brown)]">
                        {ad.nome}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-[var(--color-brand-gold)]">
                      +{formatPreco(ad.preco)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          {/* Observações */}
          <div className="mt-6">
            <label
              htmlFor="obs"
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-brown)]/60"
            >
              Observações
            </label>
            <textarea
              id="obs"
              rows={2}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: sem sal, ponto da carne..."
              className="mt-3 w-full resize-none rounded-2xl border border-[var(--color-brand-brown)]/20 bg-white/70 px-4 py-3 text-sm text-[var(--color-brand-brown)] placeholder:text-[var(--color-brand-brown)]/40 focus:border-[var(--color-brand-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-gold)]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-brand-brown)]/10 px-6 py-5">
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-between rounded-2xl bg-[var(--color-brand-gold)] px-6 py-4 font-semibold text-[var(--color-dark)] shadow-lg shadow-black/20 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-gold)]"
          >
            <span>Adicionar ao pedido</span>
            <span className="text-lg font-bold">{formatPreco(totalItem)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
