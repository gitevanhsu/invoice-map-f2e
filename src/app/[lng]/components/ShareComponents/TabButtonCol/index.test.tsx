import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabButtonCol from ".";

const mockOne = {
  currentTab: "1",
  tabs: [
    { value: "1-1", id: "1" },
    { value: "1-2", id: "2" },
  ],
  onClick: () => {},
};
const mockTwo = {
  currentTab: "2",
  tabs: [
    { value: "2-1", id: "1" },
    { value: "2-2", id: "2" },
  ],
  onClick: () => {},
};

describe("TabButtonCol component", () => {
  test("test1", () => {
    render(<TabButtonCol {...mockOne} />);
    expect(screen.getByTestId("1-1")).toHaveClass("bg-primary-red");
    expect(screen.getByTestId("1-2")).not.toHaveClass("bg-primary-red");
  });
  test("test2", () => {
    render(<TabButtonCol {...mockTwo} />);
    expect(screen.getByTestId("2-1")).not.toHaveClass("bg-primary-red");
    expect(screen.getByTestId("2-2")).toHaveClass("bg-primary-red");
  });
});
