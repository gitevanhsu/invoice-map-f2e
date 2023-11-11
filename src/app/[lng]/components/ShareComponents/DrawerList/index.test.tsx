import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import DrawerList from "./";

const mockData = {
  content: [
    {
      id: "1",
      title: <p data-testid="item-1">Item-1</p>,
      subList: [
        {
          id: "1-1",
          title: <p data-testid="item-1-1">Item-1-1</p>,
        },
        {
          id: "1-2",
          title: <p data-testid="item-1-2">Item-1-2</p>,
          subList: [
            {
              id: "1-2-1",
              title: <p data-testid="item-1-2-1">Item-1-2-1</p>,
            },
            {
              id: "1-2-2",
              title: <p data-testid="item-1-2-2">Item-1-2-2</p>,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: <p data-testid="item-2">Item-2</p>,
    },
    {
      id: "3",
      title: <p data-testid="item-3">Item-3</p>,
    },
  ],
  onClose: () => {},
};

describe("drawer list", () => {
  test("list1", () => {
    render(<DrawerList {...mockData} />);
    expect(screen.getByTestId("item-1")).toBeVisible();
    expect(screen.getByTestId("item-2")).toBeVisible();
    expect(screen.getByTestId("item-3")).toBeVisible();
    expect(screen.queryByTestId("item-1-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("item-1-2-1")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("item-1"));
    expect(screen.getByTestId("item-1-2")).toBeVisible();

    fireEvent.click(screen.getByTestId("item-1-2"));
    expect(screen.getByTestId("item-1-2-1")).toBeVisible();
  });
});
