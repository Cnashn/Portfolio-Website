import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoFallback from './scripts/seo-fallback.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFallback()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
