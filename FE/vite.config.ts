import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173,
    cors: true,
    // 명시적으로 허용할 호스트 추가
    allowedHosts: ['www.undaied.com', 'localhost']
  }
})