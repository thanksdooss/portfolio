<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'
import { scrollToTarget } from '../composables/useSmoothScroll.js'
import MarqueeBand from './MarqueeBand.vue'

const year = new Date().getFullYear()
const email = profile.contacts.find((c) => c.label === 'Email')
const stack = ['Python', 'Vue 3', 'Spring Boot', 'PostgreSQL', 'Ollama · Gemma3', 'LoRA · RAG', 'Three.js', 'Unity', 'C# · Modbus', 'LS PLC', 'AutoCAD', 'AVEVA Marine', 'NX Nastran', 'Inventor']

// 한국 시간 시계 — "지금 연락하면 몇 시인지" 알려 주는 작은 디테일
const time = ref('')
let t
const tick = () => (time.value = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
onMounted(() => { tick(); t = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(t))

const copied = ref(false)
async function copy() {
  try { await navigator.clipboard.writeText(email.text); copied.value = true; setTimeout(() => (copied.value = false), 1800) } catch {}
}
</script>

<template>
  <footer id="contact" class="ftr" data-section="Contact">
    <MarqueeBand :items="stack" :speed="50" />
    <div class="wrap body">
      <p class="label"><b>●</b>&nbsp; Contact</p>
      <h2 v-split class="big">함께 옮길 <span class="serif">현장</span>을<br />찾고 있습니다.</h2>
      <div v-if="email" class="mailrow">
        <a v-magnetic="0.15" class="mail" :href="email.href" data-cursor="Mail">
          <span>{{ email.text }}</span><span class="arr">↗</span>
        </a>
        <button type="button" class="copy label" @click="copy">{{ copied ? 'Copied ✓' : 'Copy' }}</button>
      </div>
      <div class="cols">
        <div>
          <span class="label">Links</span>
          <a v-for="c in profile.contacts.filter((c) => c.label !== 'Email')" :key="c.label" class="link-u" :href="c.href" target="_blank" rel="noopener">{{ c.label }} — {{ c.text }}</a>
          <a class="link-u" :href="profile.pdf" download>PDF 요약본 ↓</a>
        </div>
        <div>
          <span class="label">Colophon</span>
          <p>Vue 3 · Vite · GSAP · Lenis로 직접 만들고 GitHub Actions로 배포했습니다. 첫 화면의 선도(Body Plan)는 캔버스에 수식으로 그렸습니다.</p>
        </div>
        <div>
          <span class="label">Local time · KST</span>
          <p class="clock">{{ time }}</p>
        </div>
      </div>
      <div class="bottom">
        <span class="label">© {{ year }} {{ profile.name }}</span>
        <button v-magnetic class="top label" type="button" data-cursor="Top" @click="scrollToTarget(0)">Back to top ↑</button>
      </div>
    </div>
    <p class="giant" aria-hidden="true">KIM JINNYEONG</p>
  </footer>
</template>

<style scoped>
.ftr { background: var(--bg-2); border-top: 1px solid var(--line); overflow: hidden; }
.body { padding-top: clamp(80px, 10vw, 160px); padding-bottom: 40px; }
.big { font-size: clamp(44px, 8vw, 132px); font-weight: 800; letter-spacing: -0.06em; line-height: 1.02; margin: 28px 0 44px; }
.big .serif { color: var(--accent); font-weight: 400; }
.mailrow { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.mail { display: inline-flex; align-items: center; gap: 16px; font-size: clamp(22px, 3.4vw, 52px); font-weight: 700; letter-spacing: -0.04em; border-bottom: 2px solid var(--line-2); padding-bottom: 8px; transition: border-color .3s, color .3s; }
.mail:hover { color: var(--accent); border-color: var(--accent); }
.arr { transition: transform .5s var(--ease); }
.mail:hover .arr { transform: translate(6px, -6px); }
.copy { border: 1px solid var(--line-2); border-radius: 999px; padding: 8px 14px; transition: color .3s, border-color .3s; }
.copy:hover { color: var(--accent); border-color: var(--accent); }
.cols { margin-top: clamp(80px, 10vw, 140px); padding-top: 24px; border-top: 1px solid var(--line); display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 24px; }
.cols div { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--ink-2); }
.cols div:last-child { align-items: flex-end; text-align: right; }
.clock { font-family: var(--mono); font-size: 22px; color: var(--ink); font-variant-numeric: tabular-nums; }
.bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 56px; }
.top { padding: 10px 16px; border: 1px solid var(--line-2); border-radius: 999px; }
.top:hover { color: var(--accent); border-color: var(--accent); }
.giant { margin: 0; padding: 0 var(--gutter); font-size: 13.2vw; font-weight: 800; letter-spacing: -0.065em; line-height: 0.78; color: transparent; -webkit-text-stroke: 1px rgba(238, 234, 226, 0.14); white-space: nowrap; transform: translateY(8%); user-select: none; }
@media (max-width: 699px) { .cols { grid-template-columns: 1fr; } .cols div:last-child { align-items: flex-start; text-align: left; } }
</style>
