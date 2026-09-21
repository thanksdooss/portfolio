// 대표작의 그림이 그대로 케이스 스터디 표지로 이어지는 전환(FLIP).
// 화면이 끊기지 않으니 "같은 도면을 확대해 들여다본다"는 느낌이 남는다.
const state = { id: null, src: null, rect: null, t: 0 }

export function captureFlip(id, imgEl) {
  if (!imgEl) return
  const r = imgEl.getBoundingClientRect()
  state.id = id
  state.src = imgEl.currentSrc || imgEl.src
  state.rect = { top: r.top, left: r.left, width: r.width, height: r.height }
  state.t = performance.now()
}
export function hasFlip(id) {
  return state.id === id && performance.now() - state.t < 2000
}
export function consumeFlip(id) {
  if (!hasFlip(id)) return null
  const out = { src: state.src, rect: state.rect }
  state.id = null
  return out
}
