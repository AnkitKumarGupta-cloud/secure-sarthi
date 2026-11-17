import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
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
