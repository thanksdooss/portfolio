<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from '../composables/useSmoothScroll.js'
import { finishIntro } from '../composables/intro.js'

// 1.6초 도입: 중앙단면 한 줄이 먹선처럼 그어지고 숫자가 100까지 오른 뒤, 막이 위로 걷힌다.
const root = ref(null)
const count = ref('000')
const gone = ref(false)

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  const o = { n: 0 }
  const tl = gsap.timeline({
    onComplete: () => { gone.value = true; document.documentElement.style.overflow = '' },
  })
  tl.to(o, { n: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (count.value = String(Math.round(o.n)).padStart(3, '0')) }, 0)
    .fromTo(root.value.querySelector('.hull'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0)
    .fromTo(root.value.querySelector('.wl'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0.7)
    .to(root.value.querySelectorAll('.fade'), { opacity: 0, y: -12, duration: 0.4, stagger: 0.03 }, 1.65)
    .add(finishIntro, 1.85)
    .to(root.value, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.0, ease: 'expo.inOut' }, 1.8)
})
</script>

<template>
  <div v-if="!gone" ref="root" class="pre" aria-hidden="true">
    <svg class="fade" viewBox="-120 -10 240 180" width="220">
      <path class="hull" pathLength="1" d="M-100 0 L-100 110 Q-100 150 -60 150 L60 150 Q100 150 100 110 L100 0" />
      <line class="wl" x1="-118" y1="80" x2="118" y2="80" />
      <line class="cl" x1="0" y1="-8" x2="0" y2="160" />
    </svg>
    <p class="lbl fade">現圖 — Lofting</p>
    <p class="cnt fade">{{ count }}</p>
    <p class="name fade">김진녕 <span>Portfolio 2026</span></p>
  </div>
</template>

<style scoped>
.pre { position: fixed; inset: 0; z-index: 300; background: var(--bg); display: grid; place-items: center; clip-path: inset(0 0 0 0); }
svg { overflow: visible; }
.hull { fill: none; stroke: var(--ink); stroke-width: 1.4; stroke-dasharray: 1; }
.wl { stroke: var(--sea); stroke-width: 1; transform-origin: center; transform-box: fill-box; }
.cl { stroke: var(--line-2); stroke-dasharray: 3 4; }
.lbl { position: absolute; left: var(--gutter); bottom: 40px; font-family: var(--mono); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-3); }
.cnt { position: absolute; right: var(--gutter); bottom: 24px; font-size: clamp(64px, 12vw, 180px); font-weight: 800; letter-spacing: -0.06em; line-height: 1; font-variant-numeric: tabular-nums; }
.name { position: absolute; left: var(--gutter); top: 28px; font-weight: 800; letter-spacing: -0.03em; }
.name span { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--ink-3); margin-left: 6px; }
</style>
