<script setup>
import { profile } from '../data/profile.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="ftr">
    <div class="wrap">
      <p class="eyebrow">Contact</p>
      <h2 class="title">현장의 문제를, 직접 만들고, 현장의 언어로 설명합니다.</h2>
      <div class="links">
        <a v-for="c in profile.contacts" :key="c.label" class="btn" :href="c.href" target="_blank" rel="noopener">
          {{ c.label }} <span class="muted">{{ c.text }}</span>
        </a>
        <a class="btn primary" :href="profile.pdf" download>PDF 요약본</a>
      </div>
      <p class="copy muted">© {{ year }} {{ profile.name }} · Vue 3 + Vite로 직접 만들고 GitHub Pages로 배포했습니다.</p>
    </div>
  </footer>
</template>

<style scoped>
.ftr { padding: 64px 0 40px; border-top: 1px solid var(--line); background: var(--surface); }
.title { font-size: clamp(20px, 3vw, 28px); margin: 10px 0 22px; max-width: 720px; }
.links { display: flex; flex-wrap: wrap; gap: 10px; }
.copy { font-size: 13px; margin-top: 36px; }
</style>
