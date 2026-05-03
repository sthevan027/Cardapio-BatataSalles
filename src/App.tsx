import { CartProvider, formatPrecoCart, useCart } from './context/CartContext'
import { AddonsSection } from './components/AddonsSection'
import { BatatasSection } from './components/BatatasSection'
import { CartDrawer } from './components/CartDrawer'
import { DessertsSection } from './components/DessertsSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'

function FloatingCartButton() {
  const { totalItens, totalPreco, openCart } = useCart()
  if (totalItens === 0) return null
  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4">
      <button
        onClick={openCart}
        className="flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl bg-[var(--color-brand-gold)] px-5 py-4 font-bold text-[var(--color-dark)] shadow-2xl shadow-black/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-gold)]"
        aria-label={`Ver pedido — ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-dark)] text-sm font-bold text-[var(--color-brand-gold)]">
            {totalItens}
          </span>
          <span>Ver pedido</span>
        </div>
        <span>{formatPrecoCart(totalPreco)}</span>
      </button>
    </div>
  )
}

function AppContent() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-[var(--color-parchment)] via-[#faf6ee] to-[var(--color-parchment-dark)]">
      <Header />
      <Hero />
      <main className="pb-28">
        <BatatasSection />
        <AddonsSection />
        <DessertsSection />
      </main>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
