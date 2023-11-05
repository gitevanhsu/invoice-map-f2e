import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";
const twProps = { params: { lng: "tw" } };
const enProps = { params: { lng: "en" } };
const jpProps = { params: { lng: "jp" } };

describe("i18n function", () => {
  test("tw", async () => {
    const Result = await Page(twProps);
    render(Result);
    expect(screen.getByRole("heading")).toHaveTextContent("你好!");
  });
  test("en", async () => {
    const Result = await Page(enProps);
    render(Result);
    expect(screen.getByRole("heading")).toHaveTextContent("Hi there!");
  });
  test("jp", async () => {
    const Result = await Page(jpProps);
    render(Result);
    expect(screen.getByRole("heading")).toHaveTextContent("こんにちは!");
  });
});
