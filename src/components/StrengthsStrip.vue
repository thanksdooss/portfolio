<script setup>
import { computed } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { strengths } from '../data/profile.js'
import { vReveal } from '../composables/reveal.js'

const { track } = useTrack()
const ordered = computed(() => track.strengthOrder.map((id) => strengths.find((s) => s.id === id)).filter(Boolean))
</script>

<template>
  <section class="strip">
    <div class="wrap grid">
      <article v-for="(s, i) in ordered" :key="s.id" v-reveal class="item">
        <span class="n">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3>{{ s.title }}</h3>
        <p>{{ s.body }}</p>
        <p class="proof">{{ s.proof }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.strip { padding: 8px 0 8px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.item { padding: 22px 20px 24px; border-right: 1px solid var(--line); }
.item:last-child { border-right: 0; }
.n { font-family: var(--mono); font-size: 12px; color: var(--accent-ink); }
h3 { font-size: 17px; margin: 6px 0 6px; }
p { font-size: 14.5px; color: var(--ink-2); }
.proof { margin-top: 8px; font-size: 12.5px; font-family: var(--mono); color: var(--ink-3); }
@media (max-width: 759px) {
  .grid { grid-template-columns: 1fr; }
  .item { border-right: 0; border-bottom: 1px solid var(--line); padding: 18px 4px; }
  .item:last-child { border-bottom: 0; }
}
</style>
