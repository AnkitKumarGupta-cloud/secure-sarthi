import { MotionConfig } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SearchPalette } from './components/layout/SearchPalette'
import { AboutPage } from './pages/AboutPage'
import { ClaimsPage } from './pages/ClaimsPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { NotFound } from './pages/NotFound'
import { PlanPage } from './pages/PlanPage'
import { PlansIndex } from './pages/PlansIndex'
import { MobileActionBar, ScrollProgress, WhatsAppFab } from './components/ui/Motion'
import { RouterProvider, useRoute } from './lib/router'
import { UIProvider } from './state/ui'

function Page() {
  const route = useRoute()
  switch (route.name) {
    case 'home':
      return <HomePage />
    case 'plans':
      return <PlansIndex />
    case 'plan':
      return <PlanPage id={route.id} />
    case 'claims':
      return <ClaimsPage />
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    case 'legal':
      return <LegalPage doc={route.doc} />
    default:
      return <NotFound />
  }
}

function Shell() {
  const route = useRoute()
  const key = route.name === 'plan' ? `plan-${route.id}` : route.name === 'legal' ? `legal-${route.doc}` : route.name
  return (
    <div className="relative overflow-x-clip">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <div key={key} className="kv-page">
          <Page />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function App({ url }: { url?: string } = {}) {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider url={url}>
        <UIProvider>
          <a
            href="#main"
            onClick={(e) => {
              e.preventDefault()
              const main = document.getElementById('main')
              main?.focus()
              main?.scrollIntoView()
            }}
            className="fixed left-4 top-[calc(env(safe-area-inset-top,0px)+8px)] z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2.5 font-display font-semibold text-white transition focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Shell />
          <WhatsAppFab />
          <MobileActionBar />
          <SearchPalette />
        </UIProvider>
      </RouterProvider>
    </MotionConfig>
  )
}
