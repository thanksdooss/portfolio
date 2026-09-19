import { gsap, ScrollTrigger, SplitText, reduceMotion } from './useSmoothScroll.js'

// v-split: 제목을 줄 단위로 잘라, 화면에 들어오면 마스크 안에서 아래→위로 올라오게 한다.
export const vSplit = {
  mounted(el, binding) {
    if (reduceMotion) return
    document.fonts.ready.then(() => {
      el._split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: binding.value?.delay || 0,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        },
      })
    })
  },
  unmounted(el) { el._split?.revert() },
}

// v-clip: 이미지가 가운데에서 바깥으로 열리듯 드러난다(도면이 펼쳐지는 느낌).
export const vClip = {
  mounted(el) {
    if (reduceMotion) return
    el._tw = gsap.fromTo(el, { clipPath: 'inset(18% 12% 18% 12%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  },
  unmounted(el) { el._tw?.scrollTrigger?.kill(); el._tw?.kill() },
}

// v-magnetic: 커서가 가까이 오면 버튼이 살짝 끌려온다(데스크톱).
export const vMagnetic = {
  mounted(el, binding) {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const k = binding.value || 0.35
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    el._mm = (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * k); yTo((e.clientY - r.top - r.height / 2) * k) }
    el._ml = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', el._mm)
    el.addEventListener('pointerleave', el._ml)
  },
  unmounted(el) { el.removeEventListener('pointermove', el._mm); el.removeEventListener('pointerleave', el._ml) },
}

// v-count: 숫자가 0에서 올라간다. 숫자가 아니면 그대로 둔다.
export const vCount = {
  mounted(el) {
    const txt = el.textContent.trim()
    const v = parseFloat(txt.replace(/,/g, ''))
    if (reduceMotion || Number.isNaN(v) || !/^[\d.,]+$/.test(txt)) return
    const d = (txt.split('.')[1] || '').length
    const o = { n: 0 }
    el.textContent = (0).toFixed(d)
    gsap.to(o, { n: v, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, onUpdate: () => (el.textContent = o.n.toFixed(d)) })
  },
}

export function installMotion(app) {
  app.directive('split', vSplit)
  app.directive('clip', vClip)
  app.directive('magnetic', vMagnetic)
  app.directive('count', vCount)
}
export { ScrollTrigger }
