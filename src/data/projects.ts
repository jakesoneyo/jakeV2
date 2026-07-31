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
    slug: "linkstash-ai",
    title: "LinkBrief — AI 자동요약 북마크 SaaS",
    description:
      "저장한 링크를 크롤링해 OpenAI로 자동 요약·태그를 생성하는 북마크 서비스. 크롤링부터 LLM 구조화 출력, 저장까지 외부 호출 실패를 흡수하는 파이프라인으로 설계했다.",
    types: ["외부API"],
    stack: ["NestJS", "Prisma", "Neon Postgres", "OpenAI API", "React", "Vite"],
    status: "completed",
    detail: {
      intro:
        "링크를 저장하면 서버가 페이지를 크롤링해 본문과 메타데이터를 추출하고, OpenAI Structured Outputs로 요약과 태그를 생성한다. 저장 요청은 즉시 응답하고 크롤링·요약은 백그라운드에서 처리하며, 실패해도 에러를 던지는 대신 상태로 남겨 재처리할 수 있게 했다.",
      highlights: [
        "링크 저장을 PENDING 상태로 즉시 응답하고, 크롤링·요약은 백그라운드 작업으로 분리했다.",
        "OpenAI Structured Outputs에 Zod 스키마를 적용해 요약·태그 응답 형식을 서버에서 강제했다.",
        "크롤링·LLM 호출 실패를 PENDING → READY/FAILED 상태 머신으로 처리하고, 재처리 엔드포인트를 뒀다.",
        "소유권 가드로 다른 사용자의 링크에는 접근할 수 없도록 멀티테넌시를 분리했다.",
        "태그 다중 필터와 텍스트 검색, 커서 페이지네이션으로 목록 조회를 구현했다.",
        "Testcontainers로 실제 Postgres를 띄워 회원가입부터 소유권 격리까지 통합 테스트로 검증했다.",
      ],
    },
    troubleshooting:
      'Neon 서버리스 Postgres 환경에서 여러 단계로 이어지는 인터랙티브 트랜잭션이 중간에 끊겨 "Transaction not found" 에러가 반복됐다. 서버리스 커넥션 특성상 트랜잭션을 오래 열어두는 방식이 맞지 않는다고 판단해, 인터랙티브 트랜잭션 대신 순차적인 단일 쓰기 방식으로 재설계해 해결했다.',
    liveUrl: "https://linkstash-ai.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/linkstash-ai",
    apiHealthUrl: "https://linkstash-ai-api.onrender.com/health",
  },
  {
    slug: "pingboard",
    title: "Pingboard — 미니 게시판 + 실시간 알림함",
    description:
      "소켓은 신뢰할 수 없는 채널이라는 전제 위에서 설계한 실시간 알림 시스템. 댓글 작성과 알림 생성을 한 트랜잭션으로 묶고, 커밋 후에만 소켓으로 emit해 유실 없는 알림함을 만들었다.",
    types: ["실시간"],
    stack: ["NestJS", "TypeORM", "Socket.io", "Neon Postgres", "React", "Vite"],
    status: "completed",
    detail: {
      intro:
        "게시판에 달린 댓글을 실시간으로 알려주는 알림함이다. 소켓은 신뢰할 수 없는 채널이라는 전제 아래, 댓글과 알림 저장을 한 트랜잭션으로 묶어 커밋 이후에만 emit하고, 재연결 시에는 REST로 미읽음 목록을 다시 가져와 소켓 유실 여부와 무관하게 데이터가 채워지도록 했다.",
      highlights: [
        "소켓 연결 시 미들웨어에서 JWT를 검증해 실패하면 핸드셰이크 자체를 거부하고 재연결 루프를 막았다.",
        "userId 기반 room과 소켓 registry를 함께 둬 멀티탭·멀티기기에 동시에 알림이 가도록 했다.",
        "댓글 저장과 알림 저장을 하나의 트랜잭션으로 묶어, emit 실패가 응답 자체를 막지 않게 했다.",
        "재연결 시 REST로 안 읽은 알림을 다시 가져오는 방식으로 유실 없이 동기화되게 했다.",
        "복합 인덱스 컬럼 순서를 설계하고, 프론트에서는 TanStack Query 캐시를 알림 목록의 유일한 소유자로 뒀다.",
        "서버 프로세스를 실제로 종료·재기동시켜 소켓 레지스트리가 새로 시작되는 상황까지 재현해 재동기화를 확인했다.",
      ],
    },
    troubleshooting:
      "검수 중, 인증 없이 호출 가능한 GET /posts가 DTO를 공용으로 재사용하면서 전체 사용자의 이메일을 응답에 노출하고 있는 것을 발견했다. 응답 전용 AuthorSummaryDto를 분리하고 QueryBuilder에서 email 컬럼 선택 자체를 제거해 근본적으로 노출 경로를 차단했다.",
    liveUrl: "https://pingboard-sigma.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/pingboard",
    apiHealthUrl: "https://pingboard-server.onrender.com/health",
  },
  {
    slug: "yuhyeon-construction",
    title: "유현건설 계측 모니터링 플랫폼",
    description:
      "20년 넘게 쓰인 레거시 현장 PC의 원시 계측 로그를 HMAC 서명 인증으로 안전하게 수집·적재하고, JWT 로그인 대시보드로 실시간 모니터링하는 IoT형 데이터 수집 플랫폼.",
    types: ["외부API", "인증/보안"],
    stack: ["NestJS", "Prisma", "Neon Postgres", "React", "Kakao Maps"],
    status: "completed",
    detail: {
      intro:
        "유현건설 현장 실무로 계측 데이터 수집 시스템을 다뤄본 경험을 바탕으로 한 프로젝트다. 이후 클라이언트 사정으로 프로젝트가 중단된 뒤, 개인적으로 다시 설계했다. 원래는 Next.js·Express 기반이었고, 이번에는 NestJS·Prisma로 새로 구현하면서 기계 인증(HMAC 서명)과 동시 요청 처리를 포트폴리오 수준으로 다듬었다.",
      highlights: [
        "에이전트 전용 API를 API 키와 HMAC-SHA256 서명으로 인증하고, 상수시간 비교로 검증했다.",
        "동일 로그가 중복 적재되지 않도록 멱등키를 조건부 삽입하는 단일 CTE 쿼리로 처리하고, 동시 20건 요청에서도 정확히 1건만 적재되는 것을 Testcontainers로 확인했다.",
        "기계용 HMAC 인증과 사람용 JWT 인증을 한 서버 안에서 분리된 가드로 나눴다.",
        "실제 서명 로직을 재사용하는 시뮬레이션 스크립트로, 파이프라인을 그대로 통과하는 데모 데이터를 만들었다.",
        "현장별 집계에서 N+1을 제거하고 복합 인덱스와 커서 페이지네이션을 적용했다.",
        "서명 범위가 페이로드 전체를 덮지 않는 등 남은 한계도 파악하고 있고, 다음 개선 후보로 남겨뒀다.",
      ],
    },
    troubleshooting:
      "네트워크가 끊겼다 복구된 현장 에이전트가 같은 데이터를 재전송해도 중복 적재되면 안 됐다. 애플리케이션 레벨 check-then-act는 동시 요청에서 경쟁 상태가 생길 수 있어, Postgres 단일 CTE(INSERT...ON CONFLICT DO NOTHING + 조건부 본삽입)로 원자성을 보장했고, Testcontainers로 동시 20개 요청을 보내 정확히 1건만 적재되는 것까지 검증했다.",
    liveUrl: "https://yuhyeon.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/yuhyeon",
    apiHealthUrl: "https://yuhyeon.onrender.com/api/health",
  },
  {
    slug: "yuhyeon-app",
    title: "유현건설 어플 (Flutter)",
    description:
      "유현건설 계측 플랫폼의 핵심 모니터링 기능을 모바일 환경에서 조회할 수 있도록 이식한 앱. 웹과 동일한 데이터 구조를 기준으로 현장 조회, 센서 상태 확인 등을 지원한다.",
    types: ["인증/보안"],
    stack: [
      "Flutter",
      "Riverpod",
      "go_router",
      "Dio",
      "flutter_secure_storage",
    ],
    status: "completed",
    detail: {
      intro:
        "현장 담당자가 데스크톱 환경이 아니어도 센서 상태·알람·대시보드 지표를 확인할 수 있도록 만든 모바일 앱이다. 웹과 동일한 API 계약을 유지해 기능 동등성을 확보했다.",
      highlights: [
        "로그인·로그아웃·세션복원 흐름을 AuthController에서 일원화하고, 세션 복원 시 /api/auth/me로 토큰 유효성을 서버 기준으로 재확인했다.",
        "JWT 토큰을 flutter_secure_storage에 저장하고, Dio interceptor로 Authorization 헤더를 자동 부착했다.",
        "권한(canManage) 기준으로 읽기 전용/관리 가능 UI를 분리했다.",
        "depth_criteria·correction_params·formula_params를 구조화해 depth별 데이터를 안정적으로 처리했다.",
        "목업 모드와 실 API 구조를 분리해 시연 단계에서 실연동 단계로 자연스럽게 전환되도록 설계했다.",
        "GitHub Releases로 테스트 APK를 패키징하고 QR 코드로 설치 링크를 배포해 현장 테스트 전달 과정을 단순화했다.",
      ],
    },
    liveUrl: "https://github.com/jakesoneyo/yuhyeonApp/releases",
    primaryLinkLabel: "APK 설치 페이지",
    repoUrl: "https://github.com/jakesoneyo/yuhyeonApp",
  },
  {
    slug: "strongsalon",
    title: "스트롱쌀롱 — PT샵 회원 체력평가 시스템",
    description:
      "1:1 PT샵의 회원 체력평가·등급 산정과 트레이너 일정 알림을 다루는 관리 시스템. 카카오 OAuth와 JWT 인증, 6개 영역 가중치 채점·1RM 계산 등 도메인 로직을 구현했다.",
    types: ["인증/보안"],
    stack: ["NestJS", "TypeORM", "JWT", "Kakao OAuth", "React", "Recharts"],
    status: "completed",
    detail: {
      intro:
        "제가 기획한 목업이 업체에 채택되어 실제 의뢰로 이어진 프로젝트다. 초기에는 백엔드를 전담하고 이후 프론트까지 맡아 진행했지만, 매장 운영 사정으로 도입이 중단됐다. 이후 개인적으로 죽어있던 DB를 다시 세우고 테스트를 0개에서 77개로 늘렸으며, Dockerfile과 CI를 새로 구성하고 코드 리뷰 중 발견한 보안 결함도 정리해 포트폴리오 수준으로 재정비했다.",
      highlights: [
        "카카오 OAuth와 JWT를 함께 연동해 소셜 로그인과 세션 관리를 통합했다.",
        "1RM 계산과 6개 영역 가중치 채점 등 체력평가 도메인 계산 로직을 구현했다.",
        "임계값 기준으로 회원 상태(정체·급변)를 판정하는 로직을 설계했다.",
        "일정 이벤트에 따른 실시간 알림을 WebSocket으로 트레이너에게 전달했다.",
        "TypeORM 커스텀 스키마와 search_path 설정 문제를 해결해 Neon Postgres 연결을 안정화했다.",
        "역할(회원·트레이너·관리자)별로 접근 범위를 나눠 권한을 분리했다.",
      ],
    },
    troubleshooting:
      "코드 리뷰 중, 인증 없이 호출해도 관리자 계정을 생성할 수 있는 `create-test-account` 백도어 엔드포인트를 발견했다. 즉시 제거하고, 이메일 형식 검증을 우회하던 커스텀 데코레이터도 표준 `@IsEmail` 검증으로 되돌려 실제 보안 결함을 없앴다.",
    liveUrl: "https://new-gym-front.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/newGym",
    apiHealthUrl: "https://newgym-1qof.onrender.com/health",
  },
];
