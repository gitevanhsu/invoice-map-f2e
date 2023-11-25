import { removeSpace } from "./string"; // 替換成實際的文件路徑

describe("removeSpace", () => {
  it("should remove spaces from a string with spaces", () => {
    const stringWithSpaces = "This is a string with spaces.";
    const result = removeSpace(stringWithSpaces);
    expect(result).toBe("Thisisastringwithspaces.");
  });

  it("should handle a string with leading and trailing spaces", () => {
    const stringWithSpaces = "   Trim leading and trailing spaces.   ";
    const result = removeSpace(stringWithSpaces);
    expect(result).toBe("Trimleadingandtrailingspaces.");
  });

  it("should handle a string with multiple spaces between words", () => {
    const stringWithSpaces = "Multiple   spaces    between   words.";
    const result = removeSpace(stringWithSpaces);
    expect(result).toBe("Multiplespacesbetweenwords.");
  });
});
