import { ref } from 'vue'

// 프리로더가 끝났는지(첫 화면 애니메이션 시작 신호). 세션당 한 번만 프리로더를 보여 준다.
let seen = false
try { seen = sessionStorage.getItem('jn-intro') === '1' } catch {}
export const introDone = ref(seen)
export const showPreloader = !seen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && location.hash.replace('#', '') in { '': 1, '/': 1 }
if (!showPreloader) introDone.value = true
export function finishIntro() {
  introDone.value = true
  try { sessionStorage.setItem('jn-intro', '1') } catch {}
}
