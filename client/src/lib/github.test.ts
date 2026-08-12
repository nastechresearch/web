import { describe, expect, it } from "vitest";
import { formatCount, formatRelativeDate } from "./github";

describe("GitHub display helpers", () => {
  it("formats repository counters for compact dashboards", () => {
    expect(formatCount(9)).toBe("9");
    expect(formatCount(1250)).toMatch(/1\.3K|1\.2K/);
  });

  it("renders current dates as a readable live-status label", () => {
    expect(formatRelativeDate(new Date().toISOString())).toBe("today");
  });
});
