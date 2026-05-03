import type { SVGProps } from 'react'
import { negocio } from '../data/menu'

function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M12 7v5l3 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconThermo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M10 3v11.5a4 4 0 108 0V3a2 2 0 10-8 0z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 14h4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 17a5.5 5.5 0 01-5-9.5zm0 2A3.5 3.5 0 1012 8.5 3.5 3.5 0 007 9.5zm5.75-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
    </svg>
  )
}

function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 22v-8.5h3l.5-3.5h-3.5V8.2c0-1 .3-1.7 1.8-1.7H17V3.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.7H6v3.5h3.5V22h4z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-dark)] px-4 py-12 text-stone-400 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="space-y-4">
          <p className="font-display text-lg font-semibold text-[var(--color-brand-gold)]">
            {negocio.nome}
          </p>
          <div className="flex items-start gap-2 text-sm">
            <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-gold)]" />
            <span>{negocio.tempoMedio}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <IconThermo className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-gold)]" />
            <span>{negocio.disclaimer}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Redes sociais
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <a
                href={negocio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-[var(--color-brand-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]"
              >
                <IconInstagram className="h-5 w-5" />
                Instagram {negocio.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={negocio.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-[var(--color-brand-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]"
              >
                <IconFacebook className="h-5 w-5" />
                Facebook {negocio.facebookHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl border-t border-white/10 pt-8 text-center text-xs text-stone-500">
        Protótipo de cardápio virtual — apresentação comercial.
      </p>
    </footer>
  )
}
