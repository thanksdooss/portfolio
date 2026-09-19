import siteConfig from '../config/site.config.js'

// 지원 트랙 결정 순서: URL 쿼리(?track=sales) → 빌드 환경변수(VITE_TRACK) → 설정 파일 기본값
function resolveTrack() {
  const fromQuery = new URLSearchParams(window.location.search).get('track')
  const candidates = [fromQuery, import.meta.env.VITE_TRACK, siteConfig.defaultTrack]
  return candidates.find((t) => t && siteConfig.tracks[t]) || Object.keys(siteConfig.tracks)[0]
}

const trackId = resolveTrack()

export function useTrack() {
  return { trackId, track: siteConfig.tracks[trackId], site: siteConfig }
}
