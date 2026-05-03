import { useState } from 'react'
import { batatas, formatPreco } from '../data/menu'
import type { BatataItem } from '../data/menu'
import { ProductModal } from './ProductModal'

function iniciais(nome: string): string {
  return nome
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

function PotatoImage({ item }: { item: BatataItem }) {
  if (item.imagemSrc) {
    return (
      <img
        src={item.imagemSrc}
        alt={item.nome}
        className="h-44 w-full object-cover sm:h-48"
        loading="lazy"
      />
    )
  }
  return (
    <div
      className="flex h-44 items-center justify-center bg-gradient-to-br from-[var(--color-parchment-dark)] via-[#c4a574]/40 to-[var(--color-brand-brown)]/35 sm:h-48"
      aria-hidden
    >
      <span className="font-display text-3xl font-bold text-[var(--color-brand-brown)]/80">
        {iniciais(item.nome)}
      </span>
    </div>
  )
}

export function BatatasSection() {
  const [modalItem, setModalItem] = useState<BatataItem | null>(null)

  return (
    <>
      <section
        id="batatas"
        className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="batatas-heading"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center sm:text-left">
            <h2
              id="batatas-heading"
              className="font-display text-3xl font-bold text-[var(--color-brand-brown)] sm:text-4xl"
            >
              Batatas recheadas
            </h2>
            <p className="mt-2 text-[var(--color-brand-brown)]/80">
              Escolha o tamanho e personalize com adicionais.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {batatas.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[var(--color-brand-brown)]/15 bg-[var(--color-parchment)] shadow-md shadow-[var(--color-brand-brown)]/10 transition hover:shadow-lg"
              >
                <PotatoImage item={item} />
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-xl font-semibold text-[var(--color-brand-brown)]">
                    {item.nome}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-brand-brown)]/85">
                    {item.ingredientes}
                  </p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-3">
                      <div className="rounded-xl border border-[var(--color-brand-brown)]/20 bg-white/60 px-3 py-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-brown)]/70">
                          Padrão
                        </span>
                        <p className="text-lg font-bold text-[var(--color-brand-gold)]">
                          {formatPreco(item.precoPadrao)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-[var(--color-brand-brown)]/20 bg-white/60 px-3 py-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-brown)]/70">
                          Mini
                        </span>
                        <p className="text-lg font-bold text-[var(--color-brand-gold)]">
                          {formatPreco(item.precoMini)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalItem(item)}
                      className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-gold)] px-4 py-2.5 text-sm font-bold text-[var(--color-dark)] shadow transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden>
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                      Adicionar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalItem && (
        <ProductModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  )
}
