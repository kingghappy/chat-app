import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Cổng client của bạn
    proxy: {
      // Mọi request có tiền tố '/api'
      '/api': {
        target: 'http://localhost:3000', // Sẽ được chuyển đến server 3000
        changeOrigin: true, // Cần thiết để "đánh lừa" server
        rewrite: (path) => path.replace(/^\/api/, '') // Xóa '/api' đi
      }
    }
  }
})
