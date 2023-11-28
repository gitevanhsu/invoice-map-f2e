import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabButtonRow from ".";

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

describe("TabButtonRow component", () => {
  test("test1", () => {
    render(<TabButtonRow {...mockOne} />);
    expect(screen.getByTestId("1-1")).toHaveClass("bg-primary-bgMain");
    expect(screen.getByTestId("1-2")).not.toHaveClass("bg-primary-bgMain");
  });
  test("test2", () => {
    render(<TabButtonRow {...mockTwo} />);
    expect(screen.getByTestId("2-1")).not.toHaveClass("bg-primary-bgMain");
    expect(screen.getByTestId("2-2")).toHaveClass("bg-primary-bgMain");
  });
});
