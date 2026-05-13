import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Strips Figma Make-specific version suffixes from imports, e.g. "sonner@2.0.3" -> "sonner"
function stripVersionedImports() {
  return {
    name: 'strip-versioned-imports',
    async resolveId(id: string, importer: string | undefined) {
      const versionSuffix = /@\d+\.\d+[\d.]*$/
      if (versionSuffix.test(id)) {
        const stripped = id.replace(versionSuffix, '')
        return this.resolve(stripped, importer, { skipSelf: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    stripVersionedImports(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
})
