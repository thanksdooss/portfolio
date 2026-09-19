<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { strengths } from '../data/profile.js'
import { gsap, reduceMotion } from '../composables/useSmoothScroll.js'

// 밝은 도면지가 어두운 페이지 위로 올라오고, 원칙 카드 3장이 한 장씩 겹쳐 쌓인다.
const { track } = useTrack()
const ordered = computed(() => track.strengthOrder.map((id) => strengths.find((s) => s.id === id)).filter(Boolean))
const roman = ['I', 'II', 'III']
const root = ref(null)
let ctx

onMounted(() => {
  if (reduceMotion) return
  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.card')
    cards.forEach((c, i) => {
      if (i === cards.length - 1) return
      gsap.to(c, { scale: 0.94, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true } })
    })
  }, root.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="paper" data-section="Principles">
    <div class="wrap">
      <div class="sec-head">
        <p class="label"><b>●</b>&nbsp; Principles</p>
        <p class="sec-desc">일하는 방식 세 가지. 각각을 이 사이트의 케이스 스터디로 증명합니다.</p>
      </div>
      <h2 v-split class="sec-title">일하는 <span class="serif">방식</span></h2>
      <div class="stack">
        <article v-for="(s, i) in ordered" :key="s.id" class="card" :style="{ top: `calc(14vh + ${i * 28}px)` }">
          <div class="l">
            <span class="n serif">{{ roman[i] }}</span>
            <span class="label">Principle {{ i + 1 }} / 3</span>
          </div>
          <div class="r">
            <h3>{{ s.title }}</h3>
            <p>{{ s.body }}</p>
            <p class="proof"><span class="label">Proof</span>{{ s.proof }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.paper {
  --ink: #15171a; --ink-2: #4a4843; --ink-3: #8a857b; --line: rgba(21, 23, 26, 0.12); --line-2: rgba(21, 23, 26, 0.25);
  background: #ebe7de; color: var(--ink); border-radius: 28px 28px 0 0; margin-top: -28px; position: relative; z-index: 2;
  padding: clamp(96px, 12vw, 180px) 0 clamp(80px, 10vw, 160px);
  background-image: linear-gradient(rgba(21, 23, 26, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 23, 26, 0.045) 1px, transparent 1px);
  background-size: 40px 40px;
}
.paper .sec-title .serif { color: var(--ink-3); }
.stack { margin-top: clamp(48px, 6vw, 96px); display: flex; flex-direction: column; gap: 28vh; padding-bottom: 6vh; }
.card {
  position: sticky; display: grid; grid-template-columns: 1fr 2fr; gap: clamp(24px, 4vw, 72px);
  min-height: 52vh; padding: clamp(28px, 4vw, 56px); background: #f7f5f0; border: 1px solid var(--line-2); border-radius: 10px;
  box-shadow: 0 30px 60px -30px rgba(21, 23, 26, 0.35); transform-origin: top center;
}
.l { display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
.n { font-size: clamp(96px, 12vw, 200px); line-height: 0.8; color: #ff5a1f; }
.r { display: flex; flex-direction: column; gap: 18px; justify-content: center; }
h3 { font-size: clamp(30px, 3.6vw, 60px); letter-spacing: -0.05em; font-weight: 800; }
.r p { font-size: clamp(16px, 1.3vw, 19px); color: var(--ink-2); line-height: 1.75; max-width: 620px; }
.proof { display: flex; flex-direction: column; gap: 6px; padding-top: 18px; border-top: 1px solid var(--line); font-weight: 600; color: var(--ink) !important; font-size: 15px !important; }
@media (max-width: 859px) {
  .card { grid-template-columns: 1fr; min-height: 0; }
  .stack { gap: 16px; }
  .card { position: relative; top: auto !important; }
}
</style>
