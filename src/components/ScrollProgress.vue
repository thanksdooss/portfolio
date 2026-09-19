<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// 상단 진행선 + 오른쪽 아래 현재 섹션 표시(예: 02 — WORK). [data-section]이 붙은 섹션을 따라간다.
const route = useRoute()
const bar = ref(null)
const current = ref({ no: '', name: '' })
let io, raf = 0

function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const h = document.documentElement.scrollHeight - innerHeight
    if (bar.value) bar.value.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
  })
}
function observe() {
  io?.disconnect()
  const secs = [...document.querySelectorAll('[data-section]')]
  io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) current.value = { no: String(secs.indexOf(e.target) + 1).padStart(2, '0'), name: e.target.dataset.section }
  }), { rootMargin: '-45% 0px -50% 0px' })
  secs.forEach((s) => io.observe(s))
  if (!secs.length) current.value = { no: '', name: '' }
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); setTimeout(observe, 400) })
watch(() => route.fullPath, () => setTimeout(observe, 700))
onUnmounted(() => { window.removeEventListener('scroll', onScroll); io?.disconnect() })
</script>

<template>
  <div class="prog" aria-hidden="true"><span ref="bar"></span></div>
  <Transition name="ind">
    <div v-if="current.name && current.name !== 'Index'" :key="current.name" class="ind label" aria-hidden="true">
      <b>{{ current.no }}</b> — {{ current.name }}
    </div>
  </Transition>
</template>

<style scoped>
.prog { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 60; pointer-events: none; }
.prog span { display: block; height: 100%; background: var(--accent); transform-origin: left; transform: scaleX(0); }
.ind { position: fixed; left: var(--gutter); bottom: 22px; z-index: 45; pointer-events: none; mix-blend-mode: difference; color: #cfcac1; }
.ind b { color: var(--accent); }
.ind-enter-active, .ind-leave-active { transition: opacity .4s, transform .5s var(--ease); }
.ind-enter-from { opacity: 0; transform: translateY(8px); }
.ind-leave-to { opacity: 0; transform: translateY(-8px); }
@media (max-width: 699px) { .ind { display: none; } }
</style>
