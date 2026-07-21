import { profile } from '../../data/profile';

/** 저작권 표기 + GitHub 링크만 담는 최소 푸터 */
export function Footer() {
  return (
    <footer className="py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted no-underline hover:text-accent"
        >
          {profile.github.replace('https://', '')}
        </a>
      </div>
    </footer>
  );
}
