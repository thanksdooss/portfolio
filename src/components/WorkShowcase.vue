<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { gsap, ScrollTrigger, reduceMotion } from '../composables/useSmoothScroll.js'
import { captureFlip } from '../composables/flip.js'

// 데스크톱: 왼쪽 글이 한 작품씩 지나가고, 오른쪽 "도면 시트" 프레임은 고정된 채 그림(FIG.)만 바뀐다.
// 한 화면에 한 작품 — 스크롤 한 번에 알맞은 양의 정보만 보여 준다.
const props = defineProps({ projects: { type: Array, required: true } })
const base = import.meta.env.BASE_URL
const active = ref(0)
const router = useRouter()
const root = ref(null)
let triggers = []

onMounted(async () => {
  await nextTick()
  root.value.querySelectorAll('.step').forEach((el, i) => {
    triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && (active.value = i) }))
  })
  if (reduceMotion) return
  root.value.querySelectorAll('.step').forEach((el) => {
    triggers.push(gsap.from(el.querySelectorAll('.st'), { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 70%', once: true } }).scrollTrigger)
  })
})
onUnmounted(() => triggers.forEach((t) => t?.kill()))
const img = (p) => base + (p.thumb || p.cover)
const pad = (n) => String(n).padStart(2, '0')

// 지금 보이는 도면을 그대로 케이스 스터디 표지로 이어 준다
function open(e, p) {
  captureFlip(p.id, e.currentTarget.querySelector('.frame img.show') || e.currentTarget.querySelector('img'))
  router.push(`/p/${p.id}`)
}
</script>

<template>
  <div ref="root" class="show">
    <div class="steps">
      <article v-for="(p, i) in projects" :key="p.id" class="step" :class="{ on: active === i }" data-cursor="Open" @click="$event.target.closest('a') || open($event, p)">
        <img v-if="p.thumb || p.cover" class="m-img" :src="img(p)" :alt="p.coverAlt || p.title" loading="lazy" />
        <p class="st label">{{ pad(i + 1) }} / {{ pad(projects.length) }} — {{ p.context }}</p>
        <h3 class="st title">{{ p.titleShort || p.title }}</h3>
        <p class="st one">{{ p.oneLiner }}</p>
        <ul v-if="p.metrics?.length" class="st metrics">
          <li v-for="m in p.metrics" :key="m.label"><b>{{ m.value }}</b><span>{{ m.label }}</span></li>
        </ul>
        <div class="st row">
          <RouterLink v-magnetic :to="`/p/${p.id}`" class="btn-pill solid" data-cursor="Open">케이스 스터디 →</RouterLink>
          <span class="label">{{ p.period }}</span>
        </div>
        <div class="st chips"><span v-for="t in p.tags.slice(0, 6)" :key="t" class="chip">{{ t }}</span></div>
      </article>
    </div>

    <div class="stage" aria-hidden="true">
      <div v-tilt="5" class="sheet" data-cursor="Open" @click="open($event, projects[active])">
        <span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
        <div class="frame">
          <template v-for="(p, i) in projects" :key="p.id">
            <img v-if="p.thumb || p.cover" :src="img(p)" alt="" :class="{ show: active === i, past: i < active }" :style="{ objectPosition: p.thumbPos || 'center' }" />
          </template>
        </div>
        <div class="cap">
          <span class="label">FIG. {{ pad(active + 1) }}</span>
          <Transition name="capt" mode="out-in"><span :key="active" class="capt">{{ projects[active]?.coverCaption || projects[active]?.title }}</span></Transition>
        </div>
        <div class="ticks"><span v-for="(p, i) in projects" :key="p.id" :class="{ on: i <= active }"></span></div>
        <span v-if="projects[active]?.award" class="award">{{ projects[active].award.short }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(32px, 5vw, 96px); }
.step { cursor: pointer; min-height: 88vh; display: flex; flex-direction: column; justify-content: center; gap: 22px; padding: 10vh 0; opacity: 0.28; transition: opacity .6s var(--ease); }
.step.on { opacity: 1; }
.title { font-size: clamp(38px, 4.8vw, 84px); font-weight: 800; letter-spacing: -0.055em; line-height: 1; }
.one { font-size: clamp(16px, 1.3vw, 19px); color: var(--ink-2); line-height: 1.7; max-width: 560px; }
.metrics { list-style: none; margin: 6px 0 0; padding: 18px 0 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.metrics li { display: flex; flex-direction: column; gap: 4px; }
.metrics b { font-size: clamp(22px, 2vw, 32px); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; }
.metrics span { font-size: 12.5px; color: var(--ink-3); line-height: 1.4; }
.row { display: flex; align-items: center; gap: 18px; }
.m-img { display: none; }

.stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; pointer-events: auto; }
.sheet { transform-style: preserve-3d; will-change: transform; cursor: pointer; }
.sheet { position: relative; width: 100%; padding: 22px; border: 1px solid var(--line); background: var(--bg-2); }
.tick { position: absolute; width: 14px; height: 14px; border-color: var(--accent); border-style: solid; border-width: 0; }
.tl { left: -1px; top: -1px; border-left-width: 1px; border-top-width: 1px; }
.tr { right: -1px; top: -1px; border-right-width: 1px; border-top-width: 1px; }
.bl { left: -1px; bottom: -1px; border-left-width: 1px; border-bottom-width: 1px; }
.br { right: -1px; bottom: -1px; border-right-width: 1px; border-bottom-width: 1px; }
.frame { position: relative; aspect-ratio: 16 / 11; overflow: hidden; background: var(--bg-3); }
.frame img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  clip-path: inset(100% 0 0 0); transform: scale(1.12); transition: clip-path 1s var(--ease), transform 1.4s var(--ease);
}
.frame img.past { clip-path: inset(0 0 0 0); transform: scale(1); }
.frame img.show { clip-path: inset(0 0 0 0); transform: scale(1); z-index: 1; }
.cap { display: flex; gap: 16px; align-items: baseline; padding-top: 16px; min-height: 44px; }
.capt { font-size: 13.5px; color: var(--ink-2); }
.capt-enter-active, .capt-leave-active { transition: opacity .3s, transform .4s var(--ease); }
.capt-enter-from { opacity: 0; transform: translateY(8px); }
.capt-leave-to { opacity: 0; }
.ticks { display: flex; gap: 6px; margin-top: 10px; }
.ticks span { flex: 1; height: 2px; background: var(--line); transition: background .5s; }
.ticks span.on { background: var(--accent); }
.award { position: absolute; top: 36px; right: 36px; z-index: 2; background: var(--accent); color: #0b0c0e; font-weight: 800; font-size: 13px; padding: 6px 12px; border-radius: 999px; }

@media (max-width: 959px) {
  .show { grid-template-columns: 1fr; }
  .stage { display: none; }
  .step { min-height: 0; opacity: 1; padding: 48px 0; border-top: 1px solid var(--line); }
  .m-img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 4px; }
}
</style>
