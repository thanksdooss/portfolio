<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CustomCursor from './components/CustomCursor.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import PageCurtain from './components/PageCurtain.vue'
import PreLoader from './components/PreLoader.vue'
import StickyCta from './components/StickyCta.vue'
import { showPreloader } from './composables/intro.js'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './composables/useSmoothScroll.js'

const route = useRoute()
const router = useRouter()
const isPrint = computed(() => route.path === '/print')

onMounted(() => { if (!isPrint.value) initSmoothScroll() })
// 페이지가 바뀌면 맨 위로, 스크롤 트리거 위치 재계산
router.afterEach(() => nextTick(() => { scrollToTarget(0, { immediate: true }); setTimeout(() => ScrollTrigger.refresh(), 200) }))
</script>

<template>
  <template v-if="!isPrint">
    <PreLoader v-if="showPreloader" />
    <CustomCursor />
    <ScrollProgress />
    <PageCurtain />
    <SiteHeader />
    <StickyCta />
  </template>
  <main id="main">
    <RouterView v-slot="{ Component, route: r }">
      <component :is="Component" :key="r.path" />
    </RouterView>
  </main>
  <SiteFooter v-if="!isPrint" />
</template>
