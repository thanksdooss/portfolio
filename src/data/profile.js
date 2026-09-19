// 기본 인적 정보. 주소·전화번호·사진 등 개인정보는 넣지 않는다.
// 학력은 전공/복수전공/평점만 쓴다(출신 학교명 비공개 원칙).
export const profile = {
  name: '김진녕',
  nameEn: 'Jinnyeong Kim',
  github: 'https://github.com/thanksdooss',
  pdf: `${import.meta.env.BASE_URL}kim-jinnyeong-portfolio.pdf`,
  education: {
    major: '기계공학 전공',
    double: '조선해양시스템공학 복수전공',
    gpa: '4.46 / 4.5', // 누계 평점
    graduation: '2027.02 졸업 예정',
  },
  facts: [
    { label: 'MAJOR', value: '기계공학 · 조선해양 복수전공' },
    { label: 'GPA', value: '4.46 / 4.5' },
    { label: 'NOW', value: 'SK AX SKALA 4기 · DT' },
    { label: 'CERT', value: '기계설계기사 · AICE Basic 100점' },
  ],
  contacts: [
    { label: 'GitHub', text: 'thanksdooss', href: 'https://github.com/thanksdooss' },
    { label: 'Email', text: 'thanksdooss@naver.com', href: 'mailto:thanksdooss@naver.com' },
  ],
}

// 첫 화면 아래 3가지 강점. 순서는 트랙 설정(site.config.js)의 strengthOrder가 정한다.
export const strengths = [
  {
    id: 'domain',
    title: '현장의 언어를 압니다',
    body: '기계설계기사, CAD·구조해석, 계류·의장 규정 공부까지. 조선·제조 엔지니어가 쓰는 말로 문제를 듣고 정의합니다.',
    proof: 'HD현대이엔티 설계 책임 2인과 협업 · 선체/배관 도면 실습',
  },
  {
    id: 'build',
    title: '직접 끝까지 만듭니다',
    body: '로컬 LLM 에이전트, Vue·Spring Boot 풀스택 서비스, PLC→Unity 디지털트윈까지 동작하는 결과물로 증명합니다.',
    proof: 'Streamlit · Ollama · Vue 3 · Spring Boot · Unity · PLC',
  },
  {
    id: 'explain',
    title: '설명하고 설득합니다',
    body: '해커톤 대상 발표, 기업 우수사례 발표, AI 체험 부스 기획(83명 설문). 기술을 듣는 사람의 언어로 바꿔 전달합니다.',
    proof: '부스 설명 이해도 4.5 / 5 (83명 응답)',
  },
]
