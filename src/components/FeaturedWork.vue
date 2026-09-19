<script setup>
import { computed } from 'vue'
import { useTrack } from '../composables/useTrack.js'
import { getProject } from '../data/projects/index.js'
import WorkIndex from './WorkIndex.vue'

const { track } = useTrack()
const featured = computed(() => track.featured.map(getProject).filter(Boolean))
</script>

<template>
  <section id="work" class="sec">
    <div class="wrap">
      <div class="sec-head">
        <p class="label"><b>●</b>&nbsp; Selected Work — {{ featured.length }}</p>
        <p class="sec-desc">{{ track.workDesc }}</p>
      </div>
      <h2 class="sec-title">{{ track.workTitle }}</h2>
    </div>
    <div class="wrap list">
      <WorkIndex :projects="featured" />
    </div>
  </section>
</template>

<style scoped>
.sec-head { margin-bottom: 20px; }
.list { margin-top: clamp(40px, 6vw, 80px); }
</style>
