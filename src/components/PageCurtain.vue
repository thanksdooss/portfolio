<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gsap, reduceMotion } from '../composables/useSmoothScroll.js'
import { hasFlip } from '../composables/flip.js'

// 페이지 전환: 주황 절단선이 화면을 가로지르고, 먹색 판이 덮였다가 걷힌다(강판 절단 공정에서 착안).
const router = useRouter()
const panel = ref(null)
const cut = ref(null)
let first = true

router.beforeEach(async (to, from) => {
  const flipping = to.params?.id && hasFlip(to.params.id)
  if (first || reduceMotion || flipping || to.path === from.path || to.path === '/print') { first = false; return true }
  await gsap.timeline()
    .set(panel.value, { display: 'block', clipPath: 'inset(100% 0 0 0)' })
    .fromTo(cut.value, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.35, ease: 'expo.in', transformOrigin: 'left' })
    .to(panel.value, { clipPath: 'inset(0% 0 0 0)', duration: 0.5, ease: 'expo.inOut' }, '-=0.05')
    .then()
  return true
})
router.afterEach((to, from) => {
  if (!panel.value || panel.value.style.display !== 'block') return
  gsap.timeline({ delay: 0.15 })
    .set(cut.value, { opacity: 0 })
    .to(panel.value, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' })
    .set(panel.value, { display: 'none' })
})
</script>

<template>
  <div ref="panel" class="curtain" aria-hidden="true">
    <span class="mark label">現圖 — Lofting</span>
  </div>
  <span ref="cut" class="cut" aria-hidden="true"></span>
</template>

<style scoped>
.curtain { position: fixed; inset: 0; z-index: 250; background: var(--bg-3); display: none; }
.mark { position: absolute; left: var(--gutter); bottom: 32px; }
.cut { position: fixed; left: 0; right: 0; top: 50%; height: 1px; background: var(--accent); z-index: 260; transform: scaleX(0); pointer-events: none; opacity: 0; }
</style>
