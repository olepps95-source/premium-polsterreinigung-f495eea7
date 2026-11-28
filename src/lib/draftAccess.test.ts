import { describe, it, expect } from "vitest";
import { isDraftHost } from "./draftAccess";

describe("isDraftHost", () => {
  it("allows Lovable preview hosts", () => {
    expect(isDraftHost("id-preview--ce463d19-74b6-489d-a781-4be08845e5a1.lovable.app")).toBe(true);
    expect(isDraftHost("ce463d19-74b6-489d-a781-4be08845e5a1.lovableproject.com")).toBe(true);
    expect(isDraftHost("localhost")).toBe(true);
  });
  it("blocks production hosts", () => {
    expect(isDraftHost("reinwerk-service.de")).toBe(false);
    expect(isDraftHost("www.reinwerk-service.de")).toBe(false);
    expect(isDraftHost("polster-frische-glanz.lovable.app")).toBe(false);
    expect(isDraftHost("reinwerk.vercel.app")).toBe(false);
  });
});
