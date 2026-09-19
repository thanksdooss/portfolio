export default {
  id: 'clean-factory',
  titleShort: '클린 팩토리',
  sort: 2026.02,
  title: '클린 팩토리 — 저비용 스마트팩토리 교육 모델',
  oneLiner: '3D 프린팅 6축 로봇팔·컨베이어와 Unity 디지털트윈으로, 지역 학생이 스마트팩토리를 직접 만져 보는 교육 키트를 만들었습니다.',
  period: '2025.10 – 2026.02',
  context: '지역 산학 캡스톤 (지역사회문제해결)',
  roleShort: '팀장 (8인)',
  team: '8인 팀 · 참여기업 1곳',
  award: { short: '동상', full: '지역문제해결 캡스톤디자인&동아리 경진대회 동상 (2026.02.04)' },
  cover: 'img/cf/arm-close.webp',
  coverAlt: '3D 프린팅한 노란색 6축 로봇팔과 스테핑 모터',
  coverCaption: '3D 프린팅 6축 로봇팔 조립 과정',
  metrics: [
    { value: '8인', label: '팀장으로 운영' },
    { value: '약 11만 원', label: '부품 BOM 합계' },
    { value: '동상', label: '캡스톤 경진대회' },
  ],
  tags: ['Arduino Mega', 'C#', 'Unity', '3D 프린팅', '스테핑 모터', '팀 리딩'],
  problem: [
    '스마트팩토리 교육 장비는 비싸서, 학생이 직접 분해하고 고쳐 보며 배우기 어렵습니다. 지역 제조업 인력 양성이라는 과제를 "싸고, 직접 만들 수 있는 교육 키트"로 풀기로 했습니다.',
  ],
  approach: [
    [
      '공개된 오픈소스 아두이노 공장 프로젝트(녹칸다)를 기반으로 부품을 3D 프린팅해 6축 로봇팔과 컨베이어를 제작',
      'Arduino Mega 펌웨어(AccelStepper)로 스테핑 모터 구동, CSV 시리얼 프로토콜로 C# 대시보드·Unity 디지털트윈과 연결',
      '부품 주문서를 엑셀 BOM으로 관리해 총 부품비를 약 11만 원 수준으로 맞춤',
    ],
  ],
  role: [
    '팀장(대표 학생)으로 과제계획서를 작성하고 8인 팀의 일정·역할·예산을 운영했습니다.',
  ],
  result: [
    '지역문제해결 캡스톤디자인&동아리 경진대회에서 동상을 받았습니다.',
    '배운 점: 8명이 3D 프린팅·전자·소프트웨어로 나뉘면 인터페이스(핀 배치, 통신 형식)부터 문서로 합의해야 조립 단계에서 시간을 잃지 않는다는 것.',
  ],
  tech: [
    { group: 'Hardware', items: ['Arduino Mega', '28BYJ-48 스테핑 모터', '3D 프린팅 (FDM)'] },
    { group: 'Software', items: ['Arduino (AccelStepper)', 'C# 대시보드', 'Unity 디지털트윈', '시리얼 통신'] },
  ],
  gallery: [
    { src: 'img/cf/arm-line.webp', title: '로봇팔·컨베이어 라인 조립', tool: '3D 프린팅 · Arduino' },
    { src: 'img/cf/arm-close.webp', title: '6축 로봇팔 근접', tool: '3D 프린팅' },
  ],
  links: [],
  note: ['로봇팔·제어보드·기본 펌웨어는 오픈소스 "녹칸다" 아두이노 공장 프로젝트를 기반으로 했습니다.'],
  pdf: { line: '8인 팀장, 오픈소스 기반 3D 프린팅 로봇팔 + Unity 디지털트윈 교육 키트 → 캡스톤 경진대회 동상' },
}
