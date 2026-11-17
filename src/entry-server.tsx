import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Build-time only: the full HTML of one page, so search engines see real content without running JavaScript. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>,
  )
}
