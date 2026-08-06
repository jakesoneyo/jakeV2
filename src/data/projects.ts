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
    slug: "match-mate",
    title: "MATCH MATE — 풋살팀 매니저 (한발더FC)",
    description:
      "실제로 활동 중인 조기축구팀(한발더FC)이 구글시트로 관리하던 출결·회비·팀 밸런싱을 그대로 옮긴 매니저 앱. 전력 기반 자동 팀 분할, 재계산 가능한 대진표, 익명 MOM 투표 등 도메인 로직을 NestJS 백엔드에 웹(React)·모바일(Expo) 클라이언트로 함께 구현했다.",
    types: ["실시간", "데이터/알고리즘"],
    stack: [
      "NestJS",
      "Prisma",
      "Neon Postgres",
      "Socket.io",
      "React",
      "Vite",
      "Expo (React Native)",
    ],
    status: "completed",
    detail: {
      intro:
        "실제로 뛰고 있는 조기축구팀의 총무가 매주 구글시트로 하던 일 — 출석 체크, 회비 장부, 그날그날 인원 맞춰 팀 나누기 — 을 앱 하나로 옮긴 프로젝트다. 매치 등록부터 참석 투표, 팀 자동 분할, 대진·결과 기록, MOM 투표, 회비 정산까지 한 팀의 시즌 운영 전체를 다룬다. 백엔드 하나에 웹과 Expo 모바일 앱이 동일한 API 계약을 공유하는 모노레포로 구성했고, 실제 팀 데이터를 기준으로 데모 로그인 계정을 채워 뒀다.",
      highlights: [
        "전력 점수 계산에 축소추정(shrinkage)을 적용해, 표본이 적은 신규 회원의 승률·출석률이 과대평가되지 않게 했다(1승 0패가 100%가 아니라 62.5%로 계산되는 식).",
        "스네이크 드래프트로 팀 인원 차 1명 이하를 구조적으로 보장한 뒤, hill-climbing 국소탐색으로 팀 간 전력 표준편차를 최소화하는 자동 팀 분할 알고리즘을 만들었다.",
        "대진표를 DB에 저장하지 않고 결과 로그로부터 매번 재계산(projection)하는 방식으로 설계해, 점수 정정 시 이후 대진이 특수 케이스 없이 자동으로 다시 계산되게 했다.",
        "MomVote 테이블에 투표자를 특정할 컬럼을 아예 두지 않고 HMAC 해시로만 저장하면서도, DB 유니크 제약으로 1인 1표를 강제해 비식별성과 무결성을 동시에 확보했다.",
        "Google·Kakao OAuth와 JWT 리프레시 토큰 회전을 구현하고, 웹/모바일 클라이언트별 토큰 전달 방식(쿠키 vs 바디)을 하나의 서버에서 분기 처리했다.",
        "팀 분할·대진·MOM 개봉 결과를 Socket.io로 실시간 반영하되, 페이로드에 버전 번호를 실어 늦게 도착한 이벤트를 클라이언트가 스스로 버리게 했다.",
        "회비 장부·출석 현황표를 팀이 실제 쓰던 구글시트 포맷(선수×월, 이름×매치 O/X 표) 그대로 재현하고, 웹과 모바일 양쪽에 동일한 계약으로 이식했다.",
        "Testcontainers로 실제 Postgres를 띄워 팀 간 데이터 격리, 동시 요청 경합, 스케줄러 중복 실행 방지 등을 통합테스트로 검증했다.",
      ],
    },
    troubleshooting: [
      "이미 FINISHED로 종료된 매치의 과거 점수를 정정하면 대진표가 계속 새로 생성되는 버그가 있었다. '몇 경기까지 진행할지는 매치 상태로 결정한다'는 규칙이 대진 재투영 로직에 빠져 있던 게 원인이었고, 매치 상태 가드(SCHEDULED/LIVE일 때만 새 대진을 만듦)를 추가해 해결했다.",
      "마지막 한 표가 HTTP로 들어오는 시점과 스케줄러가 자동으로 투표를 마감하는 시점이 겹치면 MOM 개봉이 두 번 일어날 수 있었다. DB 유니크 제약과 트랜잭션으로 묶어 정확히 1세트만 개봉되고 소켓 emit도 1회만 나가도록 만들고, 두 경로가 실제로 동시에 도착하는 상황을 통합테스트로 재현해 검증했다.",
      "정기 매치 스케줄러가 재배포·재시작 등으로 여러 번 실행돼도 같은 팀·같은 시간에 매치가 중복 생성되면 안 됐다. `@@unique([teamId, kickoffAt])` DB 제약과 앱 레벨 skipDuplicates를 이중으로 걸고, 스케줄러를 두 번 연달아 실행해도 매치 행 수가 늘지 않는 것을 통합테스트로 확인했다.",
    ],
    liveUrl: "https://match-mate-wine.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/match-mate",
    apiHealthUrl: "https://match-mate-api-as81.onrender.com/health",
  },
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
    slug: "study-fine",
    title: "study-fine — 스터디모임 출석 관리 + 벌금 자동 정산",
    description:
      "스터디 회차별 출석(정상/지각/결석)을 체크하면 서버가 그 시점 단가로 벌금을 확정 저장하는 CRUD 앱. Java·Spring Boot로 만든 첫 백엔드로, 최신 Spring Boot 4 / Spring Security 7 스택을 직접 부딪히며 다뤘다.",
    types: ["CRUD"],
    stack: [
      "Spring Boot",
      "Java",
      "Spring Data JPA",
      "Spring Security",
      "Flyway",
      "Neon Postgres",
      "React",
      "Vite",
    ],
    status: "completed",
    detail: {
      intro:
        "스터디 모임 운영자가 회차마다 멤버 출석을 체크하면 지각·결석 단가로 벌금이 자동 계산·확정되는 앱이다. 그동안 NestJS로만 백엔드를 만들어 왔는데, 이번에는 의도적으로 Java·Spring Boot를 골라 처음부터 다뤘다. 마침 릴리스된 지 얼마 안 된 Spring Boot 4 / Spring Security 7이라 마이그레이션 문서가 부족해 직접 부딪히며 트러블슈팅한 게 많았고, JVM 메모리 구조를 이해해야 풀리는 배포 문제까지 실제로 겪었다.",
      highlights: [
        "벌금을 조회 시점에 계산하지 않고 출석 체크 시점의 단가로 즉시 확정 저장해, 이후 단가를 올려도 과거 회차 금액이 소급 변경되지 않도록 설계했다.",
        "누적 벌금·회차별 합계는 GROUP BY 단일 프로젝션 쿼리로, 출석 일괄 저장은 반복문 진입 전 기존 기록을 한 번에 Map으로 조회해 N+1을 구조적으로 차단했다.",
        "본인 리소스 조회는 `/api/me/**`처럼 토큰의 sub만 쓰고 id 파라미터 자체를 받지 않게 설계해, id 비교를 빠뜨려 생기는 수평 권한 상승을 원천 차단했다.",
        "Spring Security 7부터 CSRF가 API 요청에도 기본 적용되는 등 프레임워크 기본값이 바뀐 지점들을 실제로 겪으며 원인을 추적하고 정리했다.",
        "데모 계정도 예외 없이 bcrypt 정상 검증을 통과하게 하고, 인증 우회용 엔드포인트를 아예 두지 않았다.",
      ],
    },
    troubleshooting:
      "Render 무료 티어 512MB 컨테이너에 그대로 배포했더니 클래스 로딩 중 OutOfMemoryError로 죽었다. 메타스페이스(클래스 메타데이터가 쌓이는 영역)를 96MB로 좁게 잡은 게 원인이었는데, 힙과 메타스페이스가 서로 다른 메모리 영역이라는 걸 실측으로 확인하며 힙 256MB·메타스페이스 180MB로 재조정하고 SerialGC로 바꿔, 512MB 컨테이너 안에서 기동부터 반복 API 호출까지 396MB 선에서 안정적으로 버티는 걸 직접 확인한 뒤에야 라이브로 띄울 수 있었다.",
    liveUrl: "https://study-fine.vercel.app",
    repoUrl: "https://github.com/jakesoneyo/study-fine",
    apiHealthUrl: "https://study-fine-api.onrender.com/health",
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
        "로그인·로그아웃·세션 복원 흐름을 AuthController에서 일원화하고, 세션 복원 시 /api/auth/me로 토큰 유효성을 서버 기준으로 재확인했다.",
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
