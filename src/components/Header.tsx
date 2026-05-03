import { negocio } from '../data/menu'

const navLinkClass =
  'text-sm font-medium text-stone-300 transition hover:text-[var(--color-brand-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-dark)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="#topo"
          className="font-display text-xl font-semibold tracking-tight text-[var(--color-brand-gold)] sm:text-2xl"
        >
          {negocio.nome}
        </a>

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
          aria-label="Seções do cardápio"
        >
          <a href="#batatas" className={navLinkClass}>
            Batatas
          </a>
          <a href="#adicionais" className={navLinkClass}>
            Adicionais
          </a>
          <a href="#sobremesas" className={navLinkClass}>
            Sobremesas
          </a>
        </nav>

        <a
          href={negocio.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--color-dark)] shadow-lg shadow-black/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]"
          aria-label={`Pedir no WhatsApp ${negocio.whatsappLabel}`}
        >
          Pedir no WhatsApp
        </a>
      </div>
    </header>
  )
}
