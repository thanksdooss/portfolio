<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({ items: { type: Array, required: true }, start: { type: Number, default: 0 } })
const emit = defineEmits(['close'])
const i = ref(props.start)
const cur = computed(() => props.items[i.value])
const base = import.meta.env.BASE_URL

const step = (d) => (i.value = (i.value + d + props.items.length) % props.items.length)
function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
let x0 = null
const onTouchStart = (e) => (x0 = e.touches[0].clientX)
function onTouchEnd(e) {
  if (x0 === null) return
  const dx = e.changedTouches[0].clientX - x0
  if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
  x0 = null
}
onMounted(() => { window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' })
onUnmounted(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <div class="lb" role="dialog" aria-modal="true" :aria-label="cur.title" @click.self="emit('close')" @touchstart.passive="onTouchStart" @touchend="onTouchEnd">
      <figure>
        <img :src="base + cur.src" :alt="cur.title" />
        <figcaption>
          <b>{{ cur.title }}</b> <span>{{ cur.tool }}</span>
          <p v-if="cur.desc">{{ cur.desc }}</p>
          <a class="orig" :href="base + cur.src" target="_blank" rel="noopener">원본 크게 보기 ↗</a>
        </figcaption>
      </figure>
      <button class="nav prev" type="button" aria-label="이전" @click="step(-1)">‹</button>
      <button class="nav next" type="button" aria-label="다음" @click="step(1)">›</button>
      <button class="close" type="button" aria-label="닫기" @click="emit('close')">×</button>
      <span class="count">{{ i + 1 }} / {{ items.length }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.lb { position: fixed; inset: 0; z-index: 100; background: rgba(6, 12, 20, 0.92); display: grid; place-items: center; padding: 56px 16px 24px; }
figure { margin: 0; max-width: min(1100px, 100%); display: flex; flex-direction: column; gap: 12px; }
img { max-height: 74vh; width: auto; max-width: 100%; margin: 0 auto; background: #fff; border-radius: 8px; object-fit: contain; }
figcaption { color: #e9eef5; font-size: 14.5px; text-align: center; }
figcaption span { color: #9fb0c4; font-family: var(--mono); font-size: 12px; margin-left: 6px; }
figcaption p { color: #c6d1de; font-size: 13.5px; margin-top: 4px; max-width: 720px; margin-inline: auto; }
.orig { display: inline-block; margin-top: 6px; color: #ffb27a; font-size: 13px; }
.nav, .close { position: absolute; background: rgba(255,255,255,.1); color: #fff; border: 0; border-radius: 999px; width: 44px; height: 44px; font-size: 26px; cursor: pointer; }
.nav:hover, .close:hover { background: rgba(255,255,255,.2); }
.prev { left: 12px; top: 50%; }
.next { right: 12px; top: 50%; }
.close { right: 12px; top: 10px; }
.count { position: absolute; left: 16px; top: 20px; color: #9fb0c4; font-family: var(--mono); font-size: 12px; }
@media (max-width: 599px) { .nav { top: auto; bottom: 16px; } }
</style>
