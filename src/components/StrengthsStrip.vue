<script setup>
import { computed } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { strengths } from '../data/profile.js'
import { vReveal } from '../composables/reveal.js'

const { track } = useTrack()
const ordered = computed(() => track.strengthOrder.map((id) => strengths.find((s) => s.id === id)).filter(Boolean))
const roman = ['I', 'II', 'III']
</script>

<template>
  <section class="sec principles">
    <div class="wrap">
      <div class="sec-head">
        <p class="label"><b>●</b>&nbsp; Principles</p>
        <p class="sec-desc">일하는 방식 세 가지. 각각 이 사이트의 케이스 스터디로 증명합니다.</p>
      </div>
      <div class="grid">
        <article v-for="(s, i) in ordered" :key="s.id" v-reveal class="item" :style="{ transitionDelay: i * 0.08 + 's' }">
          <span class="n serif">{{ roman[i] }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
          <p class="proof label">{{ s.proof }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.principles { background: var(--bg-2); }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(20px, 3vw, 48px); }
.item { border-top: 1px solid var(--line-2); padding-top: 28px; display: flex; flex-direction: column; gap: 14px; }
.n { font-size: clamp(64px, 7vw, 120px); line-height: 0.8; color: var(--accent); }
h3 { font-size: clamp(22px, 2vw, 30px); letter-spacing: -0.04em; margin-top: 18px; }
p { color: var(--ink-2); font-size: 15.5px; }
.proof { margin-top: auto; padding-top: 10px; line-height: 1.7; }
@media (max-width: 859px) { .grid { grid-template-columns: 1fr; gap: 48px; } }
</style>
