import { skills } from '../../data/skills';
import { SectionHead } from './SectionHead';

/** Backend가 실제 주력 분야 — 시각적으로 강조(★, 앰버 보더)해 면접관에게 우선순위를 전달 */
const EMPHASIZED_LABEL = 'Backend';

/** skills.ts 데이터를 카테고리별 라벨 + 태그 pill로 렌더링 (컴포넌트는 항목 수에 자동 대응) */
export function Skills() {
  return (
    <section id="skills" className="border-b border-line py-16 sm:py-20" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead path="~/skills" heading="핵심역량" headingId="skills-heading" />

        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-[140px_1fr]">
          {skills.map((category) => {
            const emphasized = category.label === EMPHASIZED_LABEL;
            return (
              <div key={category.label} className="contents">
                <dt
                  className={`text-[0.82rem] sm:pt-1 ${emphasized ? 'text-accent' : 'text-muted'}`}
                >
                  {category.label.toLowerCase()}
                  {emphasized && ' ★'}
                </dt>
                <dd className="m-0 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded border px-2.5 py-1 text-[0.8rem] ${
                        emphasized
                          ? 'border-accent/40 text-ink'
                          : 'border-line text-ink-soft'
                      } bg-surface`}
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
