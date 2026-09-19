<script setup>
import { onMounted, onUnmounted, ref, reactive, watch } from 'vue'
import { profile } from '../data/profile.js'
import { useTrack } from '../composables/useTrack.js'
import { scrollToTarget, gsap, SplitText, reduceMotion } from '../composables/useSmoothScroll.js'
import { introDone } from '../composables/intro.js'
import LoftCanvas from './LoftCanvas.vue'

const { track } = useTrack()
const root = ref(null)
const head = ref(null)
// 스크롤하면 선도가 실물 크기로 커지며(=현도) 흐려진다
const loft = reactive({ zoom: 1, fade: 1, start: false })
let ctx, split, chars = [], raf = 0, mx = -9999, my = -9999

// 커서 가까운 글자일수록 굵게(가변 폰트 wght 축)
function proximity() {
  for (const c of chars) {
    const r = c.getBoundingClientRect()
    const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2))
    const w = 620 + 300 * Math.max(0, 1 - d / 260)
    c.style.fontVariationSettings = `'wght' ${w.toFixed(0)}`
  }
  raf = 0
}
const onMove = (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(proximity) }

function play() {
  loft.start = true
  if (reduceMotion) return
  ctx = gsap.context(() => {
    split = SplitText.create(head.value.querySelectorAll('.line'), { type: 'words,chars', wordsClass: 'wd', charsClass: 'ch' })
    chars = split.chars
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(chars, { yPercent: 120, rotate: 8, duration: 1.3, stagger: 0.028 })
      .from('.fade', { opacity: 0, y: 18, duration: 1, stagger: 0.07 }, '-=1.0')
    gsap.to(loft, { zoom: 2.2, fade: 0, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.inner', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
  }, root.value)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) window.addEventListener('pointermove', onMove, { passive: true })
}

onMounted(() => (introDone.value ? play() : watch(introDone, (v) => v && play())))
onUnmounted(() => { ctx?.revert(); window.removeEventListener('pointermove', onMove) })
</script>

<template>
  <section ref="root" class="hero" data-section="Index">
    <LoftCanvas :state="loft" />
    <div class="wrap inner" :class="{ pre: !introDone }">
      <p class="label fade"><b>●</b>&nbsp; {{ track.eyebrow }}</p>

      <h1 ref="head" class="headline" :aria-label="track.headline.join(' ')">
        <span class="line" aria-hidden="true">{{ track.headline[0] }}</span>
        <span class="line accent" aria-hidden="true">{{ track.headline[1] }}</span>
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
        <button v-magnetic class="scroll fade" type="button" data-cursor="Scroll" @click="scrollToTarget('#philosophy')">
          <span class="label">Scroll</span><span class="bar"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 100svh; display: flex; overflow: hidden; }
.inner { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding-top: 120px; padding-bottom: 40px; pointer-events: none; }
.inner.pre { visibility: hidden; }
.inner > * { pointer-events: auto; }
.headline { margin: 22px 0 28px; font-size: clamp(42px, 7.4vw, 132px); font-weight: 800; letter-spacing: -0.06em; line-height: 1.0; }
.line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.04em; }
.line :deep(.wd) { display: inline-block; white-space: nowrap; }
.line :deep(.ch) { display: inline-block; transition: font-variation-settings .25s; }
.accent { color: var(--accent); }
.below { display: grid; grid-template-columns: minmax(0, 560px) 1fr; gap: 24px; align-items: end; }
.sub { font-size: clamp(16px, 1.45vw, 20px); color: var(--ink-2); line-height: 1.65; }
.sign { justify-self: end; font-size: clamp(20px, 2vw, 30px); color: var(--ink-2); }
.foot { margin-top: clamp(40px, 7vh, 88px); padding-top: 22px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; }
.facts { display: grid; grid-template-columns: repeat(4, auto); gap: 12px clamp(20px, 3.4vw, 56px); margin: 0; }
.facts div { display: flex; flex-direction: column; gap: 4px; }
.facts dd { margin: 0; font-size: 14.5px; font-weight: 600; }
.scroll { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 10px; }
.bar { width: 1px; height: 44px; background: var(--line-2); position: relative; overflow: hidden; }
.bar::after { content: ''; position: absolute; inset: 0; background: var(--accent); animation: drip 2s var(--ease) infinite; }
@keyframes drip { 0% { transform: translateY(-100%); } 60%, 100% { transform: translateY(100%); } }
@media (max-width: 859px) {
  .inner { padding-top: 52svh; }
  .below { grid-template-columns: 1fr; }
  .sign { justify-self: start; }
  .facts { grid-template-columns: 1fr 1fr; }
  .scroll { display: none; }
}
</style>
