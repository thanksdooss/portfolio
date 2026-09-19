<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { manifesto, stats } from '../data/profile.js'
import { gsap, ScrollTrigger, reduceMotion } from '../composables/useSmoothScroll.js'

// 스크롤하면 문장이 한 단어씩 먹선처럼 진해진다
const root = ref(null)
const words = manifesto.body.split(' ')
let ctx

onMounted(() => {
  if (reduceMotion) return
  ctx = gsap.context(() => {
    gsap.fromTo(root.value.querySelectorAll('.w'), { opacity: 0.14 }, {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: root.value.querySelector('.body'), start: 'top 78%', end: 'bottom 45%', scrub: true },
    })
    root.value.querySelectorAll('.num').forEach((el) => {
      const v = parseFloat(el.dataset.v)
      if (Number.isNaN(v)) return
      const o = { n: 0 }
      gsap.to(o, {
        n: v, duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => (el.textContent = o.n.toFixed(el.dataset.d)),
      })
    })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="sec manifesto">
    <div class="wrap">
      <p class="label"><b>●</b>&nbsp; {{ manifesto.label }}</p>
      <div class="grid">
        <p class="lead">{{ manifesto.lead }}</p>
        <p class="body"><template v-for="(w, i) in words" :key="i"><span class="w">{{ w }}</span>{{ ' ' }}</template></p>
      </div>
      <p class="sign serif">{{ manifesto.sign }}</p>

      <ul class="stats">
        <li v-for="s in stats" :key="s.label">
          <span class="big"><span class="num" :data-v="s.unit ? s.value : ''" :data-d="(s.value.split('.')[1] || '').length">{{ s.value }}</span><small v-if="s.unit">{{ s.unit }}</small></span>
          <span class="l">{{ s.label }}</span>
          <span class="label">{{ s.note }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.manifesto { border-top: 1px solid var(--line); }
.grid { display: grid; grid-template-columns: 1fr 2fr; gap: clamp(24px, 4vw, 64px); margin-top: 40px; }
.lead { font-size: clamp(18px, 1.6vw, 22px); color: var(--ink-2); padding-top: 0.5em; }
.body { font-size: clamp(26px, 3.4vw, 54px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.28; }
.sign { margin-top: 40px; text-align: right; font-size: clamp(22px, 2.4vw, 36px); color: var(--accent-ink); }
.stats { list-style: none; margin: clamp(80px, 10vw, 160px) 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
.stats li { padding: 28px 20px 0 0; display: flex; flex-direction: column; gap: 8px; border-right: 1px solid var(--line); padding-left: 20px; }
.stats li:first-child { padding-left: 0; }
.stats li:last-child { border-right: 0; }
.big { font-size: clamp(44px, 5.4vw, 88px); font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
.big small { font-size: 0.36em; color: var(--ink-3); font-weight: 600; letter-spacing: -0.02em; margin-left: 4px; }
.l { font-weight: 600; font-size: 15px; margin-top: 8px; }
@media (max-width: 859px) {
  .grid { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr 1fr; }
  .stats li { padding: 24px 12px 24px 0; border-bottom: 1px solid var(--line); }
  .stats li:nth-child(2n) { border-right: 0; padding-left: 16px; }
  .stats li:nth-child(2n + 1) { padding-left: 0; }
}
</style>
