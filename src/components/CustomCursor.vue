<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 데스크톱 전용 커서: 점 + 따라오는 링. [data-cursor="텍스트"] 위에서는 라벨이 뜬다.
const dot = ref(null)
const ring = ref(null)
const label = ref('')
const active = ref(false)
let x = -100, y = -100, rx = -100, ry = -100, raf = 0

function loop() {
  rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
  if (dot.value) dot.value.style.transform = `translate(${x}px, ${y}px)`
  if (ring.value) ring.value.style.transform = `translate(${rx}px, ${ry}px)`
  raf = requestAnimationFrame(loop)
}
function onMove(e) {
  x = e.clientX; y = e.clientY
  const t = e.target.closest?.('[data-cursor], a, button')
  active.value = !!t
  label.value = t?.dataset?.cursor || ''
}
onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  document.documentElement.classList.add('has-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})
onUnmounted(() => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove) })
</script>

<template>
  <div class="cursor" aria-hidden="true">
    <div ref="ring" class="ring" :class="{ active, labeled: !!label }"><span>{{ label }}</span></div>
    <div ref="dot" class="dot"></div>
  </div>
</template>

<style scoped>
.cursor { position: fixed; inset: 0; pointer-events: none; z-index: 200; }
.dot, .ring { position: fixed; left: 0; top: 0; will-change: transform; }
.dot { width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 50%; background: var(--accent); }
.ring {
  width: 34px; height: 34px; margin: -17px 0 0 -17px; border-radius: 50%; border: 1px solid rgba(238, 234, 226, 0.35);
  display: grid; place-items: center; transition: width .4s var(--ease), height .4s var(--ease), margin .4s var(--ease), background .3s, border-color .3s;
}
.ring.active { width: 56px; height: 56px; margin: -28px 0 0 -28px; border-color: var(--accent); }
.ring.labeled { width: 92px; height: 92px; margin: -46px 0 0 -46px; background: var(--accent); border-color: var(--accent); }
.ring span { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; color: #0b0c0e; opacity: 0; transition: opacity .2s; text-transform: uppercase; }
.ring.labeled span { opacity: 1; }
</style>

<style>
@media (hover: hover) and (pointer: fine) { html.has-cursor, html.has-cursor * { cursor: none !important; } }
</style>
