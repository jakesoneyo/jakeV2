import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Project } from '../../types';

/**
 * ARCHITECTURE.md 핵심 요구사항 검증: projects 데이터가 비면 빈 상태 UI가,
 * 항목이 있으면 카드가 뜬다 — 컴포넌트 코드 변경 없이 데이터만으로 렌더 결과가 바뀌어야 한다.
 */
describe('Projects', () => {
  it('projects 배열이 비어있으면 빈 상태 안내를 렌더한다', async () => {
    vi.resetModules();
    vi.doMock('../../data/projects', () => ({ projects: [] satisfies Project[] }));
    const { Projects } = await import('./Projects');

    render(<Projects />);

    expect(screen.getByText('포트폴리오 프로젝트 준비 중')).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('projects 배열에 항목이 있으면 카드가 렌더된다', async () => {
    const sample: Project[] = [
      {
        slug: 'sample-project',
        title: 'Sample Project',
        description: '테스트용 샘플 프로젝트 설명',
        types: ['CRUD'],
        stack: ['NestJS'],
        status: 'completed',
      },
    ];
    vi.resetModules();
    vi.doMock('../../data/projects', () => ({ projects: sample }));
    const { Projects } = await import('./Projects');

    render(<Projects />);

    expect(screen.getByText('Sample Project')).toBeInTheDocument();
    expect(screen.queryByText('포트폴리오 프로젝트 준비 중')).not.toBeInTheDocument();
  });
});
