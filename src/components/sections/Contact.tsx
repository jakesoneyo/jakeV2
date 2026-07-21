import { profile } from '../../data/profile';
import { SectionHead } from './SectionHead';

/** 이메일(mailto)·GitHub 링크 카드만 제공 — 전화번호는 의도적으로 노출하지 않음(SPEC 3장) */
export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead path="~/contact" heading="연락처" headingId="contact-heading" />

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex flex-1 basis-56 items-center gap-3.5 rounded-lg border border-line bg-surface px-5 py-4 text-ink no-underline transition-colors hover:border-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[18px] w-[18px] shrink-0 text-accent"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span>
              <span className="block text-[0.7rem] text-muted">email</span>
              <span className="text-[0.88rem]">{profile.email}</span>
            </span>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 basis-56 items-center gap-3.5 rounded-lg border border-line bg-surface px-5 py-4 text-ink no-underline transition-colors hover:border-accent"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-accent">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>
              <span className="block text-[0.7rem] text-muted">github</span>
              <span className="text-[0.88rem]">{profile.github.replace('https://', '')}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
