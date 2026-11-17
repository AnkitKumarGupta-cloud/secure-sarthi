import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
// Fonts are served from this site (no Google Fonts round trip before the page can draw).
import '@fontsource/mukta/latin-400.css'
import '@fontsource/mukta/latin-500.css'
import '@fontsource/mukta/latin-600.css'
import '@fontsource/mukta/latin-700.css'
import '@fontsource-variable/anek-latin/wght.css'
import '@fontsource/kaushan-script/latin-400.css'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Live pages arrive prerendered, so take over the existing HTML; the preview build starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app, { onRecoverableError: () => {} })
else createRoot(root).render(app)
