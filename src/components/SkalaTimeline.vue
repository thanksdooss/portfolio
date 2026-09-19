<script setup>
import { ref, computed } from 'vue'
import { skala } from '../data/skala.js'
import { getProject } from '../data/projects/index.js'
import ProjectCard from './ProjectCard.vue'
import { vReveal } from '../composables/reveal.js'
import { useTrack } from '../composables/useTrack.js'

const { track } = useTrack()

// 과목별 산출물 타임라인. 기본은 핵심 산출물만, "전체 보기"로 모든 과목을 펼친다.
const showAll = ref(false)
const items = computed(() => (showAll.value ? skala.modules : skala.modules.filter((m) => m.highlight)))
const projects = computed(() => skala.projects.filter((id) => !track.featured.includes(id)).map(getProject).filter(Boolean))
const hiddenCount = computed(() => skala.modules.length - skala.modules.filter((m) => m.highlight).length)
</script>

<template>
  <section id="skala" class="section skala">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">SKALA 4기 · {{ skala.period }}</p>
        <h2 class="section-title">{{ skala.title }}</h2>
        <p class="section-desc">{{ skala.desc }}</p>
      </div>

      <div v-if="projects.length" class="projects">
        <ProjectCard v-for="(p, i) in projects" :key="p.id" v-reveal :project="p" :index="i" />
      </div>
      <div v-for="u in skala.upcoming" :key="u.title" class="upcoming card">
        <span class="badge">진행 예정</span>
        <div>
          <b>{{ u.title }}</b> <span class="muted">{{ u.period }}</span>
          <p class="muted">{{ u.note }}</p>
        </div>
      </div>

      <ol class="tl">
        <li v-for="m in items" :key="m.no" v-reveal>
          <span class="date">{{ m.date }}</span>
          <div class="dot" :class="{ hi: m.highlight }" aria-hidden="true"></div>
          <div class="content">
            <h3>{{ m.subject }}</h3>
            <RouterLink v-if="m.project" :to="`/p/${m.project}`" class="plink">케이스 스터디 →</RouterLink>
            <p v-if="m.output" class="out">{{ m.output }}</p>
            <p v-if="m.metric" class="metric">{{ m.metric }}</p>
            <div class="tags"><span v-for="t in m.tags" :key="t" class="tag">{{ t }}</span></div>
          </div>
        </li>
      </ol>
      <button v-if="hiddenCount > 0" class="btn toggle" type="button" @click="showAll = !showAll">
        {{ showAll ? '핵심만 보기' : `전체 ${skala.modules.length}개 과목 보기` }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.skala { background: color-mix(in srgb, var(--surface) 60%, transparent); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
@media (max-width: 719px) { .projects { grid-template-columns: 1fr; } }
.upcoming { display: flex; gap: 14px; align-items: flex-start; padding: 16px 18px; margin-bottom: 36px; border-style: dashed; box-shadow: none; }
.badge { font-size: 12px; font-weight: 700; color: var(--accent-ink); background: var(--accent-soft); padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
.upcoming p { font-size: 14px; margin-top: 2px; }
.tl { list-style: none; margin: 0; padding: 0; position: relative; }
.tl::before { content: ''; position: absolute; left: 116px; top: 6px; bottom: 6px; width: 1px; background: var(--line); }
.tl li { display: grid; grid-template-columns: 100px 32px 1fr; align-items: start; padding: 10px 0 14px; }
.date { font-family: var(--mono); font-size: 12px; color: var(--ink-3); padding-top: 3px; text-align: right; padding-right: 8px; }
.dot { width: 11px; height: 11px; border-radius: 50%; border: 2px solid var(--ink-3); background: var(--bg); margin: 6px 0 0 11px; position: relative; z-index: 1; }
.dot.hi { border-color: var(--accent); background: var(--accent); }
h3 { font-size: 16px; }
.out { font-size: 14.5px; color: var(--ink-2); margin-top: 3px; }
.plink { font-size: 13.5px; font-weight: 600; color: var(--accent-ink); text-decoration: none; }
.metric { font-size: 13.5px; font-weight: 700; color: var(--accent-ink); margin-top: 3px; }
.content .tags { margin-top: 8px; }
.toggle { margin-top: 12px; }
@media (max-width: 559px) {
  .tl::before { left: 5px; }
  .tl li { grid-template-columns: 22px 1fr; }
  .date { grid-column: 2; grid-row: 1; text-align: left; padding: 0; }
  .dot { grid-column: 1; grid-row: 1 / span 2; margin: 5px 0 0 0; }
  .content { grid-column: 2; }
}
</style>
