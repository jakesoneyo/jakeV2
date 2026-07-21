/** 콘솔 경로 라벨(`~/skills` 등) + 섹션 제목을 나란히 두는 공용 헤더. 각 섹션에서 재사용 */
export function SectionHead({
  path,
  heading,
  headingId,
}: {
  path: string;
  heading: string;
  headingId: string;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <span className="text-[0.8rem] text-muted">{path}</span>
      <h2 id={headingId} className="m-0 text-[1.05rem] font-medium text-ink">
        {heading}
      </h2>
    </div>
  );
}
