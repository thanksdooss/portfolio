<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { profile } from '../data/profile.js'
import { scrollToTarget } from '../composables/useSmoothScroll.js'

const router = useRouter()
const route = useRoute()
const hidden = ref(false)
const solid = ref(false)
let lastY = 0

const links = [
  { id: 'work', label: 'Work', ko: '작업' },
  { id: 'skala', label: 'SKALA', ko: '교육' },
  { id: 'archive', label: 'Archive', ko: '기록' },
  { id: 'contact', label: 'Contact', ko: '연락' },
]

async function go(id) {
  if (route.path !== '/') { await router.push('/'); await new Promise((r) => setTimeout(r, 80)) }
  scrollToTarget('#' + id)
}

// 내려갈 땐 숨기고, 올라올 땐 다시 보인다
function onScroll() {
  const y = window.scrollY
  hidden.value = y > 240 && y > lastY
  solid.value = y > 40
  lastY = y
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="hdr" :class="{ hidden, solid }">
    <div class="wrap row">
      <RouterLink to="/" class="brand" aria-label="처음으로">
        <span class="name">{{ profile.name }}</span>
        <span class="en serif">{{ profile.nameEn }}</span>
      </RouterLink>
      <nav aria-label="주요 섹션">
        <button v-for="(l, i) in links" :key="l.id" type="button" class="nl" @click="go(l.id)">
          <span class="idx">0{{ i + 1 }}</span>
          <span class="t"><span>{{ l.label }}</span><span>{{ l.ko }}</span></span>
        </button>
        <a class="pdf" :href="profile.pdf" download>PDF ↓</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: transform .6s var(--ease), background .4s, border-color .4s; border-bottom: 1px solid transparent; }
.hdr.solid { background: color-mix(in srgb, var(--bg) 72%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom-color: var(--line); }
.hdr.hidden { transform: translateY(-100%); }
.row { display: flex; align-items: center; justify-content: space-between; height: 68px; gap: 12px; }
.brand { display: flex; align-items: baseline; gap: 10px; }
.name { font-weight: 800; letter-spacing: -0.03em; font-size: 17px; }
.en { color: var(--ink-3); font-size: 17px; }
nav { display: flex; align-items: center; gap: clamp(8px, 2vw, 28px); }
.nl { display: flex; align-items: baseline; gap: 6px; font-size: 14px; }
.idx { font-family: var(--mono); font-size: 10px; color: var(--ink-3); }
/* 호버하면 영문 ↔ 한글이 위로 롤링 */
.t { display: inline-flex; flex-direction: column; height: 1.4em; overflow: hidden; line-height: 1.4; }
.t span { transition: transform .5s var(--ease); }
.nl:hover .t span { transform: translateY(-100%); }
.nl:hover .t span:last-child { color: var(--accent); }
.pdf { font-family: var(--mono); font-size: 11.5px; padding: 7px 12px; border: 1px solid var(--line-2); border-radius: 999px; transition: background .3s, color .3s; }
.pdf:hover { background: var(--accent); color: #0b0c0e; border-color: var(--accent); }
@media (max-width: 699px) {
  .en, .idx { display: none; }
  .nl { font-size: 13px; }
  nav { gap: 12px; }
  .pdf { display: none; }
}
</style>
