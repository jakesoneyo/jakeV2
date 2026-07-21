# jakeV2 — Portfolio Hub

손영선(신입 풀스택/백엔드 개발자, GitHub [`jakesoneyo`](https://github.com/jakesoneyo))의 개인 포트폴리오 허브 랜딩 페이지.
포폴 워크스페이스에서 완성되는 프로젝트들을 모아 보여주는 관문(hub) 역할을 한다.

- **스택:** Vite + React + TypeScript + Tailwind v4 (프론트 전용, 백엔드/DB/API 없음)
- **디자인:** 다크 고정 테마, 모노스페이스(JetBrains Mono) + Pretendard 조합의 "Console" 톤 (`DESIGN.md` 참고)
- **핵심 설계:** 프로젝트 카드는 오직 `src/data/projects.ts` 데이터로만 렌더된다 — 새 프로젝트 추가 시 컴포넌트 수정 불필요

## 실행법

```bash
npm install
npm run dev      # http://localhost:5173
```

## 빌드 · 테스트

```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # 프로덕션 빌드 로컬 미리보기
npm run test     # Vitest — Projects 컴포넌트의 데이터 주도 렌더링(빈 상태 ↔ 카드) 검증
```

## 배포 (Vercel)

이 저장소는 프론트엔드 전용 정적 사이트이므로 Vercel에 그대로 배포한다.

1. Vercel에서 이 GitHub 저장소를 Import
2. Framework Preset: **Vite** (자동 감지), Build Command `npm run build`, Output Directory `dist` (`vercel.json`에 이미 명시)
3. 배포 후 발급되는 프로덕션 URL 확인

## `projects.ts`에 프로젝트 추가하는 법

새 포트폴리오 프로젝트가 완성되면 `src/data/projects.ts`의 `projects` 배열에 객체를 하나 추가한다. **컴포넌트 코드는 수정하지 않는다.**

```ts
// src/data/projects.ts
export const projects: Project[] = [
  {
    slug: 'url-shortener',                 // 안정적 key
    title: 'URL Shortener',
    description: '단축 URL 발급·리다이렉트·클릭 통계 API.',
    types: ['외부API', '데이터/알고리즘'],   // src/types.ts의 ProjectType 중 선택
    stack: ['NestJS', 'Prisma', 'Neon Postgres', 'Redis'],
    status: 'completed',                   // 'completed' | 'in-progress' | 'coming-soon'
    liveUrl: 'https://...',                // 없으면 필드 자체를 생략(optional)
    repoUrl: 'https://github.com/jakesoneyo/...',
  },
];
```

- 배열이 비어 있으면 `~/projects` 섹션에 "포트폴리오 프로젝트 준비 중" 빈 상태 카드가 자동으로 뜬다.
- `liveUrl`/`repoUrl`은 optional이라 값이 있을 때만 카드에 버튼이 렌더된다.
- `types` 배지는 포폴 워크스페이스의 다양성 태그(CRUD·실시간·데이터/알고리즘·외부API·인증/보안)와 동일 체계다.

## 폴더 구조

```
src/
├── data/          # profile · skills · projects (콘텐츠는 여기서만 관리)
├── types.ts       # Project / Profile / SkillCategory 등 공용 타입
├── components/
│   ├── layout/    # Header, Footer
│   └── sections/  # Hero, About, Skills, Projects, ProjectCard, Contact
└── App.tsx        # 섹션 조립
```

## 설계 문서

- [`SPEC.md`](./SPEC.md) — 요구사항·성공 기준
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — 폴더 구조·데이터 스키마·컴포넌트 구성
- [`DESIGN.md`](./DESIGN.md) — 확정된 디자인 톤·팔레트
