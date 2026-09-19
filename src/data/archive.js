// 아카이브 — 증빙 파일로 확인된 항목만 싣는다.
// 학교명·약칭이 들어간 대회·사업명은 일반 명칭으로 바꿔 적는다.
export const archive = {
  awards: [
    { date: '2026.02.06', title: '교내 우수 학습자 포상 (주문식 교육과정 분야)', org: '교내 RISE사업단', grade: '금상' },
    { date: '2026.02.04', title: '지역문제해결 캡스톤디자인 경진대회 — 클린 팩토리', org: '교내 RISE사업단', grade: '동상', note: '8인 팀장' },
    { date: '2026.01.21', title: 'AI 활용능력 영상 공모전', org: '총장상', grade: '동상', note: '5인 팀' },
    { date: '2025.12.23', title: 'AI 재직자 교육 협업 프로젝트 — Building Spec. 검증 Assistant', org: 'HD현대이엔티 대표이사', grade: '우수상', note: '산학 3인 팀' },
    { date: '2025.12.22', title: '복합재난 박람회 벤치마킹 후기 공모전', org: '교내 RISE사업단', grade: '최우수상', note: '5인 공동' },
    { date: '2025.12.22', title: '탄소중립 실천 봉사 후기 공모전', org: '교내 RISE사업단', grade: '우수상', note: '2인 공동' },
    { date: '2025.12.12', title: '창업교육 혁신 선도대학 사업 권역 온라인 창업경진대회', org: '총장상', grade: '동상', note: '3인 팀' },
    { date: '2025.11.06', title: '교내 창업아이디어 경진대회 (AI·디지털 부문)', org: '교내 RISE사업단', grade: '은상', note: '3인 팀' },
    { date: '2025.11.04', title: '창업 실패 아이템 자랑대회', org: '지역 대학 RISE사업단', grade: '새싹도전상', note: '3인 팀' },
    { date: '2025.08.27', title: '지역사회문제해결 워크숍', org: '교내 RISE사업단', grade: '장려상', note: '6인 팀' },
    { date: '2025.02.14', title: '창업집중훈련 FLOW', org: '한국연구재단 이사장', grade: '장려상', note: '3인 팀' },
    { date: '2024.12.28', title: 'ICT통신&바이오헬스 청년 아이디어 해커톤', org: '혁신융합대학 사업단', grade: '대상', note: '팀장·발표' },
  ],

  activities: [
    { date: '2025.11', title: '비전 AI 체험 부스 운영', desc: 'YOLOv8·MediaPipe 6종 체험, 83명 설문 설명 이해도 4.5/5', kind: '행사' },
    { date: '2025.10', title: '산학연협력 EXPO 전시 참가', desc: '폐플라스틱 압축성형 업사이클링 체험 부스', kind: '행사' },
    { date: '2025.09', title: '로컬히어로즈 100 온라인 기본 교육', desc: '한국청년기업가정신재단 운영 · 수료', kind: '교육' },
    { date: '2025.09', title: '대한민국 안전산업박람회 벤치마킹', desc: '복합재난 대응 우수사례 현장 견학', kind: '견학' },
    { date: '2025.08', title: 'ESG Campus Academy', desc: '지속가능발전 ESG 첫걸음·프로젝트 · 수료', kind: '교육' },
    { date: '2025.07', title: '제4회 CO-Week Academy', desc: '첨단분야 혁신융합대학 사업단 협의회 · 21시간 수료', kind: '교육' },
    { date: '2025.04', title: '디지털 트윈 (KAIST 온라인 강좌)', desc: '12시간 · 이수', kind: '교육' },
    { date: '2025.04', title: '정보통신설비 춘계세미나', desc: '자율주행·5G·특화망 동향 세미나 참석', kind: '세미나' },
    { date: '2025.03', title: '다학제 캡스톤 — EDGE팀 팀장', desc: '삼성전자 캡스톤 트랙(학점교류 과목), 3개 대학 연합 4인팀', kind: '프로젝트' },
    { date: '2025.01', title: '전기기능사 연계 전기배선 현장기술 실무과정', desc: '48시간 수료', kind: '교육' },
    { date: '2024.12', title: '친환경 스마트 모빌리티 산업 기초 활용 교육', desc: '30시간 수료', kind: '교육' },
  ],

  education: [
    { date: '2027.02', title: '기계공학 전공 · 조선해양시스템공학 복수전공', desc: '누계 평점 4.45 / 4.5 · 졸업 예정', kind: '학력' },
    { date: '2026.07 –', title: 'SK AX 채용연계형 AI 교육 SKALA 4기', desc: 'DT 직무 · 2026.07.14 – 12.11', kind: '교육' },
    { date: '2025.11', title: 'AICE Basic', desc: '100 / 100 (KT · 한국경제신문)', kind: '자격' },
    { date: '2025.11', title: 'HD현대이엔티 재직자 AI 교육 (업무혁신과 파이썬 기초)', desc: '40시간 · 재직자와 협업 프로젝트 수행', kind: '교육' },
    { date: '2020.09', title: '기계설계기사', desc: '과정평가형 · 2020.09 취득, 현 일반기계기사로 통합', kind: '자격' },
    { date: '2019–2020', title: '기계설계기사 과정평가형 훈련과정', desc: '1,035시간 · NX 설계·Nastran 구조해석', kind: '교육' },
    { date: '2018.12', title: '전산응용건축제도기능사', desc: '국가기술자격', kind: '자격' },
  ],

  cad: [
    { src: 'img/cad/piping.webp', thumb: 'img/cad/piping.webp', title: 'Piping Arrangement Drawing', tool: 'AutoCAD', desc: '냉각수 계통(펌프·열교환기·냉각탑) 배관 배치도, 1/50. 표제란은 가렸습니다.' },
    { src: 'img/cad/aveva-fr52.webp', thumb: 'img/cad/aveva-fr52.webp', title: '선체 횡단면 FR52 Section', tool: 'AVEVA Marine', desc: '종늑골 L0–L39 배치와 상세 A·B·C, 1/120. 표제란은 가렸습니다.' },
    { src: 'img/cad/nastran-static.webp', thumb: 'img/cad/nastran-static.webp', title: '커넥팅 로드 정적 해석', tool: 'NX Nastran', desc: '20 kN 하중, 최대 von Mises 201 MPa, 안전계수 1.74' },
    { src: 'img/cad/nastran-modal.webp', thumb: 'img/cad/nastran-modal.webp', title: '커넥팅 로드 모달 해석', tool: 'NX Nastran', desc: '고유진동수 621 / 946 / 5,750 Hz' },
    { src: 'img/cad/nastran-mesh.webp', thumb: 'img/cad/nastran-mesh.webp', title: '유한요소 메시', tool: 'NX Nastran', desc: 'CTETRA10, 절점 24,953개' },
    { src: 'img/cad/nx-body.webp', thumb: 'img/cad/nx-body.webp', title: '동력전달장치 본체', tool: 'Siemens NX', desc: '기계설계기사 과정평가형 반복 실습 (GC200)' },
    { src: 'img/cad/nx-shaft.webp', thumb: 'img/cad/nx-shaft.webp', title: '동력전달장치 축', tool: 'Siemens NX', desc: 'SM45C' },
    { src: 'img/cad/nx-gear.webp', thumb: 'img/cad/nx-gear.webp', title: '동력전달장치 스퍼기어', tool: 'Siemens NX', desc: 'SC480' },
    { src: 'img/cad/inventor-body.webp', thumb: 'img/cad/inventor-body.webp', title: '몸체 · 편심축 2D 도면', tool: 'Autodesk Inventor', desc: '3D 모델링 과목 평가 도면' },
    { src: 'img/dt/conveyor.webp', thumb: 'img/dt/conveyor.webp', title: '컨베이어 조립도 · BOM', tool: 'Autodesk Inventor', desc: '디지털트윈 과제용 설비 모델' },
  ],
}
