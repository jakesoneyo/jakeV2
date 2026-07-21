# DESIGN — Portfolio Hub

## 진행 방식
`design-taste-frontend` 스킬로 서로 다른 방향의 시안 3개를 HTML Artifact로 생성해 사람이 A/B 비교 후 선택.

## 시안 3개
- **A. Signal** — 밝은 톤, 청록(cyan-teal) 액센트, 클라이언트→API→DB 요청 흐름 다이어그램. Linear 스타일의 깔끔한 기술 미니멀.
- **B. Console** — 다크 모드, 앰버 액센트, 모노스페이스 중심, 데이터 파이프라인(agent→ingest api→postgres) 다이어그램. 모니터링/터미널 무드.
- **C. Blueprint** — 그래프페이퍼 배경, 엔지니어링 도면(타이틀블록) 레이아웃. 안전 오렌지 액센트.

## 선택 결과
**B. Console** 채택.

## 확정 톤 & 토큰
- **테마:** 다크 고정 (라이트 모드 없음 — 의도적 단일 테마)
- **팔레트:** bg `#0a0c0f` · surface `#12151a` / `#171b21` · ink `#e7eaee` · ink-soft `#9aa3af` · line `#232830` · accent 앰버 `#e8a23d` · 상태(구직중) 그린 `#3ecf7e`
- **타이포:** 헤드라인/라벨 모노스페이스(`JetBrains Mono` 계열, 시스템 폴백), 본문(소개 문단)은 가독성 위해 `Pretendard`/시스템 산세리프 병행
- **레이아웃:** 상단 고정 nav(01~04 섹션 인덱스), Hero(상태 라인 + 헤드라인 + CTA + 데이터 파이프라인 다이어그램), `~/about · ~/skills · ~/projects · ~/contact` 형태의 섹션 헤더(콘솔 경로 컨셉)
- **Skills:** Frontend / Backend(★ 주력 강조) / Data·Deploy 3열 리스트
- **Projects:** 빈 상태 카드 ("포트폴리오 프로젝트 준비 중") — `projects.ts` 데이터 파일과 연동해 항목 추가 시 자동 렌더
- **Contact:** 이메일 + GitHub 카드만, 전화번호 없음
- **접근성:** 스킵 링크, 포커스 링(앰버), `prefers-reduced-motion` 시 pulse/흐름 애니메이션 정지

## 구현 시 참고
implementer는 이 DESIGN.md 톤·팔레트·레이아웃을 그대로 React 컴포넌트로 옮긴다. Artifact는 순수 정적 HTML 목업이며 실제 코드는 아니다 — 색상 토큰과 구조만 그대로 가져가고, ARCHITECTURE.md의 컴포넌트/데이터 스키마 설계를 따른다.
