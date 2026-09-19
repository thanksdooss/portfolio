<script setup>
import { onMounted } from 'vue'
import { profile } from '../data/profile.js'
import HeroSection from '../components/HeroSection.vue'
import MarqueeBand from '../components/MarqueeBand.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import FeaturedWork from '../components/FeaturedWork.vue'
import StrengthsStrip from '../components/StrengthsStrip.vue'
import SkalaTimeline from '../components/SkalaTimeline.vue'
import ArchiveSection from '../components/ArchiveSection.vue'

const fields = ['Shipbuilding', 'Mooring & Outfitting', 'Local LLM', 'Digital Twin', 'Seakeeping 3D', 'Full-stack', 'Technical Sales', 'PLC · Modbus']
onMounted(() => (document.title = `${profile.name} — 조선·제조 현장을 아는 AI 엔지니어`))
</script>

<template>
  <div class="home">
  <HeroSection />
  <MarqueeBand :items="fields" :speed="36" />
  <ManifestoSection />
  <FeaturedWork />
  <StrengthsStrip />
  <SkalaTimeline />
  <ArchiveSection />
  </div>
</template>
