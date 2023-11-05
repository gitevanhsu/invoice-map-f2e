// number.test.tsx
import { sum } from "./number";

describe("sum function", () => {
  test("1 + 2", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("10 + 15", () => {
    expect(sum(10, 15)).toBe(25);
  });
});
