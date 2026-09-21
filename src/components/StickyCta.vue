<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'

// 대표작까지 내려온 방문자에게만 뜨는 작은 연락 버튼. 마지막 연락 섹션에서는 사라진다.
const email = profile.contacts.find((c) => c.label === 'Email')
const show = ref(false)
let raf = 0
function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const work = document.getElementById('work')
    const contact = document.getElementById('contact')
    if (!work) return (show.value = false)
    const passedWork = work.getBoundingClientRect().top < window.innerHeight * 0.2
    const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 : false
    show.value = passedWork && !atContact
  })
}
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onUnmounted(() => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) })
</script>

<template>
  <Transition name="cta">
    <a v-if="show && email" v-magnetic="0.2" class="cta" :href="email.href" data-cursor="Mail">
      <span class="dot"></span><span class="t">연락하기</span>
    </a>
  </Transition>
</template>

<style scoped>
.cta {
  position: fixed; right: var(--gutter); bottom: 26px; z-index: 46;
  display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 20px; border-radius: 999px;
  background: var(--accent); color: #0b0c0e; font-weight: 700; font-size: 14.5px; letter-spacing: -0.01em;
  box-shadow: 0 12px 30px -12px rgba(255, 90, 31, 0.7);
}
.dot { width: 7px; height: 7px; border-radius: 50%; background: #0b0c0e; animation: blink 2.4s ease-in-out infinite; }
@keyframes blink { 50% { opacity: 0.25; } }
.cta-enter-active, .cta-leave-active { transition: opacity .4s, transform .6s var(--ease); }
.cta-enter-from, .cta-leave-to { opacity: 0; transform: translateY(20px) scale(0.9); }
@media (max-width: 699px) { .cta { right: 16px; bottom: 16px; height: 42px; padding: 0 16px; font-size: 13.5px; } }
@media (prefers-reduced-motion: reduce) { .dot { animation: none; } }
</style>
