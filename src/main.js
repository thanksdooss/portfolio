import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.css'

createApp(App).use(router).mount('#app')

// 개발 전용: ?y=1200 이면 로드 후 해당 위치로 스크롤 (헤드리스 스크린샷 검수용, 배포 빌드에는 포함되지 않음)
if (import.meta.env.DEV) {
  const y = new URLSearchParams(location.search).get('y')
  if (y) setTimeout(() => { window.scrollTo(0, +y); window.dispatchEvent(new Event('scroll')) }, 1500)
}
