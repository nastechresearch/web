import { describe, expect, it } from "vitest";
import { capabilities, experiencePages, routeSourceMap, subpageNames } from "./nastech";

describe("NasTech public source map", () => {
  it("keeps the verified capabilities and expandable product architecture intact", () => {
    expect(capabilities).toHaveLength(72);
    expect(experiencePages).toHaveLength(229);
    expect(subpageNames.length).toBeGreaterThanOrEqual(38);
    expect(Object.keys(routeSourceMap)).toHaveLength(229);
  });
});
