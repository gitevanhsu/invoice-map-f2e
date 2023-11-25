// number.test.tsx
import {
  sum,
  formatToPercentage,
  findHighestCandidate,
  numberFormatter,
} from "./number";

describe("sum function", () => {
  test("1 + 2", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("10 + 15", () => {
    expect(sum(10, 15)).toBe(25);
  });
});

// format number with comma
describe("number formatter", () => {
  test("1234", () => {
    expect(numberFormatter(1234)).toBe("1,234");
  });
  test("123", () => {
    expect(numberFormatter(123)).toBe("123");
  });
  test("6734567", () => {
    expect(numberFormatter(6734567)).toBe("6,734,567");
  });
});

// format number to percentage string
describe("formatToPercentage", () => {
  it("should format number to percentage with two decimal places", () => {
    expect(formatToPercentage(0.12345)).toBe("12.35%");
    expect(formatToPercentage(0.5)).toBe("50.00%");
    expect(formatToPercentage(0.999)).toBe("99.90%");
  });

  it("should throw an error for numbers outside the range [0, 1]", () => {
    expect(() => formatToPercentage(-0.1)).toThrowError();
    expect(() => formatToPercentage(1.1)).toThrowError();
  });
});

// fund highest candidate with share and total
describe("findHighestCandidate", () => {
  it("should find the candidate with the highest votes and calculate share and total correctly", () => {
    const candidates = [
      { id: "1", president: "A", vicePresident: "B", party: "X", votes: 100 },
      { id: "2", president: "C", vicePresident: "D", party: "Y", votes: 200 },
      { id: "3", president: "E", vicePresident: "F", party: "Z", votes: 150 },
    ];

    const result = findHighestCandidate(...candidates);

    expect(result.id).toBe("2"); // Candidate 2 has the highest votes
    expect(result.share).toBe("44.44%"); // 200 / (100 + 200 + 150) * 100 ≈ 44.44%
    expect(result.total).toBe(450); // 100 + 200 + 150 = 450
  });

  it("should handle cases where there is only one candidate", () => {
    const candidate = {
      id: "1",
      president: "A",
      vicePresident: "B",
      party: "X",
      votes: 100,
    };
    const result = findHighestCandidate(candidate);

    expect(result.id).toBe("1"); // Only one candidate, so it should be the highest
    expect(result.share).toBe("100.00%"); // 100 / 100 = 100%
    expect(result.total).toBe(100); // Total votes is the same as the only candidate's votes
  });

  it("should handle cases where all candidates have zero votes", () => {
    const candidates = [
      { id: "1", president: "A", vicePresident: "B", party: "X", votes: 0 },
      { id: "2", president: "C", vicePresident: "D", party: "Y", votes: 0 },
      { id: "3", president: "E", vicePresident: "F", party: "Z", votes: 0 },
    ];

    const result = findHighestCandidate(...candidates);

    expect(result.id).toBe("1"); // All candidates have zero votes, so it should return the first one
    expect(result.share).toBe("0"); // Share is zero since all votes are zero
    expect(result.total).toBe(0); // Total votes is zero
  });
});
