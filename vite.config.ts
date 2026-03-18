import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    allowedHosts: [
      'erminia-orthogonal-tremendously.ngrok-free.dev'
    ]
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})