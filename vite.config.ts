import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath } from 'node:url'

/**
 * Two build modes:
 *  - default (`npm run build`): a normal Vite app; every dependency is bundled from npm.
 *  - artifact (`npm run build:artifact`): one self-contained HTML page. React loads from a
 *    public CDN (cdnjs); everything else, images included, is inlined.
 */
export const CDN = {
  react: 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  reactDom: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
}

const shim = (file: string) => fileURLToPath(new URL(`./shims/${file}`, import.meta.url))

function cdnTags(): Plugin {
  return {
    name: 'kavach-cdn-tags',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          { tag: 'script', attrs: { src: CDN.react, crossorigin: 'anonymous' }, injectTo: 'head-prepend' },
          { tag: 'script', attrs: { src: CDN.reactDom, crossorigin: 'anonymous' }, injectTo: 'head-prepend' },
        ]
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact'
  return {
    plugins: [react(), ...(artifact ? [cdnTags(), viteSingleFile({ removeViteModuleLoader: true })] : [])],
    resolve: {
      alias: artifact
        ? [
            { find: /^react$/, replacement: shim('react.js') },
            { find: /^react\/jsx-runtime$/, replacement: shim('jsx-runtime.js') },
            { find: /^react\/jsx-dev-runtime$/, replacement: shim('jsx-runtime.js') },
            { find: /^react-dom$/, replacement: shim('react-dom.js') },
            { find: /^react-dom\/client$/, replacement: shim('react-dom-client.js') },
          ]
        : [],
      dedupe: ['react', 'react-dom'],
    },
    build: artifact
      ? {
          outDir: 'dist-artifact',
          emptyOutDir: true,
          target: 'es2020',
          cssCodeSplit: false,
          assetsInlineLimit: 100_000_000,
          chunkSizeWarningLimit: 4000,
          rollupOptions: {
            output: { format: 'es' as const, inlineDynamicImports: true },
          },
        }
      : {
          target: 'es2020',
          chunkSizeWarningLimit: 2000,
        },
  }
})
