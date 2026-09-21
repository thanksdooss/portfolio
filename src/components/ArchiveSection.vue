<script setup>
import { ref, computed } from 'vue'
import { archive } from '../data/archive.js'
import { publishedProjects } from '../data/projects/index.js'
import { useTrack } from '../composables/useTrack.js'
import LightBox from './LightBox.vue'
import { ScrollTrigger } from '../composables/useSmoothScroll.js'

const { track } = useTrack()
const base = import.meta.env.BASE_URL

const tabs = computed(() => [
  { id: 'projects', label: 'Projects', ko: '프로젝트', n: publishedProjects.length },
  { id: 'awards', label: 'Awards', ko: '수상', n: archive.awards.length },
  { id: 'cad', label: 'Drawings', ko: 'CAD 도면', n: archive.cad.length },
  { id: 'activities', label: 'Activities', ko: '활동·교육', n: archive.activities.length },
  { id: 'certs', label: 'Education', ko: '학력·자격', n: archive.education.length },
])
const tab = ref('projects')
const projects = computed(() => publishedProjects.map((p) => ({ ...p, featured: track.featured.includes(p.id) })))
const lightboxIndex = ref(-1)
</script>

<template>
  <section id="archive" v-cut class="sec archive" data-section="Archive">
    <div class="wrap">
      <div class="sec-head">
        <p class="label"><b>●</b>&nbsp; <span v-scramble>Archive</span></p>
        <p class="sec-desc">증빙으로 확인한 기록만 남겼습니다.</p>
      </div>
      <h2 v-split class="sec-title">전체 <span class="serif">기록</span></h2>

      <div class="tabs" role="tablist" aria-label="아카이브 분류">
        <button v-for="t in tabs" :key="t.id" role="tab" type="button" :aria-selected="tab === t.id" :class="{ on: tab === t.id }" @click="tab = t.id">
          <span class="tl">{{ t.ko }}</span><sup>{{ t.n }}</sup>
        </button>
      </div>

      <Transition name="swap" mode="out-in" @after-enter="ScrollTrigger.refresh()">
        <div v-if="tab === 'projects'" key="p" class="list" role="tabpanel">
          <RouterLink v-for="p in projects" :key="p.id" :to="`/p/${p.id}`" class="row" data-cursor="View">
            <span class="when label">{{ p.period }}</span>
            <span class="what"><b>{{ p.title }}</b><small>{{ p.oneLiner }}</small></span>
            <span class="side">
              <span v-if="p.featured" class="chip">Selected</span>
              <span v-if="p.award" class="chip hot">{{ p.award.short }}</span>
              <span class="arrow">→</span>
            </span>
          </RouterLink>
        </div>

        <div v-else-if="tab === 'awards'" key="a" class="list" role="tabpanel">
          <div v-for="a in archive.awards" :key="a.title + a.date" class="row">
            <span class="when label">{{ a.date }}</span>
            <span class="what"><b>{{ a.title }}</b><small>{{ a.org }}<template v-if="a.note"> · {{ a.note }}</template></small></span>
            <span class="side"><span class="grade">{{ a.grade }}</span></span>
          </div>
        </div>

        <div v-else-if="tab === 'cad'" key="c" role="tabpanel">
          <div class="gallery">
            <button v-for="(g, i) in archive.cad" :key="g.src" type="button" class="shot" data-cursor="Zoom" @click="lightboxIndex = i">
              <span v-clip class="frame"><img :src="base + g.thumb" :alt="g.title" loading="lazy" decoding="async" /></span>
              <span class="cap"><b>{{ g.title }}</b><span class="label">{{ g.tool }}</span></span>
            </button>
          </div>
        </div>

        <div v-else-if="tab === 'activities'" key="ac" class="list" role="tabpanel">
          <div v-for="a in archive.activities" :key="a.title" class="row">
            <span class="when label">{{ a.date }}</span>
            <span class="what"><b>{{ a.title }}</b><small>{{ a.desc }}</small></span>
            <span class="side"><span v-if="a.kind" class="chip">{{ a.kind }}</span></span>
          </div>
        </div>

        <div v-else key="e" class="list" role="tabpanel">
          <div v-for="c in archive.education" :key="c.title" class="row">
            <span class="when label">{{ c.date }}</span>
            <span class="what"><b>{{ c.title }}</b><small>{{ c.desc }}</small></span>
            <span class="side"><span v-if="c.kind" class="chip">{{ c.kind }}</span></span>
          </div>
        </div>
      </Transition>
      <LightBox v-if="lightboxIndex >= 0" :items="archive.cad" :start="lightboxIndex" @close="lightboxIndex = -1" />
    </div>
  </section>
</template>

<style scoped>
.archive { border-top: 1px solid var(--line); }
.tabs { display: flex; gap: clamp(16px, 3vw, 40px); overflow-x: auto; scrollbar-width: none; margin: clamp(40px, 5vw, 72px) 0 12px; border-bottom: 1px solid var(--line); }
.tabs::-webkit-scrollbar { display: none; }
.tabs button { position: relative; padding: 0 0 16px; white-space: nowrap; color: var(--ink-3); font-size: clamp(17px, 1.8vw, 24px); font-weight: 700; letter-spacing: -0.03em; transition: color .3s; }
.tabs button::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform .5s var(--ease); }
.tabs button.on { color: var(--ink); }
.tabs button.on::after { transform: scaleX(1); }
.tabs sup { font-family: var(--mono); font-size: 10px; font-weight: 400; margin-left: 4px; color: var(--accent-ink); }
.row { display: grid; grid-template-columns: 150px 1fr auto; gap: 24px; align-items: center; padding: 22px 0; border-bottom: 1px solid var(--line); transition: padding .5s var(--ease); }
a.row:hover { padding-left: 12px; }
a.row:hover b { color: var(--accent); }
.what { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.what b { font-size: clamp(16px, 1.4vw, 19px); font-weight: 700; letter-spacing: -0.025em; transition: color .3s; }
.what small { font-size: 14px; color: var(--ink-2); }
.side { display: flex; gap: 8px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }
.arrow { font-size: 18px; color: var(--ink-3); transition: transform .4s var(--ease), color .3s; }
a.row:hover .arrow { transform: translateX(6px); color: var(--accent); }
.grade { font-size: clamp(16px, 1.5vw, 20px); font-weight: 800; color: var(--accent-ink); letter-spacing: -0.03em; }
.gallery { columns: 3 280px; column-gap: 16px; padding-top: 16px; }
.shot { display: block; width: 100%; margin: 0 0 16px; break-inside: avoid; text-align: left; }
.frame { display: block; overflow: hidden; border-radius: 4px; background: #f4f2ec; }
.frame img { width: 100%; height: auto; transition: transform .9s var(--ease), filter .5s; filter: grayscale(0.35) contrast(1.05); }
.shot:hover .frame img { transform: scale(1.04); filter: none; }
.cap { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; padding: 12px 2px 0; }
.cap b { font-size: 14.5px; font-weight: 600; }
.swap-enter-active, .swap-leave-active { transition: opacity .35s, transform .45s var(--ease); }
.swap-enter-from { opacity: 0; transform: translateY(14px); }
.swap-leave-to { opacity: 0; }
@media (max-width: 699px) {
  .row { grid-template-columns: 1fr auto; gap: 6px 12px; }
  .when { grid-column: 1 / -1; }
}
</style>
