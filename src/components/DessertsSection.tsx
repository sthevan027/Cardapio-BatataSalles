import { formatPreco, sobremesas } from '../data/menu'
import { useCart } from '../context/CartContext'

export function DessertsSection() {
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
      id="sobremesas"
      className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="sobremesas-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="sobremesas-heading"
          className="font-display text-3xl font-bold text-[var(--color-brand-brown)] sm:text-4xl"
        >
          Sobremesas
        </h2>
        <p className="mt-2 text-[var(--color-brand-brown)]/80">
          Finalize com chave de ouro!
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {sobremesas.map((item) => (
            <li
              key={item.nome}
              className="flex flex-col justify-between rounded-2xl border border-[var(--color-brand-brown)]/15 bg-[var(--color-parchment)] p-6 shadow-md sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="font-medium text-[var(--color-brand-brown)]">
                {item.nome}
              </span>
              <div className="mt-2 flex shrink-0 items-center gap-3 sm:mt-0">
                <span className="text-xl font-bold text-[var(--color-brand-gold)]">
                  {formatPreco(item.preco)}
                </span>
                <button
                  onClick={() => handleAdd(item.nome, item.preco)}
                  aria-label={`Adicionar ${item.nome}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-gold)] text-[var(--color-dark)] shadow transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-brand-gold)]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden>
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
