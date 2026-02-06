import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // :point_down: THIS is what changes for Axios / fetch
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1111', // backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})