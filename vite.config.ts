import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 정적 포트폴리오 허브 빌드 설정 — React + Tailwind v4 플러그인만 필요 (백엔드 프록시 없음)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
