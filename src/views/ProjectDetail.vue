<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { getProject, publishedProjects } from '../data/projects/index.js'
import { profile } from '../data/profile.js'
import { gsap, reduceMotion, scrollToTarget } from '../composables/useSmoothScroll.js'
import LightBox from '../components/LightBox.vue'

const props = defineProps({ id: { type: String, required: true } })
const base = import.meta.env.BASE_URL
const p = computed(() => getProject(props.id))
const idx = computed(() => publishedProjects.findIndex((x) => x.id === props.id))
const next = computed(() => publishedProjects[(idx.value + 1) % publishedProjects.length])
const lightboxIndex = ref(-1)
const root = ref(null)
const activeSec = ref('problem')

// 케이스 스터디 순서: 문제 → 접근 → 내 역할 → 결과 → 기술
const sections = computed(() => [
  { key: 'problem', label: '문제', en: 'Problem' },
  { key: 'approach', label: '접근', en: 'Approach' },
  { key: 'role', label: '내 역할', en: 'My Role' },
  { key: 'result', label: '결과', en: 'Result' },
  { key: 'tech', label: '기술', en: 'Stack' },
  ...(p.value?.survey ? [{ key: 'survey', label: '설문', en: 'Data' }] : []),
  ...(p.value?.gallery?.length ? [{ key: 'gallery', label: '자료', en: 'Gallery' }] : []),
])

// "배운 점:"으로 시작하는 문장은 인용구로 따로 뺀다
const isLesson = (t) => typeof t === 'string' && t.startsWith('배운 점')
const resultBody = computed(() => (p.value?.result || []).filter((t) => !isLesson(t)))
const lesson = computed(() => (p.value?.result || []).find(isLesson)?.replace(/^배운 점:\s*/, ''))

let io, ctx
function setup() {
  io?.disconnect(); ctx?.revert()
  if (!root.value) return
  io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (activeSec.value = e.target.dataset.key)), { rootMargin: '-40% 0px -55% 0px' })
  root.value.querySelectorAll('[data-key]').forEach((el) => io.observe(el))
  if (reduceMotion) return
  ctx = gsap.context(() => {
    gsap.from('.t-line > span', { yPercent: 105, duration: 1.3, ease: 'expo.out', stagger: 0.08, delay: 0.1 })
    gsap.from('.hero-img img', { scale: 1.15, duration: 1.8, ease: 'expo.out' })
    gsap.from('.hero-img .clip', { clipPath: 'inset(12% 8% 12% 8%)', duration: 1.6, ease: 'expo.out', delay: 0.2 })
  }, root.value)
}
onMounted(() => nextTick(setup))
watch(() => props.id, () => nextTick(setup))
onUnmounted(() => { io?.disconnect(); ctx?.revert() })
watch(p, (v) => { if (v) document.title = `${v.title} — ${profile.name}` }, { immediate: true })
</script>

<template>
  <article v-if="p" ref="root" :key="p.id" class="cs">
    <header class="wrap head">
      <RouterLink to="/" class="back label">← Index</RouterLink>
      <p class="label"><b>●</b>&nbsp; Case Study — {{ p.context }}</p>
      <h1 class="title"><span class="t-line"><span>{{ p.title }}</span></span></h1>
      <p class="one">{{ p.oneLiner }}</p>
      <dl class="meta">
        <div><dt class="label">Period</dt><dd>{{ p.period }}</dd></div>
        <div><dt class="label">Role</dt><dd>{{ p.roleShort }}</dd></div>
        <div><dt class="label">Team</dt><dd>{{ p.team }}</dd></div>
        <div v-if="p.award"><dt class="label">Result</dt><dd class="hot">{{ p.award.full }}</dd></div>
      </dl>
      <div v-if="p.links?.length" class="links">
        <a v-for="l in p.links" :key="l.url" class="btn-pill" :href="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a>
      </div>
    </header>

    <figure v-if="p.cover" class="wrap hero-img">
      <div class="clip"><img :src="base + p.cover" :alt="p.coverAlt || p.title" /></div>
      <figcaption class="label">{{ p.coverCaption }}</figcaption>
    </figure>

    <div class="wrap">
      <ul v-if="p.metrics?.length" class="metrics">
        <li v-for="m in p.metrics" :key="m.label"><b v-count>{{ m.value }}</b><span>{{ m.label }}</span></li>
      </ul>

      <div class="body">
        <nav class="toc" aria-label="케이스 스터디 목차">
          <button v-for="(s, i) in sections" :key="s.key" type="button" :class="{ on: activeSec === s.key }" @click="scrollToTarget('#s-' + s.key, { offset: -90 })">
            <span class="label">0{{ i + 1 }}</span>{{ s.label }}
          </button>
        </nav>

        <div class="content">
          <section v-for="s in sections.slice(0, 4)" :id="'s-' + s.key" :key="s.key" :data-key="s.key" :data-section="s.en" class="block">
            <p class="label"><b>{{ s.en }}</b></p>
            <h2 v-split>{{ s.label }}</h2>
            <div class="txt">
              <template v-for="(para, i) in s.key === 'result' ? resultBody : p[s.key]" :key="i">
                <ul v-if="Array.isArray(para)"><li v-for="li in para" :key="li">{{ li }}</li></ul>
                <p v-else>{{ para }}</p>
              </template>
            </div>
            <blockquote v-if="s.key === 'result' && lesson" class="quote">
              <span class="label">What I learned</span>
              <p>{{ lesson }}</p>
            </blockquote>
          </section>

          <section id="s-tech" data-key="tech" data-section="Stack" class="block">
            <p class="label"><b>Stack</b></p>
            <h2>기술</h2>
            <div class="stack">
              <div v-for="g in p.tech" :key="g.group" class="sg">
                <span class="label">{{ g.group }}</span>
                <div class="chips"><span v-for="t in g.items" :key="t" class="chip">{{ t }}</span></div>
              </div>
            </div>
          </section>

          <section v-if="p.survey" id="s-survey" data-key="survey" data-section="Data" class="block">
            <p class="label"><b>Data</b></p>
            <h2>{{ p.survey.title }}</h2>
            <div v-for="q in p.survey.items" :key="q.label" class="q">
              <div class="qh"><span>{{ q.label }}</span><b>{{ q.avg }}<small>/5</small></b></div>
              <div class="bars" role="img" :aria-label="`${q.label}: 1점부터 5점까지 ${q.dist.join(', ')}명`">
                <div v-for="(n, k) in q.dist" :key="k" class="bar">
                  <small>{{ n }}</small>
                  <span class="fill" :style="{ height: (n / Math.max(...q.dist)) * 100 + '%' }"></span>
                  <em>{{ k + 1 }}</em>
                </div>
              </div>
            </div>
          </section>

          <section v-if="p.gallery?.length" id="s-gallery" data-key="gallery" data-section="Gallery" class="block">
            <p class="label"><b>Gallery</b></p>
            <h2>자료</h2>
            <div class="gal">
              <button v-for="(g, i) in p.gallery" :key="g.src" type="button" class="shot" data-cursor="Zoom" @click="lightboxIndex = i">
                <span v-clip class="frame"><img :src="base + g.src" :alt="g.title" loading="lazy" decoding="async" /></span>
                <span class="cap">{{ g.title }}</span>
              </button>
            </div>
          </section>

          <aside v-if="p.note" class="note">
            <span class="label">Disclosure — 밝혀 둘 점</span>
            <p v-for="n in [].concat(p.note)" :key="n">{{ n }}</p>
          </aside>
        </div>
      </div>
    </div>

    <RouterLink v-if="next && next.id !== p.id" :to="`/p/${next.id}`" class="nextp" data-cursor="Next">
      <div class="wrap">
        <span class="label">Next case →</span>
        <span class="nt">{{ next.titleShort || next.title }}</span>
        <span class="no">{{ next.oneLiner }}</span>
      </div>
      <img v-if="next.thumb || next.cover" class="nthumb" :src="base + (next.thumb || next.cover)" alt="" aria-hidden="true" />
    </RouterLink>
    <LightBox v-if="lightboxIndex >= 0" :items="p.gallery" :start="lightboxIndex" @close="lightboxIndex = -1" />
  </article>
  <div v-else class="wrap missing">
    <p>프로젝트를 찾을 수 없습니다. <RouterLink to="/" class="link-u">처음으로</RouterLink></p>
  </div>
</template>

<style scoped>
.head { padding-top: 132px; padding-bottom: clamp(48px, 6vw, 80px); display: flex; flex-direction: column; gap: 20px; }
.back { align-self: flex-start; transition: color .3s; margin-bottom: 20px; }
.back:hover { color: var(--accent); }
.title { font-size: clamp(36px, 6.4vw, 104px); font-weight: 800; letter-spacing: -0.055em; line-height: 1.02; max-width: 16ch; }
.t-line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.t-line > span { display: inline-block; }
.one { font-size: clamp(17px, 1.6vw, 22px); color: var(--ink-2); max-width: 820px; line-height: 1.6; }
.meta { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin: 28px 0 0; padding-top: 22px; border-top: 1px solid var(--line); }
.meta div { display: flex; flex-direction: column; gap: 6px; }
.meta dd { margin: 0; font-size: 14.5px; font-weight: 600; line-height: 1.5; }
.meta dd.hot { color: var(--accent-ink); }
.links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }

.hero-img { margin: 0; }
.clip { overflow: hidden; border-radius: 6px; border: 1px solid var(--line); background: var(--bg-2); clip-path: inset(0); }
.clip img { width: 100%; height: auto; }
.hero-img figcaption { padding-top: 14px; }

.metrics { list-style: none; margin: clamp(56px, 7vw, 100px) 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.metrics li { padding: 26px 20px 0 0; display: flex; flex-direction: column; gap: 8px; }
.metrics li + li { border-left: 1px solid var(--line); padding-left: 20px; }
.metrics b { font-size: clamp(34px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.05em; line-height: 1; }
.metrics span { color: var(--ink-2); font-size: 14px; }

.body { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: clamp(24px, 5vw, 96px); margin-top: clamp(72px, 9vw, 140px); }
.toc { position: sticky; top: 110px; align-self: start; display: flex; flex-direction: column; gap: 4px; }
.toc button { text-align: left; display: flex; gap: 12px; align-items: baseline; padding: 6px 0; color: var(--ink-3); font-size: 15px; transition: color .3s, transform .4s var(--ease); }
.toc button.on { color: var(--ink); transform: translateX(8px); }
.toc button.on .label { color: var(--accent); }
.content { max-width: 820px; }
.block { padding-bottom: clamp(64px, 7vw, 110px); }
.block h2 { font-size: clamp(30px, 3.4vw, 50px); letter-spacing: -0.045em; margin: 10px 0 26px; }
.txt { display: flex; flex-direction: column; gap: 18px; font-size: clamp(16px, 1.25vw, 18px); color: var(--ink-2); line-height: 1.8; }
.txt ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; border-top: 1px solid var(--line); }
.txt li { padding: 14px 0 14px 28px; border-bottom: 1px solid var(--line); position: relative; }
.txt li::before { content: ''; position: absolute; left: 4px; top: 1.45em; width: 10px; height: 1px; background: var(--accent); }
.quote { margin: 40px 0 0; padding: 32px 0 0; border-top: 1px solid var(--accent); }
.quote p { font-size: clamp(22px, 2.3vw, 34px); font-weight: 700; letter-spacing: -0.04em; line-height: 1.4; margin-top: 16px; color: var(--ink); }
.stack { display: flex; flex-direction: column; gap: 22px; }
.sg { display: grid; grid-template-columns: 160px 1fr; gap: 16px; align-items: start; padding-bottom: 22px; border-bottom: 1px solid var(--line); }
.q { margin-top: 26px; }
.qh { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; color: var(--ink-2); }
.qh b { font-size: 40px; font-weight: 800; letter-spacing: -0.04em; color: var(--ink); }
.qh small { font-size: 15px; color: var(--ink-3); }
.bars { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; height: 160px; align-items: end; }
.bar { height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 6px; }
.bar .fill { width: 100%; background: var(--line-2); min-height: 2px; }
.bar:last-child .fill { background: var(--accent); }
.bar small { font-family: var(--mono); font-size: 11px; color: var(--ink-2); }
.bar em { font-style: normal; font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
.gal { columns: 2 260px; column-gap: 14px; }
.shot { display: block; width: 100%; margin: 0 0 14px; break-inside: avoid; text-align: left; }
.frame { display: block; overflow: hidden; border-radius: 4px; background: #f4f2ec; }
.frame img { width: 100%; height: auto; transition: transform .9s var(--ease); }
.shot:hover .frame img { transform: scale(1.04); }
.cap { display: block; padding: 10px 2px 0; font-size: 13.5px; color: var(--ink-2); }
.note { padding: 24px 0 0; border-top: 1px dashed var(--line-2); display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--ink-2); margin-bottom: 120px; }
.nextp { display: block; position: relative; overflow: hidden; border-top: 1px solid var(--line); padding: clamp(64px, 9vw, 140px) 0; background: var(--bg-2); transition: background .5s; }
.no { display: block; max-width: 560px; margin-top: 18px; color: var(--ink-2); font-size: 15px; transition: color .5s; }
.nextp:hover .no { color: #0b0c0e; }
.nthumb { position: absolute; right: var(--gutter); top: 50%; width: clamp(200px, 24vw, 380px); aspect-ratio: 4 / 3; object-fit: cover; border-radius: 6px; transform: translateY(-50%) rotate(4deg) scale(0.8); opacity: 0; transition: opacity .5s, transform .8s var(--ease); pointer-events: none; }
.nextp:hover .nthumb { opacity: 1; transform: translateY(-50%) rotate(-2deg) scale(1); }
@media (max-width: 859px) { .nthumb { display: none; } .nt { max-width: none; } }
.nextp:hover { background: var(--accent); color: #0b0c0e; }
.nextp:hover .label { color: #0b0c0e; }
.nt { display: block; max-width: calc(100% - clamp(220px, 27vw, 420px)); margin-top: 16px; font-size: clamp(40px, 8vw, 128px); font-weight: 800; letter-spacing: -0.06em; line-height: 1; }
.missing { padding: 200px var(--gutter); }
@media (max-width: 859px) {
  .meta { grid-template-columns: 1fr 1fr; }
  .body { grid-template-columns: 1fr; }
  .toc { display: none; }
  .metrics { grid-template-columns: 1fr; }
  .metrics li + li { border-left: 0; padding-left: 0; border-top: 1px solid var(--line); margin-top: 20px; }
  .sg { grid-template-columns: 1fr; gap: 10px; }
}
</style>
