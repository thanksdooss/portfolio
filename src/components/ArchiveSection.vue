<script setup>
import { ref, computed } from 'vue'
import { archive } from '../data/archive.js'
import { publishedProjects } from '../data/projects/index.js'
import { useTrack } from '../composables/useTrack.js'
import LightBox from './LightBox.vue'

const { track } = useTrack()
const base = import.meta.env.BASE_URL

const tabs = [
  { id: 'projects', label: '프로젝트' },
  { id: 'awards', label: '수상' },
  { id: 'cad', label: 'CAD 갤러리' },
  { id: 'activities', label: '활동·교육' },
  { id: 'certs', label: '학력·자격' },
]
const tab = ref('projects')

// 대표작에 없는 프로젝트까지 모두 보여준다(대표작은 표시만).
const projects = computed(() => publishedProjects.map((p) => ({ ...p, featured: track.featured.includes(p.id) })))

const lightboxIndex = ref(-1)
</script>

<template>
  <section id="archive" class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Archive</p>
        <h2 class="section-title">전체 기록</h2>
        <p class="section-desc">대표작 밖의 프로젝트, 수상, 설계 도면, 교육 이력을 모아 두었습니다.</p>
      </div>

      <div class="tabs" role="tablist" aria-label="아카이브 분류">
        <button v-for="t in tabs" :key="t.id" role="tab" type="button" :aria-selected="tab === t.id" :class="{ on: tab === t.id }" @click="tab = t.id">
          {{ t.label }}
        </button>
      </div>

      <div v-if="tab === 'projects'" class="list" role="tabpanel">
        <RouterLink v-for="p in projects" :key="p.id" :to="`/p/${p.id}`" class="row">
          <span class="when">{{ p.period }}</span>
          <span class="what"><b>{{ p.title }}</b><small>{{ p.oneLiner }}</small></span>
          <span class="side">
            <span v-if="p.featured" class="tag">대표작</span>
            <span v-if="p.award" class="tag hot">{{ p.award.short }}</span>
          </span>
        </RouterLink>
      </div>

      <div v-else-if="tab === 'awards'" class="list" role="tabpanel">
        <div v-for="a in archive.awards" :key="a.title" class="row static">
          <span class="when">{{ a.date }}</span>
          <span class="what"><b>{{ a.title }}</b><small>{{ a.org }}<template v-if="a.note"> · {{ a.note }}</template></small></span>
          <span class="side"><span class="tag hot">{{ a.grade }}</span></span>
        </div>
      </div>

      <div v-else-if="tab === 'cad'" role="tabpanel">
        <div class="gallery">
          <button v-for="(g, i) in archive.cad" :key="g.src" type="button" class="shot" @click="lightboxIndex = i">
            <img :src="base + g.thumb" :alt="g.title" loading="lazy" decoding="async" />
            <span class="cap"><b>{{ g.title }}</b><small>{{ g.tool }}</small></span>
          </button>
        </div>
        <LightBox v-if="lightboxIndex >= 0" :items="archive.cad" :start="lightboxIndex" @close="lightboxIndex = -1" />
      </div>

      <div v-else-if="tab === 'activities'" class="list" role="tabpanel">
        <div v-for="a in archive.activities" :key="a.title" class="row static">
          <span class="when">{{ a.date }}</span>
          <span class="what"><b>{{ a.title }}</b><small>{{ a.desc }}</small></span>
          <span class="side"><span v-if="a.kind" class="tag">{{ a.kind }}</span></span>
        </div>
      </div>

      <div v-else class="list" role="tabpanel">
        <div v-for="c in archive.education" :key="c.title" class="row static">
          <span class="when">{{ c.date }}</span>
          <span class="what"><b>{{ c.title }}</b><small>{{ c.desc }}</small></span>
          <span class="side"><span v-if="c.kind" class="tag">{{ c.kind }}</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 18px; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tabs button {
  border: 1px solid var(--line); background: var(--surface); padding: 8px 14px; border-radius: 999px;
  cursor: pointer; font-size: 14px; white-space: nowrap; color: var(--ink-2);
}
.tabs button.on { background: var(--navy); border-color: var(--navy); color: var(--bg); font-weight: 600; }
.list { border-top: 1px solid var(--line); }
.row {
  display: grid; grid-template-columns: 120px 1fr auto; gap: 16px; align-items: center;
  padding: 14px 6px; border-bottom: 1px solid var(--line); text-decoration: none;
}
a.row:hover { background: var(--surface); }
.when { font-family: var(--mono); font-size: 12px; color: var(--ink-3); }
.what { display: flex; flex-direction: column; min-width: 0; }
.what b { font-size: 15.5px; font-weight: 600; }
.what small { font-size: 13.5px; color: var(--ink-2); }
.side { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.tag.hot { background: var(--accent-soft); color: var(--accent-ink); border-color: transparent; font-weight: 700; }
@media (max-width: 599px) {
  .row { grid-template-columns: 1fr auto; gap: 4px 10px; }
  .when { grid-column: 1 / -1; }
}
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
.shot { padding: 0; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface); cursor: zoom-in; text-align: left; }
.shot img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: #fff; }
.shot .cap { display: flex; flex-direction: column; padding: 10px 12px; }
.shot .cap b { font-size: 14.5px; }
.shot .cap small { font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }
</style>
