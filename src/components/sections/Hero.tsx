import { profile } from '../../data/profile';

/**
 * 최상단 히어로 — 상태 라인 + 헤드라인 + CTA 2개 + 데이터 파이프라인 다이어그램.
 * intro 문단은 About 섹션이 담당하고, 여기서는 tagline만 짧게 노출한다.
 */
export function Hero() {
  return (
    <section id="top" className="border-b border-line pt-12 sm:pt-16" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-6 flex items-center gap-2 text-[0.82rem] text-ink-soft">
          <span className="status-dot inline-block h-[7px] w-[7px] rounded-full bg-ok" aria-hidden="true" />
          AVAILABLE · 신입 풀스택 개발자
        </div>

        <h1
          id="hero-heading"
          className="mb-5 text-balance text-[clamp(1.9rem,4.4vw,3rem)] leading-tight tracking-tight text-ink"
        >
          데이터가 들어오는 순간부터
          <br />
          화면에 닿기까지, <span className="text-accent">전 구간</span>을 봅니다
        </h1>

        <p className="mb-8 max-w-[58ch] font-sans text-[clamp(0.95rem,1.2vw,1.05rem)] text-ink-soft">
          {profile.tagline}
        </p>

        <div className="mb-12 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg no-underline transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            프로젝트 보기
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm text-ink no-underline transition-colors hover:border-accent hover:text-accent"
          >
            연락하기
          </a>
        </div>

        <PipelineDiagram />
      </div>
    </section>
  );
}

/** Hero 하단의 장식용 데이터 파이프라인 다이어그램: agent → ingest api → postgres */
function PipelineDiagram() {
  return (
    <div className="mb-12 overflow-x-auto pb-2" aria-hidden="true">
      <svg viewBox="0 0 640 90" width="100%" height="90" className="min-w-[640px]" role="presentation">
        <text x="0" y="14" className="fill-muted font-mono text-[10px]">
          DATA PIPELINE
        </text>

        <path d="M90,50 H180" stroke="var(--color-line)" strokeWidth="1.4" fill="none" />
        <path d="M270,50 H400" stroke="var(--color-line)" strokeWidth="1.4" fill="none" />

        <rect x="10" y="34" width="80" height="32" rx="4" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.4" />
        <rect x="180" y="34" width="90" height="32" rx="4" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.4" />
        <rect x="400" y="34" width="90" height="32" rx="4" fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1.4" />

        <text x="26" y="55" className="fill-ink-soft font-mono text-[11px]">agent</text>
        <text x="194" y="55" className="fill-ink-soft font-mono text-[11px]">ingest api</text>
        <text x="415" y="55" className="fill-ink-soft font-mono text-[11px]">postgres</text>

        <circle className="flow-dot" cx="135" cy="50" r="2.6" fill="var(--color-accent)" style={{ animationDelay: '0s' }} />
        <circle className="flow-dot" cx="335" cy="50" r="2.6" fill="var(--color-accent)" style={{ animationDelay: '0.8s' }} />
      </svg>
    </div>
  );
}
