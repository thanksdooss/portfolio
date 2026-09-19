<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { vReveal } from '../composables/reveal.js'

// 큰 제목 행 목록. 데스크톱에선 행에 올리면 미리보기 이미지가 커서를 따라다닌다.
const props = defineProps({ projects: { type: Array, required: true }, start: { type: Number, default: 1 } })
const base = import.meta.env.BASE_URL
const preview = ref(null)
const current = ref(-1)
let x = 0, y = 0, px = 0, py = 0, raf = 0

function loop() {
  px += (x - px) * 0.12; py += (y - py) * 0.12
  if (preview.value) preview.value.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) rotate(${(x - px) * 0.03}deg)`
  raf = requestAnimationFrame(loop)
}
const onMove = (e) => { x = e.clientX; y = e.clientY }
onMounted(() => { window.addEventListener('pointermove', onMove, { passive: true }); raf = requestAnimationFrame(loop) })
onUnmounted(() => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove) })
const img = (p) => base + (p.thumb || p.cover)
</script>

<template>
  <div class="wi" @pointerleave="current = -1">
    <RouterLink
      v-for="(p, i) in projects" :key="p.id" v-reveal :to="`/p/${p.id}`" class="row" data-cursor="View"
      @pointerenter="current = i"
    >
      <span class="no">{{ String(start + i).padStart(2, '0') }}</span>
      <span class="main">
        <span class="title">{{ p.titleShort || p.title }}</span>
        <span class="one">{{ p.oneLiner }}</span>
      </span>
      <span class="meta">
        <span class="label">{{ p.period }}</span>
        <span class="ctx">{{ p.context }}</span>
        <span v-if="p.award" class="chip hot">{{ p.award.short }}</span>
      </span>
      <img v-if="p.thumb || p.cover" class="m-img" :src="img(p)" :alt="p.coverAlt || p.title" loading="lazy" />
    </RouterLink>

    <div ref="preview" class="preview" :class="{ on: current >= 0 }" aria-hidden="true">
      <template v-for="(p, i) in projects" :key="p.id">
        <img v-if="p.thumb || p.cover" :src="img(p)" alt="" :class="{ show: i === current }" :style="{ objectPosition: p.thumbPos || 'center' }" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.wi { border-top: 1px solid var(--line); }
.row {
  position: relative; display: grid; grid-template-columns: 64px 1fr minmax(180px, 280px); gap: 24px; align-items: center;
  padding: clamp(24px, 3vw, 40px) 0; border-bottom: 1px solid var(--line); transition: padding .6s var(--ease);
}
.row::before { content: ''; position: absolute; inset: 0; background: var(--bg-2); transform: scaleY(0); transform-origin: bottom; transition: transform .6s var(--ease); z-index: -1; }
.row:hover::before { transform: scaleY(1); }
.no { font-family: var(--mono); font-size: 12px; color: var(--ink-3); align-self: start; padding-top: 0.9em; }
.main { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.title { font-size: clamp(28px, 4.6vw, 72px); font-weight: 800; letter-spacing: -0.05em; line-height: 1.02; transition: transform .6s var(--ease), color .3s; }
.row:hover .title { transform: translateX(18px); color: var(--accent); }
.one { color: var(--ink-2); font-size: clamp(14.5px, 1.1vw, 16.5px); max-width: 720px; transition: transform .6s var(--ease); }
.row:hover .one { transform: translateX(18px); }
.meta { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; text-align: right; }
.ctx { font-size: 13.5px; color: var(--ink-2); }
.m-img { display: none; }
.preview {
  position: fixed; left: 0; top: 0; width: clamp(280px, 26vw, 420px); aspect-ratio: 4 / 3; z-index: 40; pointer-events: none;
  border-radius: 6px; overflow: hidden; opacity: 0; scale: 0.6; transition: opacity .35s, scale .5s var(--ease);
}
.preview.on { opacity: 1; scale: 1; }
.preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
.preview img.show { opacity: 1; }
@media (hover: none), (max-width: 859px) {
  .preview { display: none; }
  .row { grid-template-columns: 1fr; gap: 14px; }
  .no { padding-top: 0; }
  .meta { flex-direction: row; flex-wrap: wrap; align-items: center; text-align: left; gap: 10px; order: -1; }
  .m-img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 6px; order: -2; }
  .row:hover .title, .row:hover .one { transform: none; }
}
</style>
