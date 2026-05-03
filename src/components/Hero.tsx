import { negocio } from '../data/menu'

export function Hero() {
  return (
    <section
      id="topo"
      className="border-b border-white/10 bg-[var(--color-dark)] px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-gold)]/90">
            Cardápio digital
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-tight text-stone-100 sm:text-5xl"
          >
            {negocio.slogan}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-stone-400">
            {negocio.sloganCurto}. {negocio.destaque}
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-sm text-stone-300 sm:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[var(--color-brand-gold)]" aria-hidden>
                ●
              </span>
              <span>
                <strong className="font-semibold text-stone-200">WhatsApp:</strong>{' '}
                {negocio.whatsappLabel}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[var(--color-brand-gold)]" aria-hidden>
                ●
              </span>
              <span>
                <strong className="font-semibold text-stone-200">Atendemos:</strong>{' '}
                {negocio.regioes}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-[var(--color-brand-gold)]" aria-hidden>
                ●
              </span>
              <span>{negocio.entregas}</span>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-dark-elevated)] shadow-2xl shadow-black/40">
            <img
              src="/referencia-cardapio.png"
              alt="Referência visual do cardápio Batata Salle's com sabores e preços"
              className="h-auto w-full object-cover object-top"
              width={400}
              height={711}
              loading="eager"
            />
          </div>
          <p className="mt-2 text-center text-xs text-stone-500 lg:text-left">
            Imagem de referência do cardápio — protótipo para apresentação.
          </p>
        </div>
      </div>
    </section>
  )
}
