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
  highlights: [
    "결제: PG 결제위젯 연동, 카드사 심사 통과 후 라이브 결제·취소 검증. 승인 금액 서버 대조, 조건부 UPDATE로 중복 승인 차단, 웹훅은 PG에 재조회한 뒤 반영",
    "결제 정합성: 승인·취소 경합, 가격이 바뀐 뒤 옛 가격으로 결제, 동시 이중 환불 레이스를 찾아 수정하고 통합테스트로 재현해 고정",
    "인증: 카카오 로그인 + JWT, 리프레시 토큰 회전·재사용 탐지(해시 저장), 역할별 권한·관리자 승인",
    "인프라: AWS(EC2·RDS·Route 53·S3) NAT 없는 최소 구성 직접 구축, GitHub Actions + OIDC·SSM 무키 배포, 신규 서비스 월 $40 이하 운영",
    "방치된 기존 리소스를 정리해 유휴 비용 월 $70 → $7 (약 90%↓)",
    "정산 구조의 PG 등록 의무(전자금융거래법) 이슈를 개발 착수 전에 발견해 PG 지급대행 전제로 설계 방향 전환",
    "카드사 심사 중 사이트 변경 금지 → 같은 인프라에 DB 계정·시크릿을 분리한 개발 환경을 따로 운영하며 개발을 계속하고, 심사 후 운영 도메인으로 전환",
    "비개발자 대표와 요구사항을 구조적 결정/설정값으로 나눠 정리(회의록·보고서 40여 건), 일정 내 1차 납품",
  ],
  troubleshooting: [
    "결제 클릭 후 서버 왕복 2회가 브라우저의 사용자 클릭 인정 시간을 넘겨 카드사 팝업이 차단됨 → 주문을 미리 생성해 클릭 즉시 결제창을 열도록 수정",
    "첫 배포에서 /health 503 → RDS가 평문 접속을 거부하는데 앱 DB 연결만 평문이었음 → CA 번들 검증 TLS 접속으로 바꾸고, SSL 전용 로컬 DB로 재현해 확인",
    "여러 탭이 동시에 토큰을 갱신하면 탈취로 오판해 전체 로그아웃됨 → Web Locks로 탭 간 갱신을 직렬화하고, 응답을 못 받은 화면용 1분 유예 추가",
  ],
  stack: [
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "React 19",
    "TypeScript",
    "AWS",
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

          <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 font-sans text-sm text-ink-soft">
            {EXPERIENCE.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

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
