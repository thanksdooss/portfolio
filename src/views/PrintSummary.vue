<script setup>
import { computed, onMounted } from 'vue'
import { profile, strengths } from '../data/profile.js'
import { getProject } from '../data/projects/index.js'
import { archive } from '../data/archive.js'
import { skala } from '../data/skala.js'
import { useTrack } from '../composables/useTrack.js'

// 제출용 PDF 요약본(A4 2쪽). scripts/make-pdf.mjs 가 이 화면(#/print)을 PDF로 인쇄한다.
const { track } = useTrack()
const site = 'thanksdooss.github.io/portfolio'
const featured = computed(() => track.featured.map(getProject).filter(Boolean))
const extra = computed(() => ['clean-factory', 'ai-booth'].map(getProject).filter(Boolean))
const ordered = computed(() => track.strengthOrder.map((id) => strengths.find((s) => s.id === id)))
const awards = archive.awards
const skalaHi = skala.modules.filter((m) => m.highlight && !m.project)
const certs = archive.education.filter((e) => e.kind === '자격')

onMounted(() => (document.title = `${profile.name}_포트폴리오_요약`))
</script>

<template>
  <div class="print">
    <section class="page">
      <header class="top">
        <div>
          <p class="eyebrow">{{ track.eyebrow }}</p>
          <h1>{{ profile.name }} <small>{{ track.headline.join(' ') }}</small></h1>
          <p class="sub">{{ track.sub }}</p>
        </div>
        <ul class="contact">
          <li><b>Web</b> {{ site }}</li>
          <li><b>GitHub</b> github.com/thanksdooss</li>
          <li v-for="c in profile.contacts.filter((c) => c.label !== 'GitHub')" :key="c.label"><b>{{ c.label }}</b> {{ c.text }}</li>
        </ul>
      </header>

      <div class="cols3">
        <div v-for="s in ordered" :key="s.id" class="str">
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </div>
      </div>

      <h2>대표 프로젝트</h2>
      <article v-for="p in featured" :key="p.id" class="proj">
        <div class="ph">
          <h3>{{ p.title }}</h3>
          <span>{{ p.period }}</span>
        </div>
        <p class="ctx">{{ p.context }} · {{ p.roleShort }}<template v-if="p.award"> · <b>{{ p.award.short }}</b></template></p>
        <p class="line">{{ p.pdf.line }}</p>
        <ul class="pm"><li v-for="m in p.metrics" :key="m.label"><b>{{ m.value }}</b> {{ m.label }}</li></ul>
        <p class="ptags">{{ p.tags.join(' · ') }}</p>
      </article>

      <h2>그 밖의 프로젝트</h2>
      <article v-for="p in extra" :key="p.id" class="proj">
        <div class="ph"><h3>{{ p.title }}</h3><span>{{ p.period }}</span></div>
        <p class="ctx">{{ p.context }} · {{ p.roleShort }}<template v-if="p.award"> · <b>{{ p.award.short }}</b></template></p>
        <p class="line">{{ p.pdf.line }}</p>
      </article>
    </section>

    <section class="page">
      <div class="cols2">
        <div>
          <h2>학력 · 교육 · 자격</h2>
          <ul class="list">
            <li><b>{{ profile.education.major }} / {{ profile.education.double }}</b><span>누계 평점 {{ profile.education.gpa }} · {{ profile.education.graduation }}</span></li>
            <li><b>SK AX 채용연계형 AI 교육 SKALA 4기 (DT)</b><span>{{ skala.period }}</span></li>
            <li v-for="c in certs" :key="c.title"><b>{{ c.title }}</b><span>{{ c.desc }}</span></li>
          </ul>

          <h2>SKALA 과목별 산출물</h2>
          <ul class="list">
            <li v-for="m in skalaHi" :key="m.no"><b>{{ m.subject }}</b><span>{{ m.metric || m.output }}</span></li>
            <li><b>미니 프로젝트 · Vue.js</b><span>SKAVOCA(풀스택 개인), SKALA marine(Vue 3 개인)</span></li>
            <li><b>팀 프로젝트</b><span>2026.10.28 – 12.09 진행 예정</span></li>
          </ul>
        </div>
        <div>
          <h2>수상</h2>
          <ul class="list">
            <li v-for="a in awards" :key="a.title + a.date"><b>{{ a.grade }} — {{ a.title }}</b><span>{{ a.date }} · {{ a.org }}<template v-if="a.note"> · {{ a.note }}</template></span></li>
          </ul>

          <h2>설계 도구</h2>
          <p class="tools">AutoCAD(배관 배치도) · AVEVA Marine(선체 단면) · Siemens NX · NX Nastran(정적·열·모달 해석) · Autodesk Inventor · LS XG5000</p>
        </div>
      </div>
      <footer class="foot">상세 케이스 스터디와 도면 갤러리: {{ site }}</footer>
    </section>
  </div>
</template>

<style scoped>
.print { background: #fff; color: #111a26; --ink-2: #3c4859; }
.page { width: 210mm; min-height: 297mm; padding: 14mm 14mm 12mm; margin: 0 auto; position: relative; background: #fff; }
@media screen { .print { background: #ddd; padding: 16px 0; } .page { margin-bottom: 16px; box-shadow: 0 2px 12px rgba(0,0,0,.15); } }
@media print { .page { break-after: page; } .page:last-child { break-after: auto; } }
.top { display: flex; justify-content: space-between; gap: 16px; border-bottom: 2px solid #0f2a47; padding-bottom: 8mm; }
.eyebrow { color: #b8430a; }
h1 { font-size: 26px; margin: 4px 0 6px; }
h1 small { display: block; font-size: 15px; color: #b8430a; font-weight: 700; margin-top: 2px; }
.sub { font-size: 12.5px; color: var(--ink-2); max-width: 125mm; }
.contact { list-style: none; margin: 0; padding: 0; font-size: 11.5px; min-width: 58mm; }
.contact li { padding: 2px 0; }
.contact b { display: inline-block; width: 14mm; font-family: var(--mono); font-size: 10px; color: #6b7686; font-weight: 600; }
.cols3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; margin: 6mm 0 4mm; }
.str h3 { font-size: 13px; color: #0f2a47; }
.str p { font-size: 11px; color: var(--ink-2); margin-top: 2px; line-height: 1.5; }
h2 { font-size: 14px; margin: 6mm 0 3mm; padding-bottom: 1.5mm; border-bottom: 1px solid #d9d7ce; color: #0f2a47; }
.proj { padding: 2.6mm 0; border-bottom: 1px dashed #e2e0d8; }
.ph { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.ph h3 { font-size: 13.5px; }
.ph span { font-family: var(--mono); font-size: 10.5px; color: #6b7686; white-space: nowrap; }
.ctx { font-size: 11px; color: #6b7686; margin-top: 1px; }
.ctx b { color: #b8430a; }
.line { font-size: 12px; margin-top: 2px; }
.pm { list-style: none; margin: 2px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 3px 14px; font-size: 10.5px; color: var(--ink-2); }
.pm b { color: #b8430a; }
.ptags { font-family: var(--mono); font-size: 9.5px; color: #6b7686; margin-top: 2px; }
.cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
.cols2 h2:first-child { margin-top: 0; }
.list { list-style: none; margin: 0; padding: 0; }
.list li { display: flex; flex-direction: column; padding: 1.6mm 0; border-bottom: 1px dashed #e2e0d8; }
.list b { font-size: 11.5px; font-weight: 600; }
.list span { font-size: 10.5px; color: var(--ink-2); line-height: 1.45; }
.tools { font-size: 11px; color: var(--ink-2); }
.foot { position: absolute; bottom: 10mm; left: 14mm; right: 14mm; font-size: 10px; color: #6b7686; border-top: 1px solid #d9d7ce; padding-top: 2mm; }
</style>

<style>
@page { size: A4; margin: 0; }
@media print { body { background: #fff !important; } }
</style>
