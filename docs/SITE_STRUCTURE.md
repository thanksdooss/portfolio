# 사이트 구조안

**한 줄 정체성**: 조선·제조 현장을 아는 AI 엔지니어 / 직접 만들고, 현장의 언어로 설명하는 사람

**원칙**: 표면은 선별, 깊이는 클릭으로.

## 화면 구성

```
/#/                       홈
 ├ Hero                   한 줄 소개 + 핵심 사실 4개 + CTA(대표작 / PDF / GitHub)
 │                        인터랙티브 선체 단면 스케치(포인터로 파고 조절, 횡동요)
 ├ 강점 3가지             직접 만든다 / 현장 언어 / 설명·설득  (트랙별 순서)
 ├ 대표작 4개             카드 → 케이스 스터디
 ├ SKALA                  과목별 산출물 타임라인(핵심만 → 전체 20과목 펼침)
 │                        + 팀 프로젝트 자리(진행 예정 → 완료 시 카드)
 ├ 아카이브 (탭)          프로젝트 / 수상 / CAD 갤러리(라이트박스) / 활동·교육 / 학력·자격
 └ 연락                   GitHub, PDF 요약본

/#/p/:id                  케이스 스터디: 문제 → 접근 → 내 역할 → 결과 → 기술
                          + 지표, 갤러리(라이트박스), 설문 차트, "밝혀 둘 점"(오픈소스·템플릿·팀 기여 구분)
/#/print                  PDF 요약본(A4 2쪽) 원본 화면
```

## 지원처별 전환 (설정 파일 1개)

`src/config/site.config.js`

| 트랙 | 첫 화면 문구 | 대표작 순서 |
|---|---|---|
| `dt` (기본) | 조선·제조 현장을 아는 AI 엔지니어 | HD 검증 Assistant → SKALA marine → 디지털트윈 → SKAVOCA |
| `sales` | 직접 만들어 보고, 현장의 언어로 설명합니다 | HD 검증 Assistant → 해커톤·FLOW → 디지털트윈 → SKALA marine |

전환 방법: 링크에 `?track=sales` / 빌드 시 `VITE_TRACK=sales` / `defaultTrack` 변경.

## 데이터 구조

```
src/config/site.config.js     트랙별 문구·대표작 순서
src/data/profile.js           이름, 학력(학교명 없음), 강점
src/data/projects/*.js        프로젝트 1개 = 파일 1개 (자동 수집, status:'draft'면 숨김)
src/data/projects/_template.js  SKALA 팀 프로젝트용 템플릿
src/data/skala.js             SKALA 과목 타임라인
src/data/archive.js           수상·활동·학력·CAD 갤러리
public/img/**                 웹용 WebP (메타데이터 제거, 학교명·학번 가림)
```

## SKALA 팀 프로젝트 추가 절차 (12월)

1. `src/data/projects/_template.js`를 `skala-final.js`로 복사해 내용 작성, `status: 'published'`
2. 이미지를 `public/img/skala-final/`에 WebP로 추가
3. `src/data/skala.js` → `projects`에 id 추가, `upcoming` 항목 삭제
4. 대표작으로 올리려면 `site.config.js`의 `featured`에 id 추가
5. `npm run pdf`로 PDF 요약본 재생성 → 커밋·푸시하면 자동 배포

## 기술·배포

- Vue 3 (Composition API) + vue-router(해시 모드) + Vite. 모션은 GSAP ScrollTrigger + Lenis, 첫 화면 선도(Body Plan)는 Canvas 2D로 직접 구현
- GitHub Actions → GitHub Pages. 빌드 후 비공개 검사어로 결과물 전수 검사, 1건이라도 나오면 배포 중단
- 모바일 우선 반응형, 이미지 지연 로딩, WebP, OG 태그(카카오톡 미리보기)
- PDF: `npm run pdf` (Chrome 헤드리스로 `#/print` 인쇄)

## 디자인 콘셉트 — 현도(現圖, Lofting)

조선소에서 설계 도면의 선을 실물 크기로 옮기는 공정. "AI를 현장이 쓸 수 있는 크기로 옮긴다"는 일하는 방식을 시각 언어로 삼았다.

- 색: 현도장 바닥 같은 먹색 배경 + 흰 먹선 + 방청 도료(primer)의 주황 한 점
- 서체: Pretendard(국문 헤드라인, 굵고 좁은 자간) · Instrument Serif 이탤릭(영문 강조) · JetBrains Mono(도면 치수 문자 같은 라벨)
- 첫 화면: 선도 정면도(Body Plan)가 먹선처럼 그려지고, 포인터에 가장 가까운 station이 주황으로 켜지며 반폭을 표시
- 스크롤: 철학 문장이 단어 단위로 진해짐, SKALA 20과목은 가로로 흐르는 공정표(데스크톱 고정 스크롤)
- 대표작: 큰 제목 행 + 커서를 따라오는 미리보기, 케이스 스터디는 고정 목차(스크롤 스파이)와 "배운 점" 인용구
- `prefers-reduced-motion`이면 모든 모션을 끄고 정적으로 보여 준다

### 2차 고도화
- 도입: 1.6초 프리로더(중앙단면 먹선 + 000→100), 세션당 1회, 막이 위로 걷히며 첫 화면 시작
- 첫 화면: 글자 단위 등장 + 커서 근처 글자가 굵어지는 가변 폰트, 스크롤하면 선도가 실물 크기로 확대(현도)되며 사라짐
- 대표작: 왼쪽 글이 한 작품씩 지나가고 오른쪽 "도면 시트"(FIG. 번호·코너 마크·진행 눈금)가 고정된 채 그림만 전환
- 원칙: 밝은 도면지가 어두운 페이지 위로 올라오고 카드 3장이 겹겹이 쌓임
- SKALA: 가로 공정표 + 월(2026.07–12) 진행 스크러버
- 전역: 제목 줄 단위 마스크 등장, 이미지 클립 리빌, 마그네틱 버튼, 상단 진행선 + 현재 섹션 표시, 주황 절단선 페이지 전환
- 푸터: KST 실시간 시계, 이메일 복사, 외곽선 대형 이름

### 3차 — 마케팅 관점 적용 (전략은 docs/POSITIONING.md)
- 문장 덜어내기: 첫 화면 소개는 한 줄, 섹션 설명은 한 문장으로
- 대표작 → 케이스 스터디: 보던 도면이 그 자리에서 표지로 자라나는 전환(FLIP). 이때는 커튼 전환을 건너뛴다
- 섹션마다 주황 절단선이 한 번 지나가며 전환을 알린다
- 대표작을 지나야 뜨는 작은 연락 버튼(관심을 보인 방문자에게만 전환 유도)
