import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

// GitHub Pages는 서버 라우팅이 없으므로 해시 모드(#/p/...)를 쓴다.
// 페이지 안의 섹션 이동은 해시 대신 scrollIntoView로 처리한다(useScrollTo 참고).
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/p/:id', component: () => import('./views/ProjectDetail.vue'), props: true },
    { path: '/print', component: () => import('./views/PrintSummary.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    return saved || { top: 0 }
  },
})
