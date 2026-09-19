<script setup>
defineProps({ items: { type: Array, required: true }, speed: { type: Number, default: 40 }, big: Boolean })
</script>

<template>
  <div class="mq" :class="{ big }" aria-hidden="true">
    <div class="track" :style="{ animationDuration: speed + 's' }">
      <template v-for="n in 2" :key="n">
        <span v-for="it in items" :key="n + it" class="it">{{ it }}<i>✦</i></span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.mq { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 18px 0; white-space: nowrap; }
.track { display: inline-flex; animation: mq linear infinite; }
.it { font-family: var(--mono); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); padding-right: 28px; display: inline-flex; align-items: center; gap: 28px; }
.it i { font-style: normal; color: var(--accent); font-size: 10px; }
.big { padding: 26px 0; }
.big .it { font-family: var(--font); font-size: clamp(40px, 7vw, 110px); font-weight: 800; letter-spacing: -0.05em; text-transform: none; color: var(--ink); padding-right: 0.4em; gap: 0.4em; }
.big .it i { font-size: 0.4em; }
@keyframes mq { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .track { animation: none; } }
</style>
