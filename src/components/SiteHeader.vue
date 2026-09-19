<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { profile } from '../data/profile.js'

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)

const links = [
  { id: 'work', label: '대표작' },
  { id: 'skala', label: 'SKALA' },
  { id: 'archive', label: '아카이브' },
  { id: 'contact', label: '연락' },
]

async function go(id) {
  if (route.path !== '/') await router.push('/')
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
}

const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="hdr" :class="{ scrolled }">
    <div class="wrap row">
      <RouterLink to="/" class="brand" aria-label="처음으로">
        <span class="mark" aria-hidden="true">JN</span>
        <span class="name">{{ profile.name }}</span>
      </RouterLink>
      <nav aria-label="주요 섹션">
        <button v-for="l in links" :key="l.id" type="button" @click="go(l.id)">{{ l.label }}</button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky; top: 0; z-index: 40;
  backdrop-filter: saturate(1.4) blur(10px);
  -webkit-backdrop-filter: saturate(1.4) blur(10px);
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border-bottom: 1px solid transparent;
  transition: border-color .2s;
}
.hdr.scrolled { border-bottom-color: var(--line); }
.row { display: flex; align-items: center; justify-content: space-between; height: 60px; gap: 12px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700; }
.mark {
  font-family: var(--mono); font-size: 12px; width: 30px; height: 30px; border-radius: 8px;
  display: grid; place-items: center; background: var(--navy); color: var(--bg);
}
nav { display: flex; gap: 2px; }
nav button {
  background: none; border: 0; padding: 8px 10px; border-radius: 8px; cursor: pointer;
  font-size: 14.5px; color: var(--ink-2); font-weight: 500;
}
nav button:hover { color: var(--ink); background: var(--surface-2); }
@media (max-width: 480px) {
  .name { display: none; }
  nav button { padding: 8px 7px; font-size: 14px; }
}
</style>
