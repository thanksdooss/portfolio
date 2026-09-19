<script setup>
import { computed } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { getProject } from '../data/projects/index.js'
import ProjectCard from './ProjectCard.vue'
import { vReveal } from '../composables/reveal.js'

const { track } = useTrack()
const featured = computed(() => track.featured.map(getProject).filter(Boolean))
</script>

<template>
  <section id="work" class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Selected Work</p>
        <h2 class="section-title">{{ track.workTitle }}</h2>
        <p class="section-desc">{{ track.workDesc }}</p>
      </div>
      <div class="grid">
        <ProjectCard v-for="(p, i) in featured" :key="p.id" v-reveal :project="p" :index="i" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (max-width: 719px) { .grid { grid-template-columns: 1fr; } }
</style>
