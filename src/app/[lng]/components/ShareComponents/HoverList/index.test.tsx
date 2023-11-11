import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HoverList from "./index";

const mockOne = {
  title: <div data-testid="list-1">List1</div>,
  content: [
    {
      id: "1",
      title: <p data-testid="item-1">Item1</p>,
    },
    {
      id: "2",
      title: <p data-testid="item-2">Item2</p>,
    },
    {
      id: "3",
      title: <p data-testid="item-3">Item3</p>,
    },
  ],
};

const mockTwo = {
  title: <div data-testid="list-2">List2</div>,
  content: [
    {
      id: "4",
      title: <p data-testid="item-4">Item4</p>,
    },
    {
      id: "5",
      title: <p data-testid="item-5">Item5</p>,
    },
    {
      id: "6",
      title: <p data-testid="item-6">Item6</p>,
    },
  ],
};

const mockThree = {
  title: <div data-testid="list-3">List3</div>,
  content: [
    {
      id: "7",
      title: <p data-testid="item-7">Item7</p>,
    },
    {
      id: "8",
      title: <p data-testid="item-8">Item8</p>,
    },
    {
      id: "9",
      title: <p data-testid="item-9">Item9</p>,
    },
  ],
};

describe("hover list", () => {
  test("list1", () => {
    render(<HoverList {...mockOne} />);
    expect(screen.getByRole("list")).toHaveClass("hidden");
    fireEvent.mouseOver(screen.getByTestId("list-1"));
    expect(screen.getByRole("list")).toHaveClass("block");
  });
  test("list2", () => {
    render(<HoverList {...mockTwo} />);
    expect(screen.getByRole("list")).toHaveClass("hidden");
    fireEvent.mouseOver(screen.getByTestId("list-2"));
    expect(screen.getByRole("list")).toHaveClass("block");
  });
  test("list3", () => {
    render(<HoverList {...mockThree} />);
    expect(screen.getByRole("list")).toHaveClass("hidden");
    fireEvent.mouseOver(screen.getByTestId("list-3"));
    expect(screen.getByRole("list")).toHaveClass("block");
  });
});
