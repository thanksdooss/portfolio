// ─────────────────────────────────────────────────────────────
//  지원 트랙 설정 — 이 파일 하나로 첫 화면 문구와 대표작 순서를 바꾼다.
//
//  전환 방법 (우선순위 순)
//   1) 링크에 쿼리 붙이기:  https://thanksdooss.github.io/portfolio/?track=sales
//   2) 빌드 시 지정:        VITE_TRACK=sales npm run build
//   3) 아래 defaultTrack 값 변경
//
//  featured: 대표작 카드 순서 (src/data/projects/*.js 의 id)
//  strengthOrder: 강점 3가지 순서 (src/data/profile.js 의 strengths id)
// ─────────────────────────────────────────────────────────────
export default {
  defaultTrack: 'dt',

  tracks: {
    dt: {
      label: 'DT(개발)',
      eyebrow: 'AI Engineer · Shipbuilding & Manufacturing',
      headline: ['조선·제조 현장을 아는', 'AI 엔지니어 김진녕입니다'],
      sub: '도면과 규정을 읽고, 모델을 만들고, 현장의 말로 설명합니다.',
      workTitle: '현장 문제를 코드로 푼 작업',
      workDesc: '한 화면에 한 작품. 누르면 문제 → 접근 → 내 역할 → 결과로 들어갑니다.',
      featured: ['hd-spec-assistant', 'skala-marine', 'digital-twin', 'skavoca'],
      strengthOrder: ['build', 'domain', 'explain'],
    },

    sales: {
      label: '기술영업',
      eyebrow: 'Technical Sales · AI × Manufacturing',
      headline: ['직접 만들어 보고,', '현장의 언어로 설명합니다'],
      sub: '고객의 공정을 이해하고, 기술을 고객의 언어로 옮깁니다.',
      workTitle: '듣고, 만들고, 설득한 작업',
      workDesc: '한 화면에 한 작품. 누르면 문제 → 접근 → 내 역할 → 결과로 들어갑니다.',
      featured: ['hd-spec-assistant', 'hackathon-flow', 'digital-twin', 'skala-marine'],
      strengthOrder: ['explain', 'domain', 'build'],
    },
  },
}
