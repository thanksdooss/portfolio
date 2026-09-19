// SKALA 팀 프로젝트(10/28~12/9) 등 새 프로젝트를 넣을 때 이 파일을 복사해 이름을 바꾼다.
// 예: skala-final.js → status를 'published'로 바꾸면 사이트에 나타난다.
// 대표작에 올리려면 src/config/site.config.js의 featured 배열에 id를 추가한다.
// SKALA 섹션에 카드로 띄우려면 src/data/skala.js의 projects 배열에 id를 추가한다.
export default {
  id: 'skala-final',
  status: 'draft',
  sort: 2026.12, // 아카이브 정렬용(클수록 위)
  title: '프로젝트 이름',
  oneLiner: '한 줄 요약 — 어떤 문제를 무엇으로 풀었는가',
  period: '2026.10 – 2026.12',
  context: 'SKALA 4기 팀 프로젝트',
  roleShort: '예: 백엔드·발표',
  team: '예: 5인 팀',
  award: null, // { short: '최우수', full: '… 최우수상 (수여기관)' }
  cover: 'img/skala-final/cover.webp',
  coverAlt: '',
  metrics: [], // [{ value: '94%', label: '응답 정확도' }]
  tags: [],
  problem: [''],
  approach: [''],
  role: [''],
  result: [''],
  tech: [{ group: 'Frontend', items: [] }],
  gallery: [], // [{ src: 'img/..webp', title: '', desc: '' }]
  links: [], // [{ label: 'GitHub', url: '' }]
  note: null,
  pdf: { line: '' }, // PDF 요약본에 들어갈 한 줄
}
