<script setup>
import { profile } from '../data/profile.js'
import { useTrack } from '../composables/useTrack.js'
import HullSketch from './HullSketch.vue'

const { track } = useTrack()
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <section class="hero">
    <div class="wrap grid">
      <div class="copy">
        <p class="eyebrow">{{ track.eyebrow }}</p>
        <h1>
          <span class="l1">{{ track.headline[0] }}</span>
          <span class="l2">{{ track.headline[1] }}</span>
        </h1>
        <p class="sub">{{ track.sub }}</p>
        <ul class="facts">
          <li v-for="f in profile.facts" :key="f.label">
            <span class="k">{{ f.label }}</span><span class="v">{{ f.value }}</span>
          </li>
        </ul>
        <div class="cta">
          <button class="btn primary" type="button" @click="scrollTo('work')">대표작 보기</button>
          <a class="btn" :href="profile.pdf" download>PDF 요약본</a>
          <a class="btn" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <HullSketch class="art" />
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 0 40px; }
.grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 32px; align-items: center; }
h1 { font-size: clamp(30px, 5.2vw, 52px); margin: 14px 0 16px; letter-spacing: -0.035em; line-height: 1.2; }
h1 span { display: block; }
.l2 { color: var(--accent-ink); }
.sub { font-size: clamp(16px, 1.9vw, 18.5px); color: var(--ink-2); max-width: 600px; }
.facts { list-style: none; padding: 0; margin: 24px 0 26px; display: flex; flex-wrap: wrap; gap: 8px; }
.facts li {
  display: flex; gap: 8px; align-items: baseline; padding: 6px 12px; border-radius: 999px;
  background: var(--surface); border: 1px solid var(--line); font-size: 14px;
}
.facts .k { font-family: var(--mono); font-size: 11px; color: var(--ink-3); }
.facts .v { font-weight: 600; }
.cta { display: flex; flex-wrap: wrap; gap: 10px; }
.art { width: 100%; max-width: 440px; justify-self: end; }
@media (max-width: 859px) {
  .grid { grid-template-columns: 1fr; }
  .art { max-width: 280px; justify-self: center; margin-top: 8px; }
  .hero { padding-top: 28px; }
}
</style>
