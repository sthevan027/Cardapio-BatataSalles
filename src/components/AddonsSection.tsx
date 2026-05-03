import { adicionais, formatPreco, negocio } from '../data/menu'
import { useCart } from '../context/CartContext'

export function AddonsSection() {
  const { addItem } = useCart()

  function handleAdd(nome: string, preco: number) {
    addItem({
      nome,
      adicionaisEscolhidos: [],
      observacoes: '',
      precoBase: preco,
      quantidade: 1,
    })
  }

  return (
    <section
      id="adicionais"
      className="scroll-mt-24 border-t border-[var(--color-brand-brown)]/10 bg-[var(--color-parchment-dark)]/40 px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="adicionais-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2
              id="adicionais-heading"
              className="font-display text-3xl font-bold text-[var(--color-brand-brown)] sm:text-4xl"
            >
              Nossos adicionais
            </h2>
            <p className="mt-2 max-w-xl text-[var(--color-brand-brown)]/80">
              Personalize seu pedido com extras avulsos.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-brand-brown)]/15 bg-[var(--color-parchment)] shadow-md lg:max-w-xs">
            <img
              src="/referencia-instagram.png"
              alt="Referência da marca Batata Salle's no Instagram"
              className="h-40 w-full object-cover object-top sm:h-44"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-brand-brown)]/15 bg-[var(--color-parchment)] p-6 shadow-md">
          <ul className="divide-y divide-[var(--color-brand-brown)]/10">
            {adicionais.map((item) => (
              <li
                key={item.nome}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className="font-medium text-[var(--color-brand-brown)]">
                  {item.nome}
                </span>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-semibold text-[var(--color-brand-gold)]">
                    {formatPreco(item.preco)}
                  </span>
                  <button
                    onClick={() => handleAdd(item.nome, item.preco)}
                    aria-label={`Adicionar ${item.nome}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-gold)] text-[var(--color-dark)] shadow transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-gold)]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden>
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-[var(--color-brand-brown)]/10 pt-4 text-sm text-[var(--color-brand-brown)]/75">
            {negocio.bebidasNota}
          </p>
        </div>
      </div>
    </section>
  )
}
