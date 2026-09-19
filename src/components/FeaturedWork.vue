<script setup>
import { computed } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { getProject } from '../data/projects/index.js'
import WorkShowcase from './WorkShowcase.vue'

const { track } = useTrack()
const featured = computed(() => track.featured.map(getProject).filter(Boolean))
</script>

<template>
  <section id="work" class="sec work" data-section="Work">
    <div class="wrap">
      <div class="sec-head">
        <p class="label"><b>●</b>&nbsp; <span v-scramble>Selected Work — {{ featured.length }}</span></p>
        <p class="sec-desc">{{ track.workDesc }}</p>
      </div>
      <h2 v-split class="sec-title">{{ track.workTitle }}</h2>
      <WorkShowcase :projects="featured" />
    </div>
  </section>
</template>

<style scoped>
.work { padding-top: clamp(40px, 6vw, 96px); padding-bottom: 40px; }
.sec-head { margin-bottom: 20px; }
</style>
