// v-reveal: 화면에 들어올 때 살짝 떠오르는 효과. 한 번 보이면 관찰을 끊는다.
let io
function observer() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    )
  }
  return io
}
export const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    if (!('IntersectionObserver' in window)) return el.classList.add('in')
    observer().observe(el)
  },
  unmounted(el) { io && io.unobserve(el) },
}
