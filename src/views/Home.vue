<script setup>
import { onMounted } from 'vue'
import { profile } from '../data/profile.js'
import HeroSection from '../components/HeroSection.vue'
import StrengthsStrip from '../components/StrengthsStrip.vue'
import FeaturedWork from '../components/FeaturedWork.vue'
import SkalaTimeline from '../components/SkalaTimeline.vue'
import ArchiveSection from '../components/ArchiveSection.vue'

onMounted(() => (document.title = `${profile.name} · 포트폴리오`))
</script>

<template>
  <HeroSection />
  <StrengthsStrip />
  <FeaturedWork />
  <SkalaTimeline />
  <ArchiveSection />
</template>
