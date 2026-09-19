import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 프로젝트 사이트: https://thanksdooss.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [vue()],
  build: { assetsInlineLimit: 2048 },
})
