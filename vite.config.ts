import { defineConfig } from 'vite'
// vite.config.js
import { splitVendorChunkPlugin } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), splitVendorChunkPlugin()],
  build: {
    assetsDir: 'assets/shogi-board'
  }
})
