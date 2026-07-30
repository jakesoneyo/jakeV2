import type { Project } from "../types";

/**
 * 포트폴리오 프로젝트 목록 — 이 배열이 유일한 카드 데이터 소스다(ARCHITECTURE.md 3.1).
 * 새 프로젝트가 완성되면 아래 배열에 객체 하나만 추가한다. 컴포넌트/타입 수정 불필요.
 *
 * 예시:
 * {
 *   slug: 'url-shortener',
 *   title: 'URL Shortener',
 *   description: '단축 URL 발급·리다이렉트·클릭 통계 API.',
 *   types: ['외부API', '데이터/알고리즘'],
 *   stack: ['NestJS', 'Prisma', 'Neon Postgres', 'Redis'],
 *   status: 'completed',
 *   liveUrl: 'https://...',
 *   repoUrl: 'https://github.com/jakesoneyo/...',
 * },
 */
export const projects: Project[] = [
  {
    slug: "yuhyeon-construction",
    title: "유현건설 계측 모니터링 플랫폼",
    description:
      "20년 넘게 쓰인 레거시 현장 PC의 원시 계측 로그를 HMAC 서명 인증으로 안전하게 수집·적재하고, JWT 로그인 대시보드로 실시간 모니터링하는 IoT형 데이터 수집 플랫폼.",
    types: ["외부API", "인증/보안"],
    stack: ["NestJS", "Prisma", "Neon Postgres", "React", "Kakao Maps"],
    status: "completed",
    troubleshooting:
      "네트워크가 끊겼다 복구된 현장 에이전트가 같은 데이터를 재전송해도 중복 적재되면 안 됐다. 애플리케이션 레벨 check-then-act는 동시 요청에서 경쟁 상태가 생길 수 있어, Postgres 단일 CTE(INSERT...ON CONFLICT DO NOTHING + 조건부 본삽입)로 원자성을 보장했고, Testcontainers로 동시 20개 요청을 보내 정확히 1건만 적재되는 것까지 검증했다.",
    liveUrl: "https://yuhyeon.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/yuhyeon",
    apiHealthUrl: "https://yuhyeon.onrender.com/api/health",
  },
  {
    slug: "linkstash-ai",
    title: "LinkBrief — AI 자동요약 북마크 SaaS",
    description:
      "저장한 링크를 크롤링해 OpenAI로 자동 요약·태그를 생성하는 북마크 서비스. 크롤링부터 LLM 구조화 출력, 저장까지 외부 호출 실패를 흡수하는 파이프라인으로 설계했다.",
    types: ["외부API"],
    stack: ["NestJS", "Prisma", "Neon Postgres", "OpenAI API", "React", "Vite"],
    status: "completed",
    troubleshooting:
      'Neon 서버리스 Postgres 환경에서 여러 단계로 이어지는 인터랙티브 트랜잭션이 중간에 끊겨 "Transaction not found" 에러가 반복됐다. 서버리스 커넥션 특성상 트랜잭션을 오래 열어두는 방식이 맞지 않는다고 판단해, 인터랙티브 트랜잭션 대신 순차적인 단일 쓰기 방식으로 재설계해 해결했다.',
    liveUrl: "https://linkstash-ai.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/linkstash-ai",
    apiHealthUrl: "https://linkstash-ai-api.onrender.com/health",
  },
  {
    slug: "strongsalon",
    title: "스트롱쌀롱 — PT샵 회원 체력평가 시스템",
    description:
      "1:1 PT샵의 회원 체력평가·등급 산정과 트레이너 일정 알림을 다루는 관리 시스템. 카카오 OAuth와 JWT 인증, 6개 영역 가중치 채점·1RM 계산 등 도메인 로직을 구현했다.",
    types: ["인증/보안"],
    stack: ["NestJS", "TypeORM", "JWT", "Kakao OAuth", "React", "Recharts"],
    status: "completed",
    troubleshooting:
      "코드 리뷰 중, 인증 없이 호출해도 관리자 계정을 생성할 수 있는 `create-test-account` 백도어 엔드포인트를 발견했다. 즉시 제거하고, 이메일 형식 검증을 우회하던 커스텀 데코레이터도 표준 `@IsEmail` 검증으로 되돌려 실제 보안 결함을 없앴다.",
    liveUrl: "https://new-gym-front.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/newGym",
    apiHealthUrl: "https://newgym-1qof.onrender.com/health",
  },
  {
    slug: "pingboard",
    title: "Pingboard — 미니 게시판 + 실시간 알림함",
    description:
      "소켓은 신뢰할 수 없는 채널이라는 전제 위에서 설계한 실시간 알림 시스템. 댓글 작성과 알림 생성을 한 트랜잭션으로 묶고, 커밋 후에만 소켓으로 emit해 유실 없는 알림함을 만들었다.",
    types: ["실시간"],
    stack: ["NestJS", "TypeORM", "Socket.io", "Neon Postgres", "React", "Vite"],
    status: "completed",
    troubleshooting:
      "검수 중, 인증 없이 호출 가능한 GET /posts가 DTO를 공용으로 재사용하면서 전체 사용자의 이메일을 응답에 노출하고 있는 것을 발견했다. 응답 전용 AuthorSummaryDto를 분리하고 QueryBuilder에서 email 컬럼 선택 자체를 제거해 근본적으로 노출 경로를 차단했다.",
    liveUrl: "https://pingboard-sigma.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/pingboard",
    apiHealthUrl: "https://pingboard-server.onrender.com/health",
  },
];
