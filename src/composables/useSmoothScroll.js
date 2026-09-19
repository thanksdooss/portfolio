import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Lenis(관성 스크롤)와 GSAP ScrollTrigger를 한 타이머로 묶는다. 앱에서 한 번만 호출.
let lenis = null
export const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initSmoothScroll() {
  if (lenis || reduceMotion) return lenis
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollToTarget(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4, ...opts })
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (typeof target === 'number') window.scrollTo(0, target)
    else el?.scrollIntoView()
  }
}

export function getLenis() { return lenis }

export { gsap, ScrollTrigger, SplitText }
