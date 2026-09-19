<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { reduceMotion } from '../composables/useSmoothScroll.js'

// 선도(Lines Plan)의 정면도(Body Plan): 왼쪽은 선미, 오른쪽은 선수 쪽 횡단면(station)들.
// 처음엔 먹선이 그어지듯 그려지고, 포인터에 가장 가까운 station이 주황으로 켜지며 반폭(half-breadth)을 표시한다.
const props = defineProps({ state: { type: Object, default: () => ({ zoom: 1, fade: 1, start: true }) } })
const canvas = ref(null)
let ctx, W = 0, H = 0, dpr = 1, raf = 0, t0 = 0, visible = true, io
const pointer = { x: -1, y: -1, tx: 0, ty: 0, px: 0, py: 0 }
const N = 10 // 한쪽 station 수

function station(s) {
  // s: 0(중앙부, 박스형) → 1(선단부, 날렵)
  const w = 1 - 0.86 * Math.pow(s, 1.5)
  const z0 = 0.34 * Math.pow(s, 2.3)
  const n = 2.1 + 9 * Math.pow(1 - s, 2.4)
  const pts = []
  for (let i = 0; i <= 48; i++) {
    const z = z0 + (1 - z0) * (i / 48)
    const tt = (z - z0) / (1 - z0 || 1)
    let x = w * Math.pow(1 - Math.pow(1 - tt, n), 1 / n)
    x += w * 0.1 * s * Math.pow(tt, 3) // 선수 플레어
    pts.push([x, z])
  }
  return { pts, w }
}
const stations = Array.from({ length: N }, (_, i) => station(i / (N - 1)))

function resize() {
  const r = canvas.value.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = r.width; H = r.height
  canvas.value.width = W * dpr; canvas.value.height = H * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function geom() {
  const mobile = W < 860
  const z = props.state.zoom || 1
  const base = mobile ? Math.min(W * 0.84, H * 0.5) : Math.min(W * 0.34, H * 0.66)
  const B = (base * z) / 2, D = base * z * 0.62
  const gutter = Math.max(16, Math.min(56, W * 0.04))
  // 기선 끝(±1.3B)과 라벨까지 화면 안에 들어오게 중심을 잡는다
  const cx = mobile ? W / 2 : Math.min(W * 0.74, W - gutter - (base / 2) * 1.3 - 8)
  return { cx, cy: mobile ? H * 0.3 : H * 0.44, B, D, mobile, gutter }
}

function draw(now) {
  if (!props.state.start) { if (visible) raf = requestAnimationFrame(draw); return }
  if (!t0) t0 = now
  const t = (now - t0) / 1000
  const prog = reduceMotion ? 1 : Math.min(1, t / 2.6)
  const { cx, cy, B, D, mobile, gutter } = geom()
  pointer.px += (pointer.tx - pointer.px) * 0.06
  pointer.py += (pointer.ty - pointer.py) * 0.06
  const ox = cx + pointer.px * 14, oy = cy + pointer.py * 10
  const top = oy - D / 2, base = oy + D / 2
  const X = (x, side) => ox + side * x * B
  const Y = (z) => base - z * D

  ctx.clearRect(0, 0, W, H)
  ctx.globalAlpha = Math.max(0, props.state.fade ?? 1)
  if (ctx.globalAlpha <= 0.01) { if (visible) raf = requestAnimationFrame(draw); return }
  ctx.lineCap = 'round'

  // 격자: 수선(waterline)과 버톡(buttock)
  ctx.strokeStyle = 'rgba(238,234,226,0.07)'
  ctx.lineWidth = 1
  ctx.setLineDash([2, 6])
  for (let k = 1; k <= 5; k++) { const y = Y(k / 6); ctx.beginPath(); ctx.moveTo(ox - B * 1.25, y); ctx.lineTo(ox + B * 1.25, y); ctx.stroke() }
  for (let k = 1; k <= 3; k++) for (const side of [-1, 1]) { const x = X(k / 4, side); ctx.beginPath(); ctx.moveTo(x, top - 10); ctx.lineTo(x, base + 10); ctx.stroke() }
  ctx.setLineDash([])
  // 중심선 · 기선 · 갑판선
  ctx.strokeStyle = 'rgba(238,234,226,0.22)'
  ctx.beginPath(); ctx.moveTo(ox, top - 36); ctx.lineTo(ox, base + 28); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(ox - B * 1.3, base); ctx.lineTo(ox + B * 1.3, base); ctx.stroke()

  // 포인터에 가장 가까운 station 찾기
  let hi = -1, hiSide = 1
  if (pointer.x >= 0 && prog >= 1) {
    const side = pointer.x < ox ? -1 : 1
    const dx = Math.abs(pointer.x - ox) / B
    let best = 1e9
    stations.forEach((st, i) => { const d = Math.abs(st.w - dx); if (d < best) { best = d; hi = i } })
    hiSide = side
    if (best > 0.12 || pointer.y < top - 40 || pointer.y > base + 40) hi = -1
  }

  // station 곡선
  stations.forEach((st, i) => {
    for (const side of [-1, 1]) {
      const delay = (i / (N - 1)) * 0.34 + (side > 0 ? 0.06 : 0) // 최대 0.40 + 0.55 < 1 → 전부 완성
      const p = prog >= 1 ? 1 : Math.max(0, Math.min(1, (prog - delay) / 0.55))
      if (p <= 0) continue
      const count = Math.max(2, Math.floor(st.pts.length * p))
      const on = i === hi && side === hiSide
      ctx.strokeStyle = on ? '#ff5a1f' : `rgba(238,234,226,${i === 0 ? 0.62 : 0.34})`
      ctx.lineWidth = on ? 2 : i === 0 ? 1.4 : 1
      ctx.beginPath()
      for (let k = 0; k < count; k++) { const [x, z] = st.pts[k]; k ? ctx.lineTo(X(x, side), Y(z)) : ctx.moveTo(X(x, side), Y(z)) }
      ctx.stroke()
    }
  })

  // 바다: 설계 흘수선 근처를 지나는 움직이는 수면
  if (prog > 0.6) {
    const a = Math.min(1, (prog - 0.6) / 0.4)
    const wl = Y(0.46)
    ctx.strokeStyle = `rgba(143,211,200,${0.55 * a})`
    ctx.lineWidth = 1.2
    ctx.beginPath()
    for (let x = 0; x <= W; x += 8) {
      const y = wl + Math.sin(x / 70 + t * 1.3) * 5 + Math.sin(x / 23 - t * 0.9) * 1.6
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
    ctx.fillStyle = `rgba(143,211,200,${0.7 * a})`
    ctx.font = '10px "JetBrains Mono", monospace'
    ctx.fillText('DWL', mobile ? gutter : Math.max(gutter, ox - B * 1.3), wl - 8)
  }

  // 도면 관례: 문자가 놓인 자리에서는 선을 끊는다(텍스트 상자만큼 지우기)
  if (props.state.knock && !mobile) {
    const cr = canvas.value.getBoundingClientRect()
    const els = document.querySelectorAll(props.state.knock)
    const hasWords = document.querySelector('.hero .headline .wd')
    const range = document.createRange()
    els.forEach((el) => {
      if (hasWords && el.classList.contains('line')) return // 단어로 쪼개진 뒤에는 단어 단위로
      // 블록 요소 전체 폭이 아니라 실제 글자가 차지한 범위만 지운다
      range.selectNodeContents(el)
      const r = el.classList.contains('wd') ? el.getBoundingClientRect() : range.getBoundingClientRect()
      if (!r.width) return
      const padX = el.classList.contains('wd') ? r.height * 0.06 : 10
      ctx.clearRect(r.left - cr.left - padX, r.top - cr.top + r.height * 0.04, r.width + padX * 2, r.height * 0.92)
    })
  }

  // 치수·라벨
  ctx.fillStyle = 'rgba(238,234,226,0.4)'
  ctx.font = '10px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('C L', ox, top - 44)
  ctx.textAlign = 'left'
  ctx.fillText('AFT ←', Math.max(gutter, ox - B * 1.3), base + 22)
  ctx.textAlign = 'right'
  ctx.fillText('→ FWD', Math.min(W - gutter, ox + B * 1.3), base + 22)
  ctx.textAlign = 'left'

  if (hi >= 0) {
    const st = stations[hi]
    const label = `ST.${String(hiSide > 0 ? 10 + hi : 10 - hi).padStart(2, '0')}  HB ${(st.w * 16.1).toFixed(2)} m`
    const lx = X(st.w, hiSide), ly = Y(1)
    ctx.fillStyle = '#ff5a1f'
    ctx.beginPath(); ctx.arc(lx, ly, 3.5, 0, Math.PI * 2); ctx.fill()
    ctx.font = '11px "JetBrains Mono", monospace'
    const tw = ctx.measureText(label).width
    let tx = lx + hiSide * 10
    if (hiSide > 0 && tx + tw > W - gutter) tx = W - gutter - tw
    ctx.textAlign = 'left'
    ctx.fillText(label, hiSide > 0 ? tx : Math.max(gutter, tx - tw), ly - 10)
    ctx.textAlign = 'left'
  }

  if (visible && !(reduceMotion && prog >= 1)) raf = requestAnimationFrame(draw)
}

function onMove(e) {
  const r = canvas.value.getBoundingClientRect()
  pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top
  pointer.tx = (pointer.x / W - 0.5) * 2; pointer.ty = (pointer.y / H - 0.5) * 2
}
function onLeave() { pointer.x = -1; pointer.tx = 0; pointer.ty = 0 }

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) }
  })
  io.observe(canvas.value)
})
onUnmounted(() => {
  cancelAnimationFrame(raf); io?.disconnect()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <canvas ref="canvas" class="loft" aria-hidden="true"></canvas>
</template>

<style scoped>
.loft { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
