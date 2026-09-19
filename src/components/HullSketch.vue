<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 중앙 단면(midship section)이 파도 위에서 횡동요(roll)하는 도면풍 일러스트.
// 포인터를 좌우로 움직이면 파고가 바뀌어 기울기가 달라진다.
const roll = ref(0)
const amp = ref(1)
let t = 0, raf = 0
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tick() {
  t += 0.016
  roll.value = Math.sin(t * 0.9) * 5 * amp.value
  wave.value = buildWave(t)
  raf = requestAnimationFrame(tick)
}
function buildWave(time) {
  let d = 'M0 232'
  for (let x = 0; x <= 400; x += 10) {
    const y = 232 + Math.sin(x / 38 + time * 1.6) * 6 * amp.value + Math.sin(x / 17 - time) * 2
    d += ` L${x} ${y.toFixed(1)}`
  }
  return d + ' L400 320 L0 320 Z'
}
const wave = ref(buildWave(0))

function onMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  amp.value = 0.4 + ((e.clientX - r.left) / r.width) * 1.6
}
onMounted(() => { if (!reduce) raf = requestAnimationFrame(tick) })
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <figure class="sketch" @pointermove="onMove" @pointerleave="amp = 1">
    <svg viewBox="0 0 400 320" role="img" aria-label="파도 위에서 횡동요하는 선박 중앙 단면 스케치">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" class="hatch" />
        </pattern>
      </defs>
      <!-- 치수선 -->
      <g class="dim">
        <line x1="92" y1="46" x2="308" y2="46" />
        <line x1="92" y1="40" x2="92" y2="52" /><line x1="308" y1="40" x2="308" y2="52" />
        <text x="200" y="38" text-anchor="middle">B (Breadth)</text>
      </g>
      <g :transform="`rotate(${roll.toFixed(2)} 200 210)`">
        <!-- 선체 외판 -->
        <path class="hull" d="M92 80 L92 220 Q92 262 134 262 L266 262 Q308 262 308 220 L308 80" />
        <!-- 이중저 / 갑판 / 격벽 -->
        <path class="inner" d="M104 240 L296 240 M92 80 L308 80 M200 80 L200 240 M104 110 L104 240 M296 110 L296 240" />
        <rect x="104" y="240" width="192" height="12" fill="url(#hatch)" class="db" />
        <!-- 센서 노드 -->
        <g class="nodes">
          <circle cx="150" cy="160" r="4" /><circle cx="250" cy="130" r="4" /><circle cx="200" cy="248" r="4" />
          <path d="M150 160 L200 248 L250 130" class="link" />
        </g>
        <text x="200" y="72" text-anchor="middle" class="lbl">MIDSHIP SECTION</text>
        <!-- 무게중심 G / 메타센터 M -->
        <circle cx="200" cy="196" r="3.5" class="g" />
        <text x="208" y="200" class="lbl">G</text>
      </g>
      <path class="sea" :d="wave" />
      <text x="12" y="310" class="lbl wl">WL · roll {{ roll.toFixed(1) }}°</text>
    </svg>
  </figure>
</template>

<style scoped>
.sketch { margin: 0; aspect-ratio: 5 / 4; }
svg { width: 100%; height: 100%; overflow: visible; }
.hull { fill: var(--surface); stroke: var(--navy); stroke-width: 2.2; stroke-linejoin: round; }
.inner { fill: none; stroke: var(--ink-3); stroke-width: 1; stroke-dasharray: 4 3; }
.hatch { stroke: var(--ink-3); stroke-width: 1; }
.db { opacity: .5; }
.dim line { stroke: var(--ink-3); stroke-width: 1; }
.dim text, .lbl { font-family: var(--mono); font-size: 10px; fill: var(--ink-3); letter-spacing: .06em; }
.nodes circle { fill: var(--accent); }
.nodes circle:nth-child(2) { animation-delay: .6s; }
.nodes circle:nth-child(3) { animation-delay: 1.2s; }
.nodes circle { animation: pulse 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.link { fill: none; stroke: var(--accent); stroke-width: 1; opacity: .55; }
.g { fill: var(--teal); }
.sea { fill: color-mix(in srgb, var(--teal) 18%, transparent); stroke: var(--teal); stroke-width: 1.4; }
.wl { fill: var(--teal); }
@keyframes pulse { 50% { transform: scale(1.6); opacity: .6; } }
@media (prefers-reduced-motion: reduce) { .nodes circle { animation: none; } }
</style>
