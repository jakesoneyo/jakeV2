# PLAN — Portfolio Hub (S 티어, 하루 완성)

implementer(Sonnet)가 **큰 덩어리 3개**로 받아 콜드스타트 오버헤드를 최소화한다.
각 덩어리는 독립적으로 검수 가능한 단위이며, 순서대로 진행한다.

전제: `jakeV2/` 폴더는 존재. SPEC.md / ARCHITECTURE.md / PLAN.md 이미 작성됨.

---

## 덩어리 1 — 스캐폴드 + 레이아웃 골격 + 데이터 계층

**목표:** 빌드되는 빈 사이트 + 타입/데이터 파일 뼈대 + 섹션 자리표시자.

- [ ] Vite React-TS 스캐폴드 (`npm create vite@latest . -- --template react-ts`), 폴더 정리
- [ ] Tailwind v4 설치·설정 (`@import "tailwindcss";` in `index.css`, Vite 플러그인)
- [ ] `src/types.ts` — `Project`, `ProjectType`, `ProjectStatus`, `SkillCategory`, `Profile` (ARCHITECTURE 3장 그대로)
- [ ] `src/data/profile.ts` — 이름·tagline·intro·email(`jakesoneyo@gmail.com`)·github(`https://github.com/jakesoneyo`). 문구는 아래 "콘텐츠 지침" 참고
- [ ] `src/data/skills.ts` — Frontend / Backend / Data · Deploy 3카테고리 (아래 지침)
- [ ] `src/data/projects.ts` — **빈 배열 또는 coming-soon 플레이스홀더 1개**. 상단에 "새 프로젝트는 여기에 객체 추가" 주석
- [ ] `App.tsx` — `Header` + `main`(Hero/Skills/Projects/Contact 자리표시자) + `Footer` 조립, 앵커 id
- [ ] `Header`/`Footer` 골격 (앵커 네비)
- [ ] 스킵 링크, 시맨틱 랜드마크, 기본 컨테이너/타이포 세팅
- [ ] `npm run build` 통과 확인

**검수 게이트:** 빌드 성공 + 4개 섹션 자리와 네비가 뜬다.

---

## 덩어리 2 — Hero / Skills 섹션 (정적 콘텐츠)

**목표:** 상단 두 섹션 완성 + 반응형·접근성.

- [ ] `Hero.tsx` — 이름·tagline·intro, 연락 CTA 버튼(이메일 mailto·GitHub). `profile` 소비
- [ ] `Skills.tsx` — `skills` map → 카테고리 카드 3개, 각 태그 pill. `md` 이상 2~3열, 모바일 1열
- [ ] 포커스 링·대비·`aria-labelledby` 적용
- [ ] 앵커 스크롤 동작 확인(`scroll-behavior: smooth`)

**검수 게이트:** 모바일/데스크톱에서 Hero·Skills가 깨지지 않고 키보드 이동 가능.

---

## 덩어리 3 — Projects(데이터 주도) + Contact + 배포 마감

**목표:** 핵심 요구사항(데이터 주도 카드) + 마무리 + Vercel.

- [ ] `ProjectCard.tsx` — `Project` props: 제목·설명·타입 배지·스택 pill·조건부 live/repo 버튼(optional 필드 있을 때만)
- [ ] `Projects.tsx` — `projects` map → 반응형 그리드(1→2→3열). **빈 상태 UI**("포트폴리오 프로젝트 준비 중") 처리 (성공 기준 3)
- [ ] `Contact.tsx` — 이메일(mailto)·GitHub 링크만. **전화번호 없음**
- [ ] 외부 링크 `rel="noopener noreferrer"`, 파비콘/OG 메타(`index.html`)
- [ ] `README.md` — 소개, 실행법(`npm i / dev / build`), 배포법, **`projects.ts`에 항목 추가하는 법**
- [ ] `vercel.json`(필요 시) + Vercel 배포
- [ ] 최종 확인: 데이터에 항목 1개 추가 시 카드가 코드 수정 없이 늘어나는지 스모크 테스트

**검수 게이트(= DoD):** SPEC 5장 성공 기준 전부 충족. 배포 전 사람 승인 게이트(라이브 미리보기 + 리뷰 요약 제시 후 OK).

---

## 콘텐츠 지침 (PDF 기반, 랜딩 톤으로 다듬되 사실 왜곡 금지)

원본: `손영선_포트폴리오.pdf`. 그대로 복사하지 말고 랜딩용으로 간결화.

- **tagline (한 줄):** "요구사항 분석부터 설계·구현·연동·배포까지 아우르는 신입 풀스택 개발자" 톤
- **intro (2~3문장):** 백엔드(NestJS/Express·JWT·API 설계)에서 시작해 프론트까지 확장하는 풀스택 지향, 데이터 수집·정제·저장·가공·조회 흐름을 실무 맥락에서 다뤄본 강점, 배포 후 운영/오류 대응 경험. (실무 프로젝트명은 언급하지 않음 — 경력 섹션은 이번 스코프 제외)
- **skills 태그 (PDF 핵심 역량 그대로, 왜곡 금지):**
  - Frontend: React, Next.js, TypeScript, Tailwind CSS, Recharts, Flutter, Riverpod, go_router
  - Backend: Express, NestJS, TypeScript, JWT, bcrypt, Swagger, WebSocket
  - Data · Deploy: PostgreSQL, Render, Vercel, CORS, ExcelJS, jsPDF
- **연락처:** email `jakesoneyo@gmail.com`, github `https://github.com/jakesoneyo` (전화번호 제외)

## 하지 말 것 (ponytail 가드레일)

- 상태관리 라이브러리·라우터·CMS·다크모드·i18n 도입 금지
- 하드코딩된 프로젝트 카드 금지 (반드시 `projects.ts` 경유)
- 미래 가정 필드를 스키마에 추가 금지 (ARCHITECTURE 3장 필드만)
- 실무 경력 프로젝트(유현건설/스트롱쌀롱) 이번 구현에 넣지 말 것
