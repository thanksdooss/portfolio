<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const isPrint = computed(() => route.path === '/print')
</script>

<template>
  <SiteHeader v-if="!isPrint" />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter v-if="!isPrint" />
</template>
