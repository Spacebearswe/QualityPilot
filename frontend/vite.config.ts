import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Lets `npm run dev` work without the SWA CLI
    proxy: { '/api': 'http://localhost:5063' },
  },
})
