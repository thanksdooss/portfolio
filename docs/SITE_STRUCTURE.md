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

- Vue 3 (Composition API) + vue-router(해시 모드) + Vite, 외부 UI 라이브러리 없음
- GitHub Actions → GitHub Pages. 빌드 후 비공개 검사어로 결과물 전수 검사, 1건이라도 나오면 배포 중단
- 모바일 우선 반응형, 이미지 지연 로딩, WebP, OG 태그(카카오톡 미리보기)
- PDF: `npm run pdf` (Chrome 헤드리스로 `#/print` 인쇄)
