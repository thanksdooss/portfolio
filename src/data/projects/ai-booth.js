export default {
  id: 'ai-booth',
  sort: 2025.11,
  title: 'AI를 속여라! — 비전 AI 체험 부스',
  oneLiner: '부스를 기획하고 YOLOv8·MediaPipe 체험 앱을 직접 짜서, 6가지 체험 모드로 AI를 처음 접하는 방문객에게 "AI가 세상을 어떻게 보는지" 설명했습니다.',
  period: '2025.11',
  context: '지역 산학 페스티벌 부스 운영 (동아리)',
  roleShort: '부스 기획 · 체험 앱 개발',
  team: '동아리 팀 (운영은 팀원 전체 교대)',
  award: null,
  cover: null,
  metrics: [
    { value: '83명', label: '만족도 설문 응답' },
    { value: '4.5 / 5', label: '"설명이 이해에 도움" 평균' },
    { value: '6종', label: '체험 모드' },
  ],
  tags: ['YOLOv8', 'MediaPipe', 'OpenCV', 'Tkinter', '과학 커뮤니케이션'],
  problem: [
    '방문객의 절반 이상이 YOLO나 MediaPipe를 전혀 모르는 상태였습니다(설문 응답 55%, 51%). 기술을 보여주는 것만으로는 부족하고, 짧은 시간에 이해시키는 설명이 필요했습니다.',
  ],
  approach: [
    [
      '하나의 Python 앱에 6가지 체험 모드: 얼굴 인식, 손 인식, 표정으로 보는 "너 T야? F야?", 캐릭터 반응, 랜덤 멘트, 커스텀 문구',
      'YOLOv8 얼굴 검출 모델 + MediaPipe 손·얼굴 랜드마크, OpenCV·Tkinter 화면',
      '"AI를 속여 보세요" 미션으로 신뢰도 점수(0.5 / 0.8 / 0.9)에 따라 상품을 주는 참여형 구성',
      '현장 네이버 폼 만족도 설문으로 설명 방식 피드백 수집',
    ],
  ],
  role: [
    '부스 콘셉트("AI를 속여라!")와 체험 구성, 상품 규칙을 기획했습니다.',
    '6가지 체험 모드가 들어간 Python 앱(YOLOv8·MediaPipe·OpenCV·Tkinter)을 직접 작성했습니다.',
    '현장 운영과 설명은 팀원 전체가 교대로 맡았고, 저도 방문객에게 "AI가 얼굴을 찾는 원리"를 설명했습니다.',
  ],
  result: [
    '설문 83명 응답: 스태프 설명이 이해에 도움이 됐다 평균 4.5점(5점 65%), 반응 속도 4.3점. 가장 인기 있던 체험은 "AI가 보는 내 얼굴"(53%)이었습니다.',
    '배운 점: 비전공자에게는 모델 이름보다 "지금 화면의 네모 박스가 AI의 확신도"처럼 눈앞의 현상으로 설명할 때 반응이 가장 좋았습니다.',
  ],
  tech: [
    { group: 'Vision AI', items: ['YOLOv8 (Face)', 'MediaPipe', 'OpenCV'] },
    { group: 'App', items: ['Python', 'Tkinter', 'threading'] },
  ],
  gallery: [],
  survey: {
    title: '방문객 만족도 설문 (n = 83)',
    items: [
      { label: '스태프 설명이 이해에 도움', avg: 4.5, dist: [0, 0, 11, 18, 54] },
      { label: '체험 화면 반응 속도', avg: 4.3, dist: [0, 1, 15, 22, 45] },
    ],
  },
  links: [],
  note: ['부스 사진은 방문객 얼굴이 포함되어 싣지 않았습니다.'],
  pdf: { line: '비전 AI 체험 부스 기획 + YOLOv8·MediaPipe 체험 앱 직접 개발, 83명 설문 "설명 이해 도움" 4.5/5' },
}
