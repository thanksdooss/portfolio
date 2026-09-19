<script setup>
import { computed, ref, watchEffect } from 'vue'
import { getProject, publishedProjects } from '../data/projects/index.js'
import { profile } from '../data/profile.js'
import LightBox from '../components/LightBox.vue'

const props = defineProps({ id: { type: String, required: true } })
const base = import.meta.env.BASE_URL
const p = computed(() => getProject(props.id))
const idx = computed(() => publishedProjects.findIndex((x) => x.id === props.id))
const next = computed(() => publishedProjects[(idx.value + 1) % publishedProjects.length])
const lightboxIndex = ref(-1)

// 케이스 스터디 순서: 문제 → 접근 → 내 역할 → 결과 → 기술
const sections = [
  { key: 'problem', label: '문제', en: 'Problem' },
  { key: 'approach', label: '접근', en: 'Approach' },
  { key: 'role', label: '내 역할', en: 'My Role' },
  { key: 'result', label: '결과', en: 'Result' },
]

watchEffect(() => {
  if (p.value) document.title = `${p.value.title} · ${profile.name}`
})
</script>

<template>
  <article v-if="p" class="detail">
    <header class="head">
      <div class="wrap">
        <RouterLink to="/" class="back">← 전체 보기</RouterLink>
        <p class="eyebrow">{{ p.period }} · {{ p.context }}</p>
        <h1>{{ p.title }}</h1>
        <p class="one">{{ p.oneLiner }}</p>
        <dl class="meta">
          <div><dt>역할</dt><dd>{{ p.roleShort }}</dd></div>
          <div><dt>구성</dt><dd>{{ p.team }}</dd></div>
          <div v-if="p.award"><dt>성과</dt><dd>{{ p.award.full }}</dd></div>
        </dl>
        <div v-if="p.links?.length" class="links">
          <a v-for="l in p.links" :key="l.url" class="btn" :href="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a>
        </div>
      </div>
    </header>

    <div class="wrap body">
      <figure v-if="p.cover" class="hero-img">
        <img :src="base + p.cover" :alt="p.coverAlt || p.title" width="1200" height="750" />
        <figcaption v-if="p.coverCaption">{{ p.coverCaption }}</figcaption>
      </figure>

      <ul v-if="p.metrics?.length" class="metrics">
        <li v-for="m in p.metrics" :key="m.label"><b>{{ m.value }}</b><span>{{ m.label }}</span></li>
      </ul>

      <section v-for="s in sections" :key="s.key" class="block">
        <div class="lab"><span>{{ s.en }}</span><h2>{{ s.label }}</h2></div>
        <div class="txt">
          <template v-for="(para, i) in p[s.key]" :key="i">
            <ul v-if="Array.isArray(para)"><li v-for="li in para" :key="li">{{ li }}</li></ul>
            <p v-else>{{ para }}</p>
          </template>
        </div>
      </section>

      <section class="block">
        <div class="lab"><span>Stack</span><h2>기술</h2></div>
        <div class="txt">
          <div class="stack">
            <div v-for="g in p.tech" :key="g.group" class="sg">
              <small>{{ g.group }}</small>
              <div class="tags"><span v-for="t in g.items" :key="t" class="tag">{{ t }}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="p.survey" class="block">
        <div class="lab"><span>Data</span><h2>설문 결과</h2></div>
        <div class="txt">
          <p class="stitle">{{ p.survey.title }}</p>
          <div v-for="q in p.survey.items" :key="q.label" class="q">
            <div class="qh"><span>{{ q.label }}</span><b>{{ q.avg }} / 5</b></div>
            <div class="bars" role="img" :aria-label="`${q.label}: 1점부터 5점까지 ${q.dist.join(', ')}명`">
              <div v-for="(n, k) in q.dist" :key="k" class="bar">
                <span class="fill" :style="{ height: (n / Math.max(...q.dist)) * 100 + '%' }"></span>
                <small>{{ n }}</small>
                <em>{{ k + 1 }}점</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="p.gallery?.length" class="block">
        <div class="lab"><span>Gallery</span><h2>자료</h2></div>
        <div class="txt gal">
          <button v-for="(g, i) in p.gallery" :key="g.src" type="button" class="shot" @click="lightboxIndex = i">
            <img :src="base + g.src" :alt="g.title" loading="lazy" decoding="async" />
            <span>{{ g.title }}</span>
          </button>
        </div>
        <LightBox v-if="lightboxIndex >= 0" :items="p.gallery" :start="lightboxIndex" @close="lightboxIndex = -1" />
      </section>

      <aside v-if="p.note" class="note">
        <b>밝혀 둘 점</b>
        <p v-for="n in [].concat(p.note)" :key="n">{{ n }}</p>
      </aside>

      <nav class="nextp" v-if="next && next.id !== p.id">
        <span class="muted">다음 프로젝트</span>
        <RouterLink :to="`/p/${next.id}`">{{ next.title }} →</RouterLink>
      </nav>
    </div>
  </article>
  <div v-else class="wrap section">
    <p>프로젝트를 찾을 수 없습니다. <RouterLink to="/">처음으로</RouterLink></p>
  </div>
</template>

<style scoped>
.head { padding: 28px 0 32px; border-bottom: 1px solid var(--line); background: var(--surface); }
.back { display: inline-block; font-size: 14px; color: var(--ink-3); text-decoration: none; margin-bottom: 18px; }
.back:hover { color: var(--accent-ink); }
h1 { font-size: clamp(26px, 4.4vw, 40px); margin: 10px 0 10px; }
.one { font-size: 17px; color: var(--ink-2); max-width: 760px; }
.meta { display: flex; flex-wrap: wrap; gap: 10px 28px; margin: 20px 0 0; }
.meta div { display: flex; flex-direction: column; }
.meta dt { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
.meta dd { margin: 0; font-weight: 600; font-size: 14.5px; }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.body { padding-top: 32px; padding-bottom: 72px; }
.hero-img { margin: 0 0 24px; }
.hero-img img { width: 100%; height: auto; border-radius: var(--radius); border: 1px solid var(--line); background: var(--surface); }
.hero-img figcaption { font-size: 13px; color: var(--ink-3); margin-top: 8px; }
.metrics { list-style: none; padding: 0; margin: 0 0 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.metrics li { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; }
.metrics b { font-size: 22px; color: var(--accent-ink); line-height: 1.25; }
.metrics span { font-size: 13px; color: var(--ink-2); }
.block { display: grid; grid-template-columns: 180px 1fr; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--line); }
.lab span { font-family: var(--mono); font-size: 11px; color: var(--accent-ink); text-transform: uppercase; letter-spacing: .08em; }
.lab h2 { font-size: 20px; margin-top: 2px; }
.txt { display: flex; flex-direction: column; gap: 12px; font-size: 16px; color: var(--ink-2); max-width: 760px; }
.txt ul { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
.stack { display: flex; flex-direction: column; gap: 12px; }
.sg small { display: block; font-size: 12.5px; color: var(--ink-3); margin-bottom: 4px; }
.gal { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; max-width: none; }
.shot { padding: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--surface); cursor: zoom-in; text-align: left; }
.shot img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: #fff; }
.shot span { display: block; padding: 8px 10px; font-size: 13px; color: var(--ink-2); }
.stitle { font-weight: 600; color: var(--ink); }
.q { margin-top: 6px; }
.qh { display: flex; justify-content: space-between; font-size: 14.5px; margin-bottom: 8px; }
.qh b { color: var(--accent-ink); }
.bars { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; height: 120px; align-items: end; }
.bar { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 20px; }
.bar .fill { width: 100%; max-width: 48px; background: var(--teal); border-radius: 4px 4px 0 0; min-height: 2px; }
.bar:last-child .fill { background: var(--accent); }
.bar small { font-family: var(--mono); font-size: 11px; color: var(--ink-2); order: -1; margin-bottom: 2px; }
.bar em { position: absolute; bottom: 0; font-style: normal; font-size: 11px; color: var(--ink-3); }
.note { margin-top: 28px; padding: 16px 18px; border-left: 3px solid var(--teal); background: var(--surface); border-radius: 0 10px 10px 0; font-size: 14px; color: var(--ink-2); display: flex; flex-direction: column; gap: 4px; }
.nextp { margin-top: 36px; display: flex; flex-direction: column; gap: 4px; }
.nextp a { font-size: 19px; font-weight: 700; text-decoration: none; color: var(--accent-ink); }
@media (max-width: 719px) {
  .block { grid-template-columns: 1fr; gap: 8px; padding: 22px 0; }
}
</style>
