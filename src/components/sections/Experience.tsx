import { SectionHead } from "./SectionHead";

/**
 * 실무 경험 섹션 — 보안서약이 걸린 프리랜서 작업이라 서비스명·업종·화면·코드는 일부러 싣지 않고
 * "어떤 종류의 일을 했는지"만 보여준다. 항목이 하나뿐이라 데이터 파일 없이 여기서 바로 정의한다.
 */
const EXPERIENCE = {
  title: "초기 스타트업 웹서비스 개발",
  role: "프리랜서 · 1인 풀스택",
  period: "2026.09 – 2026.11",
  notice:
    "보안서약으로 서비스명·화면·코드는 비공개입니다. 면접에서 범위 내로 설명드릴 수 있습니다.",
  metrics:
    "실결제 운영 서비스 · 카드사 심사 통과 · 기획부터 배포·운영까지 1인 담당",
  scope:
    "요구사항 정리부터 DB·API 설계, 프론트 화면, AWS 인프라 구축, 결제 연동과 PG·카드사 심사 대응, 운영 배포까지 개발 전 과정을 혼자 맡았습니다. 1차 범위를 일정 내 납품하고, 심사 통과 후 운영 도메인으로 전환해 현장 시범 운영과 2차 개발(재고·정산·직원 권한)을 이어갔습니다.",
  groups: [
    {
      label: "결제·정산",
      items: [
        "PG 결제위젯 연동, 카드사 심사 통과 후 라이브 결제·취소·현금영수증 재발급까지 실거래 검증",
        "승인 금액 서버 대조, 결제 상태를 조건부 UPDATE(대기 → 승인 중)로 한 번만 통과시켜 중복 승인 차단, 웹훅은 PG에 재조회한 뒤 반영",
        "승인·취소 경합, 가격 변경 후 옛 가격 결제, 관리자 동시 환불 레이스를 찾아 수정하고 통합테스트로 재현해 고정",
        "재고 차감은 상품 ID 순서로 잠가 교착을 막고, 실제로 줄인 수량만 기록해 결제 실패 시 그만큼만 복원",
        "판매자 정산은 금액 비교가 아니라 미지급 건 목록 대조로 완료 처리해 이중·누락 정산 차단",
      ],
    },
    {
      label: "인증·권한",
      items: [
        "카카오 로그인 + JWT, 리프레시 토큰 회전·재사용 탐지(토큰은 SHA-256 해시로만 저장)",
        "역할별 권한, 판매자 관리자 승인, 사업자번호 검증(체크섬 + 국세청 상태조회)",
        "직원 권한은 해제 즉시 끊기도록 직원 토큰만 매 요청 DB 재확인, 초대 링크는 1회용",
      ],
    },
    {
      label: "인프라·배포·비용",
      items: [
        "AWS EC2(Arm)·RDS·Route 53·S3를 NAT·로드밸런서 없는 최소 구성으로 직접 설계·구축, 신규 서비스 월 $40 이하 운영",
        "GitHub Actions + OIDC 임시 권한 + SSM으로 SSH 포트 없는 무키 배포, CI → 배포 → 헬스체크 자동 연결",
        "방치된 기존 리소스를 정리해 유휴 비용 월 $70 → $7 (약 90%↓), 삭제 대상에 섞인 운영 중 배포 IP를 실행 전에 발견해 제외",
        "카드사 심사 중 사이트 변경 금지 → DB 계정·시크릿을 분리한 개발 환경을 따로 운영하며 개발을 계속하고, 심사 후 운영 도메인 전환",
      ],
    },
    {
      label: "리뷰와 검증",
      items: [
        "결제·정산·권한 변경은 배포 전 리뷰, 지적된 결함은 실패하는 테스트로 먼저 재현한 뒤 수정(재고 초과 판매 경합 등 3건)",
        "\"중복 키 오류로 500\"으로 진단된 버그를 동시 12건 재현 테스트로 돌려 실제 원인(교착)을 찾고, 같은 순서로 미리 잠가 204·409만 나오게 수정",
        "AI 도구가 제안한 멈춘 결제 자동 복구 로직이 운영 키로는 조회 API가 거부돼 동작하지 않는 것을 PG 테스트 환경 실호출로 발견해 재설계",
        "리뷰 없이 배포됐던 권한 기능을 사후 점검해 2건 수정, \"위험 영역은 배포 전 리뷰 필수\"를 작업 규칙으로 정함",
      ],
    },
    {
      label: "품질·테스트",
      items: [
        "Testcontainers 실DB 통합테스트(백엔드 450여 건)로 결제·인증 경로 고정, CI에서 타입체크·린트·테스트",
        "버그는 실패하는 테스트를 먼저 확인한 뒤 수정, 현장 테스트 직전엔 큰 리팩터 대신 버그 수정만 따로 반영",
      ],
    },
    {
      label: "판단·협업",
      items: [
        "정산 구조의 PG 등록 의무(전자금융거래법) 이슈를 개발 착수 전에 발견해 PG 지급대행 전제로 설계 방향 전환",
        "비개발자 대표와 요구사항을 \"구조를 바꾸는 결정\"과 \"나중에 바꿔도 되는 설정값\"으로 나눠 정리(회의록·보고서 40여 건)",
        "Figma API로 시안 수치를 대조해 화면 이식, 대표 QA용 관리자 역할 전환 미리보기",
      ],
    },
  ],
  troubleshooting: [
    "결제 클릭 후 서버 왕복 2회가 브라우저의 사용자 클릭 인정 시간을 넘겨 카드사 팝업이 차단됨 → 주문을 미리 생성해 클릭 즉시 결제창을 열도록 수정",
    "첫 배포에서 /health 503 → RDS가 평문 접속을 거부하는데 앱 DB 연결만 평문이었음 → CA 번들 검증 TLS 접속으로 바꾸고, SSL 전용 로컬 DB로 재현해 확인",
    "여러 탭이 동시에 토큰을 갱신하면 탈취로 오판해 전체 로그아웃됨 → Web Locks로 탭 간 갱신을 직렬화하고, 응답을 못 받은 화면용 1분 유예 추가",
    "만료 토큰을 가진 회원이 비회원으로 처리돼 일반가로 주문됨 → 선택 인증 가드가 만료 토큰을 조용히 무시한 것이 원인, 401 + 자동 재발급으로 관련 API 8개를 한 번에 수정",
    "DB 시각이 9시간 어긋남 → ORM 어댑터가 시간대 없는 UTC 문자열을 보내는데 DB 세션이 KST였음 → 앱 연결 시간대를 UTC로 고정하고 DB now() 비교 통합테스트 추가",
    "PG 부가 API가 \"상점 없음\"으로 실패 → 결제위젯 키와 API 개별 연동 키를 구분하지 않은 것이 원인 → 키를 분리하고, 접두어 점검으로 라이브·테스트 키가 섞인 설정을 배포 전에 발견",
  ],
  stack: [
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "React 19",
    "TypeScript",
    "AWS",
    "Docker",
    "GitHub Actions",
    "Testcontainers",
  ],
};

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-line py-16 print:hidden sm:py-20"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead
          path="~/experience"
          heading="실무 경험"
          headingId="experience-heading"
        />

        <article className="flex flex-col gap-4 break-keep rounded-lg border border-line bg-surface p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="m-0 font-sans text-base font-semibold text-ink">
              {EXPERIENCE.title}
              <span className="ml-2 inline-block text-sm font-normal whitespace-nowrap text-ink-soft">
                {EXPERIENCE.role}
              </span>
            </h3>
            <span className="text-[0.8rem] text-muted">
              {EXPERIENCE.period}
            </span>
          </div>

          <p className="m-0 rounded border border-line bg-surface-2 px-3 py-2 font-sans text-[0.8rem] text-ink-soft">
            <span className="mr-1.5 font-mono text-[0.68rem] tracking-wide text-accent">
              NDA
            </span>
            {EXPERIENCE.notice}
          </p>

          <p className="m-0 text-[0.8rem] text-accent">{EXPERIENCE.metrics}</p>

          <p className="m-0 font-sans text-sm text-ink-soft">
            {EXPERIENCE.scope}
          </p>

          {/* 그룹마다 길이가 달라 grid 행 정렬이면 빈칸이 생김 → 다단(columns)으로 높이를 맞춘다 */}
          <div className="gap-x-8 md:columns-2">
            {EXPERIENCE.groups.map((group) => (
              <div key={group.label} className="mb-5 min-w-0 break-inside-avoid">
                <h4 className="m-0 mb-1.5 text-[0.78rem] font-medium tracking-wide text-accent">
                  {group.label}
                </h4>
                <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 font-sans text-sm text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {EXPERIENCE.troubleshooting.map((item, index) => (
              <div
                key={item}
                className="rounded border border-line bg-surface-2 px-3 py-2.5"
              >
                <span className="block font-mono text-[0.68rem] tracking-wide text-accent">
                  &gt; troubleshoot {index + 1}
                </span>
                <p className="m-0 mt-1 font-sans text-[0.8rem] leading-relaxed text-ink-soft">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {EXPERIENCE.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line px-2 py-0.5 text-[0.72rem] text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
