import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "../../types";

/**
 * ARCHITECTURE.md 핵심 요구사항 검증: projects 데이터가 비면 빈 상태 UI가,
 * 항목이 있으면 카드가 뜬다 — 컴포넌트 코드 변경 없이 데이터만으로 렌더 결과가 바뀌어야 한다.
 */
describe("Projects", () => {
  it("projects 배열이 비어있으면 빈 상태 안내를 렌더한다", async () => {
    vi.resetModules();
    vi.doMock("../../data/projects", () => ({
      projects: [] satisfies Project[],
    }));
    const { Projects } = await import("./Projects");

    render(<Projects />);

    expect(screen.getByText("포트폴리오 프로젝트 준비 중")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("projects 배열에 항목이 있으면 카드가 렌더된다", async () => {
    const sample: Project[] = [
      {
        slug: "sample-project",
        title: "Sample Project",
        description: "테스트용 샘플 프로젝트 설명",
        types: ["CRUD"],
        stack: ["NestJS"],
        status: "completed",
      },
    ];
    vi.resetModules();
    vi.doMock("../../data/projects", () => ({ projects: sample }));
    const { Projects } = await import("./Projects");

    render(<Projects />);

    expect(screen.getByText("Sample Project")).toBeInTheDocument();
    expect(
      screen.queryByText("포트폴리오 프로젝트 준비 중"),
    ).not.toBeInTheDocument();
  });

  it("모달 열기 전엔 troubleshooting/detail 텍스트가 안 보이다가, '자세히 보기' 클릭 후에 보인다", async () => {
    const sample: Project[] = [
      {
        slug: "sample-project",
        title: "Sample Project",
        description: "테스트용 샘플 프로젝트 설명",
        types: ["CRUD"],
        stack: ["NestJS"],
        status: "completed",
        troubleshooting: "동시 요청 경쟁 상태를 CTE로 해결했다.",
        detail: {
          intro: "상세 소개 문단입니다.",
          highlights: ["핵심 구현 내용 1"],
        },
      },
    ];
    vi.resetModules();
    vi.doMock("../../data/projects", () => ({ projects: sample }));
    const { Projects } = await import("./Projects");

    render(<Projects />);

    // <dialog>는 open 속성이 없으면 자식 콘텐츠가 DOM엔 있어도 jest-dom이 "안 보임"으로 판정한다.
    expect(
      screen.getByText("동시 요청 경쟁 상태를 CTE로 해결했다."),
    ).not.toBeVisible();
    expect(screen.getByText("상세 소개 문단입니다.")).not.toBeVisible();

    fireEvent.click(screen.getByText("자세히 보기"));

    expect(
      screen.getByText("동시 요청 경쟁 상태를 CTE로 해결했다."),
    ).toBeVisible();
    expect(screen.getByText("상세 소개 문단입니다.")).toBeVisible();
    expect(screen.getByText("핵심 구현 내용 1")).toBeVisible();
  });

  it("detail 필드가 없으면 '자세히 보기' 버튼과 모달을 렌더하지 않는다", async () => {
    const sample: Project[] = [
      {
        slug: "sample-project",
        title: "Sample Project",
        description: "테스트용 샘플 프로젝트 설명",
        types: ["CRUD"],
        stack: ["NestJS"],
        status: "completed",
        troubleshooting: "동시 요청 경쟁 상태를 CTE로 해결했다.",
      },
    ];
    vi.resetModules();
    vi.doMock("../../data/projects", () => ({ projects: sample }));
    const { Projects } = await import("./Projects");

    render(<Projects />);

    expect(screen.queryByText("자세히 보기")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(document.querySelector("dialog")).not.toBeInTheDocument();
  });
});
