<script setup>
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile.js'
import { useTrack } from '../composables/useTrack.js'
import { scrollToTarget, gsap, reduceMotion } from '../composables/useSmoothScroll.js'
import LoftCanvas from './LoftCanvas.vue'

const { track } = useTrack()
const root = ref(null)

onMounted(() => {
  if (reduceMotion) return
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from(root.value.querySelectorAll('.line > span'), { yPercent: 110, duration: 1.4, stagger: 0.09, delay: 0.25 })
    .from(root.value.querySelectorAll('.fade'), { opacity: 0, y: 16, duration: 1, stagger: 0.06 }, '-=0.9')
})
</script>

<template>
  <section ref="root" class="hero">
    <LoftCanvas />
    <div class="wrap inner">
      <p class="label fade"><b>●</b>&nbsp; {{ track.eyebrow }}</p>

      <h1 class="headline">
        <span class="line"><span>{{ track.headline[0] }}</span></span>
        <span class="line"><span class="accent">{{ track.headline[1] }}</span></span>
      </h1>

      <div class="below">
        <p class="sub fade">{{ track.sub }}</p>
        <p class="sign fade serif">— Lofting AI, from the drawing to the field.</p>
      </div>

      <div class="foot">
        <dl class="facts">
          <div v-for="f in profile.facts" :key="f.label" class="fade">
            <dt class="label">{{ f.label }}</dt>
            <dd>{{ f.value }}</dd>
          </div>
        </dl>
        <button class="scroll fade" type="button" @click="scrollToTarget('#work')">
          <span class="label">Scroll</span><span class="bar"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 100svh; display: flex; overflow: hidden; }
.inner { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding-top: 120px; padding-bottom: 40px; pointer-events: none; }
.inner > * { pointer-events: auto; }
.headline { margin: 22px 0 28px; font-size: clamp(42px, 7.4vw, 132px); font-weight: 800; letter-spacing: -0.06em; line-height: 0.98; }
.line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.line > span { display: inline-block; }
.accent { color: var(--accent); }
.below { display: grid; grid-template-columns: minmax(0, 560px) 1fr; gap: 24px; align-items: end; }
.sub { font-size: clamp(16px, 1.45vw, 20px); color: var(--ink-2); line-height: 1.65; }
.sign { justify-self: end; font-size: clamp(20px, 2vw, 30px); color: var(--ink-2); }
.foot { margin-top: clamp(40px, 7vh, 88px); padding-top: 22px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; }
.facts { display: grid; grid-template-columns: repeat(4, auto); gap: 12px clamp(20px, 3.4vw, 56px); margin: 0; }
.facts div { display: flex; flex-direction: column; gap: 4px; }
.facts dd { margin: 0; font-size: 14.5px; font-weight: 600; }
.scroll { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.bar { width: 1px; height: 44px; background: var(--line-2); position: relative; overflow: hidden; }
.bar::after { content: ''; position: absolute; inset: 0; background: var(--accent); animation: drip 2s var(--ease) infinite; }
@keyframes drip { 0% { transform: translateY(-100%); } 60%, 100% { transform: translateY(100%); } }
@media (max-width: 859px) {
  .inner { padding-top: 58svh; }
  .below { grid-template-columns: 1fr; }
  .sign { justify-self: start; }
  .facts { grid-template-columns: 1fr 1fr; }
  .scroll { display: none; }
}
</style>
