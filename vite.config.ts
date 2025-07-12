import { defineConfig } from 'vite'
// vite.config.js
import preact from '@preact/preset-vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    assetsDir: 'assets/shogi-board'

  }
})
