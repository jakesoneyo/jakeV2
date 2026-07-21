import { profile } from '../../data/profile';
import { SectionHead } from './SectionHead';

/** 소개 섹션 — profile.intro 문단을 가독성 위해 산세리프(Pretendard)로 표시 */
export function About() {
  return (
    <section id="about" className="border-b border-line py-16 sm:py-20" aria-labelledby="about-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead path="~/about" heading="소개" headingId="about-heading" />
        <p className="max-w-[62ch] font-sans text-base text-ink-soft">{profile.intro}</p>
      </div>
    </section>
  );
}
