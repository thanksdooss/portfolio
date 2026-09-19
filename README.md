# portfolio

김진녕 포트폴리오 — 조선·제조 현장을 아는 AI 엔지니어

**https://thanksdooss.github.io/portfolio/**

- 기술영업 트랙으로 보기: https://thanksdooss.github.io/portfolio/?track=sales
- PDF 요약본: https://thanksdooss.github.io/portfolio/kim-jinnyeong-portfolio.pdf

## 스택

Vue 3 (Composition API) · vue-router · Vite · GitHub Actions → GitHub Pages

## 명령어

```bash
npm install
npm run dev          # 개발 서버
npm run build        # 배포용 빌드 (dist/)
npm run pdf          # PDF 요약본 재생성 (public/, Chrome 필요)
npm run check:privacy dist   # 빌드 결과물 공개 금지어 검사 (.privacy-terms 필요)
```

## 구조

- `src/config/site.config.js` — 지원 트랙(DT/기술영업)별 첫 화면 문구·대표작 순서
- `src/data/projects/*.js` — 프로젝트 1개 = 파일 1개 (`_template.js` 복사해서 추가)
- `src/data/skala.js`, `src/data/archive.js` — SKALA 타임라인, 수상·활동·CAD 갤러리
- `docs/` — 콘텐츠 인벤토리, 사이트 구조안
