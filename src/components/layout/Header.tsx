/** 상단 고정 네비게이션 — 섹션 인덱스(01~04) 스타일 앵커 링크. Console 디자인 시안의 콘솔 무드 핵심 요소. */
const NAV_ITEMS = [
  { index: '01', label: '소개', href: '#about' },
  { index: '02', label: '핵심역량', href: '#skills' },
  { index: '03', label: '프로젝트', href: '#projects' },
  { index: '04', label: '연락처', href: '#contact' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5 text-sm sm:px-8">
        <a href="#top" className="shrink-0 text-ink no-underline">
          son<span className="text-accent">young</span>sun
        </a>
        <nav aria-label="주요 섹션" className="flex min-w-0 gap-3 text-ink-soft sm:gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap no-underline transition-colors hover:text-accent focus-visible:text-accent"
            >
              <span className="mr-1 text-muted">{item.index}</span>
              {/* 모바일(< sm)에서는 한 줄 유지를 위해 라벨을 시각적으로 숨기고 번호만 노출.
                  sr-only 처리로 스크린리더에는 항상 전체 텍스트("01 소개")가 읽힌다. */}
              <span className="sr-only sm:not-sr-only">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
