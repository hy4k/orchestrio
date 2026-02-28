import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://backend:3001',
      '/socket.io': {
        target: 'ws://backend:3001',
        ws: true,
      },
    },
  },
})
