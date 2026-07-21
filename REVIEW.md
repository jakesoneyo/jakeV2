# REVIEW — Portfolio Hub (jakeV2)

배포 전 최종 검수. 프로젝트 성격: **프론트엔드 전용 정적 사이트**(Vite+React+TS+Tailwind v4, 난이도 S).
상위 CLAUDE.md 품질표의 백엔드 항목(인증/Swagger/Testcontainers/DB마이그레이션)은 **N/A**.

검수일: 2026-07-21 · 검수 커밋: `bae595d`

---

## 결론: 배포 승인 가능 (blocker 0건)

빌드/테스트/린트 전부 통과, SPEC DoD 8개 항목 전부 충족, DESIGN "B. Console" 시안 충실 구현,
ponytail 위반 없음, 시크릿 하드코딩 없음. 배포 최종 결정은 사람이 한다.

---

## 검증 실행 결과

| 명령 | 결과 |
|------|------|
| `npm run build` (`tsc -b && vite build`) | ✅ 성공 (built in ~135ms, 타입 에러 0) |
| `npm run test` (vitest) | ✅ 2 passed (빈 상태 ↔ 카드 렌더 데이터 주도 검증) |
| `npm run lint` (oxlint) | ✅ exit 0, 경고 0 |
| 시크릿 스캔 (`grep api_key/secret/password/token`) | ✅ 하드코딩 없음 |

## SPEC 성공 기준(DoD) 대조

| # | 기준 | 상태 |
|---|------|------|
| 1 | 4개 섹션 한 페이지 렌더 | ✅ (Hero+About+Skills+Projects+Contact — intro를 Hero/About로 분리, 스펙 충족) |
| 2 | 카드가 **오직 `projects.ts`** 로부터 생성 (하드코딩 없음) | ✅ `Projects.tsx`는 `projects.map`만 수행, 하드코딩 카드 0 |
| 3 | 빈 데이터 시 빈 상태 UI | ✅ `EmptyState` "포트폴리오 프로젝트 준비 중" |
| 4 | 항목 1개 추가 시 컴포넌트 수정 없이 카드 1개 증가 | ✅ 유닛 테스트로 회귀 보장 |
| 5 | 모바일(375)·데스크톱(≥1024) 미깨짐 | ✅ 1→md2→lg3 그리드, `bae595d` 가로 스크롤 수정 반영 확인 |
| 6 | 키보드 Tab 도달·활성화, 포커스 링 | ✅ 스킵 링크 + 앰버 `focus-visible` outline |
| 7 | `npm run build` 성공 | ✅ |
| 8 | README에 실행/배포/`projects.ts` 추가법 문서화 | ✅ 전부 문서화 |

---

## 🟢 Good

- **데이터 주도 설계 정확히 구현**: `projects.ts`가 유일 소스, `Projects.tsx`/`ProjectCard.tsx` 순수 표현. 하드코딩 카드 없음. 유닛 테스트가 이 핵심 계약(빈 상태 ↔ 항목 렌더)을 회귀 방지로 고정 — S 티어 "핵심만" 테스트 요건 충족.
- **`bae595d` 모바일 수정 정상 반영**: Hero 파이프라인 SVG의 강제 `min-w-[640px]` 제거 → `width=100%`+viewBox 유동. Header nav는 모바일에서 라벨 `sr-only` + 번호만 노출(스크린리더엔 전체 텍스트 유지)로 한 줄 유지. `body { overflow-x: hidden }` 방어선. 소스에 잔존 고정폭 없음 확인.
- **접근성 탄탄**: 시맨틱 랜드마크(`header/main/section/footer`), 섹션별 `aria-labelledby`, 스킵 링크(포커스 시 노출), 앰버 focus-visible, 장식 SVG `aria-hidden`, `prefers-reduced-motion`에서 status-dot/flow-dot/smooth-scroll 정지. DESIGN 접근성 원칙 전부 반영.
- **DESIGN "B. Console" 충실**: 다크 고정(`color-scheme: dark`, 라이트 토글 없음), 앰버 `#e8a23d`, 모노스페이스 기본 본문 + Pretendard 문단 병행, `~/about` 콘솔 경로 헤더, agent→ingest api→postgres 파이프라인, 01~04 nav 인덱스, 구직중 그린 상태 라인. 팔레트 토큰이 DESIGN.md와 정확히 일치.
- **보안/링크 위생**: 외부 링크(GitHub — Contact/Footer)에 `target="_blank" rel="noopener noreferrer"` 일관 적용. ProjectCard의 live/repo 링크도 동일. mailto는 해당 없음. 시크릿·env 하드코딩 없음(백엔드 없음).
- **ponytail 준수**: `package.json`에 상태관리 라이브러리·라우터·CMS·다크모드 토글·i18n 전무. 폰트 self-host(번들 포함, CDN 의존 제거). 의존성 최소.
- **커밋 히스토리**: Conventional Commits 일관(`docs:`/`feat:`/`test:`/`fix:`), 의미 단위 분리. 면접용 히스토리로 적합.
- **웹폰트 self-host**: Pretendard/JetBrains Mono를 CDN이 아닌 번들에 포함 — 오프라인/프라이버시/로딩 안정성 유리.

## 🟡 개선 제안 (배포 비차단, 후속 처리 가능)

1. **`ProjectCard.tsx`의 `TYPE_LABELS` 변수명이 실제 의미와 불일치** — 이 상수는 `status`(completed/in-progress/coming-soon)를 한글 라벨로 매핑하는데 이름은 `TYPE`이다(`types` 배지와 혼동 유발). `STATUS_LABELS`로 개명 권장. 동작에는 문제 없음.
2. **OG 이미지 부재** — `index.html`에 `og:title/description/type`은 있으나 `og:image`가 없어 링크 공유 시 썸네일 미노출. ARCHITECTURE는 `public/` OG 이미지를 언급. 포트폴리오 공유 임팩트를 위해 1장 추가 권장.
3. **빈 상태가 현재 프로덕션의 기본 화면** — `projects.ts`가 빈 배열이라 배포 즉시 Projects 섹션은 "준비 중"만 노출. 설계상 의도된 정상 상태지만, 첫 배포 인상 강화를 위해 완성 프로젝트가 나오는 대로 최우선으로 항목 추가 권장(스펙 위반 아님).
4. **상태 배지에 맥락 라벨 없음** — 카드 우상단 "완료/진행중" 배지가 시각적으로는 명확하나 스크린리더 사용자에겐 무엇에 대한 상태인지 문맥이 약함. `aria-label="상태: 완료"` 등 보강하면 접근성 상향(현 수준도 S 티어 기준 합격).

## N/A (이 프로젝트 비적용)

- 인증/권한, @nestjs/swagger, Testcontainers 통합 테스트, DB 설계·마이그레이션·인덱스, N+1, 트랜잭션, CORS, 서버 에러 응답 규격 — **백엔드/DB 없음**으로 전부 해당 없음(SPEC 3장에서 명시적 비범위).

---

## Blocker 수정 지시

없음. 위 🟡 항목은 배포를 막지 않는 후속 개선 권장 사항이다.
