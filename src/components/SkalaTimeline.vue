<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { skala } from '../data/skala.js'
import { getProject } from '../data/projects/index.js'
import { useTrack } from '../composables/useTrack.js'
import { gsap, ScrollTrigger, reduceMotion } from '../composables/useSmoothScroll.js'
import WorkIndex from './WorkIndex.vue'

// 데스크톱: 섹션이 고정된 채 과목 카드가 가로로 흘러간다(20개 과목을 한 줄의 공정표처럼).
// 모바일·모션 최소화: 손가락으로 넘기는 가로 스크롤.
const { track } = useTrack()
const projects = computed(() => skala.projects.filter((id) => !track.featured.includes(id)).map(getProject).filter(Boolean))
const pin = ref(null)
const rail = ref(null)
let ctx

onMounted(() => {
  if (reduceMotion) return
  const mm = gsap.matchMedia()
  mm.add('(min-width: 860px)', () => {
    const dist = () => rail.value.scrollWidth - window.innerWidth + 80
    const tween = gsap.to(rail.value, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: pin.value, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true },
    })
    return () => tween.scrollTrigger?.kill()
  })
  ctx = mm
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="skala" class="skala">
    <div ref="pin" class="pin">
      <div class="wrap head">
        <p class="label"><b>●</b>&nbsp; SKALA 4th · {{ skala.period }}</p>
        <h2 class="sec-title">과목마다, <span class="serif">남긴 것</span></h2>
        <p class="desc">{{ skala.title }} — {{ skala.desc }}</p>
      </div>
      <div class="viewport">
        <ol ref="rail" class="rail">
          <li v-for="m in skala.modules" :key="m.no" class="card" :class="{ hi: m.highlight }">
            <div class="top">
              <span class="label">No.{{ String(m.no).padStart(2, '0') }} · {{ m.date }}</span>
              <span v-if="m.highlight" class="dot" aria-label="핵심 산출물"></span>
            </div>
            <h3>{{ m.subject }}</h3>
            <p v-if="m.output" class="out">{{ m.output }}</p>
            <p v-if="m.metric" class="metric">{{ m.metric }}</p>
            <RouterLink v-if="m.project" :to="`/p/${m.project}`" class="go link-u" data-cursor="Case">케이스 스터디 →</RouterLink>
            <div class="chips"><span v-for="t in m.tags" :key="t" class="chip">{{ t }}</span></div>
          </li>
          <li v-for="u in skala.upcoming" :key="u.title" class="card next">
            <span class="label">{{ u.period }}</span>
            <h3>{{ u.title }}</h3>
            <p class="out">{{ u.note }}</p>
            <span class="serif soon">Coming soon</span>
          </li>
        </ol>
      </div>
    </div>
    <div v-if="projects.length" class="wrap extra">
      <WorkIndex :projects="projects" />
    </div>
  </section>
</template>

<style scoped>
.skala { border-top: 1px solid var(--line); }
.pin { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 110px 0 60px; overflow: hidden; }
.head { width: 100%; }
.head .sec-title { margin: 18px 0 14px; }
.desc { color: var(--ink-2); max-width: 720px; font-size: 15.5px; }
.viewport { margin-top: clamp(32px, 5vh, 56px); }
.rail { list-style: none; margin: 0; padding: 0 var(--gutter); display: flex; gap: 16px; width: max-content; }
.card {
  width: clamp(260px, 22vw, 320px); min-height: 300px; padding: 22px; border: 1px solid var(--line); border-radius: 4px;
  background: var(--bg-2); display: flex; flex-direction: column; gap: 12px; transition: border-color .3s, transform .5s var(--ease);
}
.card:hover { border-color: var(--line-2); transform: translateY(-6px); }
.card.hi { border-color: rgba(255, 90, 31, 0.45); }
.top { display: flex; justify-content: space-between; align-items: center; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 5px rgba(255, 90, 31, .15); }
h3 { font-size: 20px; letter-spacing: -0.035em; }
.out { color: var(--ink-2); font-size: 14px; line-height: 1.6; }
.metric { color: var(--accent-ink); font-size: 13.5px; font-weight: 700; }
.go { color: var(--accent-ink); font-size: 13.5px; font-weight: 600; align-self: flex-start; }
.chips { margin-top: auto; }
.next { border-style: dashed; background: transparent; justify-content: flex-start; }
.soon { font-size: 34px; color: var(--accent-ink); margin-top: auto; }
.extra { padding-bottom: 120px; }
@media (max-width: 859px), (prefers-reduced-motion: reduce) {
  .pin { min-height: 0; padding: 96px 0 72px; }
  .viewport { overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .viewport::-webkit-scrollbar { display: none; }
  .card { scroll-snap-align: start; width: 78vw; max-width: 320px; }
}
</style>
