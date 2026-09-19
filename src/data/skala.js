// SKALA 학습 타임라인 — 과목별로 "내가 만든 산출물" 중심으로 적는다.
// highlight: true 인 과목만 기본으로 보이고, 나머지는 "전체 보기"에서 펼쳐진다.
// 팀 프로젝트가 끝나면 projects 배열에 id를 넣고 upcoming 항목을 지운다.
export const skala = {
  title: 'SK AX 채용연계형 AI 교육 과정',
  period: '2026.07.14 – 2026.12.11',
  desc: 'DT 직무로 입과해 데이터·백엔드·프론트·LLM·MLOps를 매주 과목 단위로 배우고 있습니다. 과목마다 무엇을 만들었는지 기록합니다.',

  projects: ['skavoca', 'skala-marine'],

  upcoming: [
    { title: 'SKALA 팀 프로젝트', period: '2026.10.28 – 12.09', note: '완료 후 케이스 스터디로 추가합니다.' },
  ],

  modules: [
    { no: 1, date: '07.14', subject: 'Git 이해와 활용', output: '첫 공개 저장소 — Python 테트리스·echo 실습', tags: ['Git', 'GitHub'] },
    { no: 2, date: '07.15–16', subject: '데이터 분석을 위한 Python', output: '공공 API 3종을 수집·검증(Pydantic)해 CSV/Parquet로 적재하는 파이프라인, pytest·Ruff 적용', tags: ['Python', 'Pydantic', 'pytest'] },
    { no: 3, date: '07.20–22', subject: '스마트 데이터 이해 및 활용 (SQL)', output: '개인: ERD·3정규화·DDL 설계 / 팀(5인): 쿼리 튜닝 과제', metric: '복합 인덱스로 조회 17.562ms → 0.981ms (94.4% 단축, 팀 과제)', tags: ['PostgreSQL', 'Index', 'EXPLAIN'], highlight: true },
    { no: 4, date: '07.23–24', subject: 'HTML · CSS · JavaScript', output: '웹 기초 실습 2일차 과제', tags: ['HTML', 'CSS', 'JS'] },
    { no: 5, date: '07.27–28', subject: '데이터 분석 개요 및 기초통계', output: '건물 에너지 데이터 EDA·다중회귀 보고서', metric: '난방부하 R² 0.91 · 냉방부하 R² 0.89', tags: ['EDA', '회귀분석', 'Jupyter'], highlight: true },
    { no: 6, date: '07.29', subject: '실전 Feature Engineering', tags: ['Feature Engineering'] },
    { no: 7, date: '07.30–08.05', subject: 'Java · Spring Boot · REST API', output: '로그인·게시판 REST API 실습', tags: ['Java', 'Spring Boot'] },
    { no: 8, date: '08.06–07', subject: 'Agile 방법론 및 MSA', output: '팀: 수강신청 서비스 "스칼라온" 설계·발표', tags: ['Agile', 'MSA'] },
    { no: 9, date: '08.10–13', subject: 'Front-framework Vue.js', output: '실시간 해양기상 × 선박 운동 3D 대시보드 "SKALA marine"', tags: ['Vue 3', 'Three.js'], highlight: true, project: 'skala-marine' },
    { no: 10, date: '08.18–20', subject: '미니 프로젝트 (개인)', output: '기술 용어 학습 서비스 "SKAVOCA" — 설계 문서 4종 + 풀스택 배포', tags: ['Vue', 'Spring Boot', 'PostgreSQL'], highlight: true, project: 'skavoca' },
    { no: 11, date: '08.24', subject: 'Prompt 설계와 Context Engineering', output: '제로샷에서 temperature=0 설정까지 5단계로 프롬프트를 고쳐 가며 결과를 비교한 보고서 (개인) + 조별 과제', tags: ['Prompt', 'Context'], highlight: true },
    { no: 12, date: '08.25–26', subject: 'LLM과 Transformer 아키텍처', output: 'Transformer 구조 구현 노트북과 해설 보고서', tags: ['PyTorch', 'Attention'] },
    { no: 13, date: '08.27–28', subject: 'sLLM 구현 및 Fine-tuning', output: 'Qwen2.5-0.5B에 LoRA 적용(학습 파라미터 0.22%). 파인튜닝만 한 모델은 사실 질문(버전 정보)을 틀리고, RAG(FAISS)를 붙이자 맞히는 것을 비교', tags: ['LoRA', 'RAG', 'FAISS'], highlight: true },
    { no: 14, date: '08.31–09.02', subject: '머신러닝 및 딥러닝 이해', tags: ['ML', 'DL'] },
    { no: 15, date: '09.03–04', subject: '모델 개발 및 최적화', tags: ['Optimization'] },
    { no: 16, date: '09.07–08', subject: '컨테이너 이해 및 애플리케이션 컨테이너화', tags: ['Docker'] },
    { no: 17, date: '09.09–10', subject: 'Spring AI 이해', tags: ['Spring AI'] },
    { no: 18, date: '09.11–14', subject: '쿠버네티스 이해 및 애플리케이션 배포', tags: ['Kubernetes'] },
    { no: 19, date: '09.15–17', subject: '모델 서빙 및 AIOps 구성', tags: ['Serving', 'AIOps'] },
    { no: 20, date: '09.18–22', subject: '생성형 AI 서비스 개발 (LangChain)', output: '진행 중', tags: ['LangChain'] },
  ],
}
