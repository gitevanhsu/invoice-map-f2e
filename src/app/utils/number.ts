import { CandidateType } from "../types";

// number.ts
export function sum(a: number, b: number): number {
  return a + b;
}

// input number return formatted string, e.g. 12345 => 12,345
export function numberFormatter(num: number): string {
  return num.toLocaleString();
}

// format number with percentage
export const formatToPercentage = (number: number): string => {
  if (number >= 0 && number <= 1) {
    const percentage = (number * 100).toFixed(2);
    return `${percentage}%`;
  } else {
    throw new Error("Input number should be between 0 and 1 inclusive.");
  }
};

// find highest votes candidate and relative data
type FindHighestCandidate = (
  ...rest: Array<CandidateType>
) => CandidateType & { share: string; total: number };

export const findHighestCandidate: FindHighestCandidate = (...rest) => {
  const result = rest.sort((a, b) => b.votes - a.votes)[0];
  const total = rest.reduce((acc, candidate) => acc + candidate.votes, 0);
  const share = Number.isNaN((result.votes / total) * 100)
    ? "0"
    : formatToPercentage(result.votes / total);
  return { ...result, total, share };
};
