<script setup>
import { profile } from '../data/profile.js'
import MarqueeBand from './MarqueeBand.vue'

const year = new Date().getFullYear()
const email = profile.contacts.find((c) => c.label === 'Email')
const stack = ['Python', 'Vue 3', 'Spring Boot', 'PostgreSQL', 'Ollama · Gemma3', 'LoRA · RAG', 'Three.js', 'Unity', 'C# · Modbus', 'LS PLC', 'AutoCAD', 'AVEVA Marine', 'NX Nastran', 'Inventor']
</script>

<template>
  <footer id="contact" class="ftr">
    <MarqueeBand :items="stack" :speed="50" />
    <div class="wrap body">
      <p class="label"><b>●</b>&nbsp; Contact</p>
      <h2 class="big">함께 옮길 <span class="serif">현장</span>을<br />찾고 있습니다.</h2>
      <a v-if="email" class="mail" :href="email.href" data-cursor="Mail">
        <span>{{ email.text }}</span><span class="arr">↗</span>
      </a>
      <div class="cols">
        <div>
          <span class="label">Links</span>
          <a v-for="c in profile.contacts.filter((c) => c.label !== 'Email')" :key="c.label" class="link-u" :href="c.href" target="_blank" rel="noopener">{{ c.label }} — {{ c.text }}</a>
          <a class="link-u" :href="profile.pdf" download>PDF 요약본</a>
        </div>
        <div>
          <span class="label">Colophon</span>
          <p>Vue 3 · Vite · GSAP · Lenis로 직접 만들고 GitHub Actions로 배포했습니다. 첫 화면의 선도(Body Plan)는 캔버스로 그렸습니다.</p>
        </div>
        <div>
          <span class="label">©</span>
          <p>{{ year }} {{ profile.name }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr { background: var(--bg-2); border-top: 1px solid var(--line); }
.body { padding-top: clamp(80px, 10vw, 160px); padding-bottom: 48px; }
.big { font-size: clamp(44px, 8vw, 132px); font-weight: 800; letter-spacing: -0.06em; line-height: 1; margin: 28px 0 40px; }
.big .serif { color: var(--accent); font-weight: 400; }
.mail { display: inline-flex; align-items: center; gap: 16px; font-size: clamp(22px, 3.4vw, 52px); font-weight: 700; letter-spacing: -0.04em; border-bottom: 2px solid var(--line-2); padding-bottom: 8px; transition: border-color .3s, color .3s; }
.mail:hover { color: var(--accent); border-color: var(--accent); }
.arr { transition: transform .5s var(--ease); }
.mail:hover .arr { transform: translate(6px, -6px); }
.cols { margin-top: clamp(80px, 10vw, 140px); padding-top: 24px; border-top: 1px solid var(--line); display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 24px; }
.cols div { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--ink-2); }
.cols div:last-child { align-items: flex-end; }
@media (max-width: 699px) { .cols { grid-template-columns: 1fr; } .cols div:last-child { align-items: flex-start; } }
</style>
