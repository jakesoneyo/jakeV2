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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 text-sm sm:px-8">
        <a href="#top" className="text-ink no-underline">
          son<span className="text-accent">young</span>sun
        </a>
        <nav aria-label="주요 섹션" className="flex gap-4 text-ink-soft sm:gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap no-underline transition-colors hover:text-accent focus-visible:text-accent"
            >
              <span className="mr-1 text-muted">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
