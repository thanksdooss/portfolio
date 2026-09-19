<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CustomCursor from './components/CustomCursor.vue'
import { initSmoothScroll, scrollToTarget, ScrollTrigger } from './composables/useSmoothScroll.js'

const route = useRoute()
const router = useRouter()
const isPrint = computed(() => route.path === '/print')

onMounted(() => { if (!isPrint.value) initSmoothScroll() })
// 페이지가 바뀌면 맨 위로, 스크롤 트리거 위치 재계산
router.afterEach(() => nextTick(() => { scrollToTarget(0, { immediate: true }); setTimeout(() => ScrollTrigger.refresh(), 120) }))
</script>

<template>
  <template v-if="!isPrint">
    <CustomCursor />
    <SiteHeader />
  </template>
  <main id="main">
    <RouterView v-slot="{ Component, route: r }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="r.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter v-if="!isPrint" />
</template>

<style>
.page-enter-active { transition: opacity .6s var(--ease); }
.page-leave-active { transition: opacity .3s ease; }
.page-enter-from { opacity: 0; }
.page-leave-to { opacity: 0; }
</style>
