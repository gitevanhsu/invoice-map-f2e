import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";
const twProps = { params: { lng: "tw" }, searchParams: { year: "2020" } };
const enProps = { params: { lng: "en" }, searchParams: { year: "2020" } };
const jpProps = { params: { lng: "jp" }, searchParams: { year: "2020" } };

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("next/navigation", () => {
  const { useRouter } = require("next-router-mock");
  const usePathname = () => {
    const router = useRouter();
    return router.pathname;
  };

  const useSearchParams = () => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  };

  return {
    useRouter,
    usePathname,
    useSearchParams,
  };
});

describe("i18n function", () => {
  test("tw", async () => {
    const Result = await Page(twProps);
    render(Result);

    expect(await screen.findByText("本屆")).toBeInTheDocument();
  });
  test("en", async () => {
    const Result = await Page(enProps);
    render(Result);
    expect(await screen.findByText("Current")).toBeInTheDocument();
  });
  test("jp", async () => {
    const Result = await Page(jpProps);
    render(Result);
    expect(await screen.findByText("今回")).toBeInTheDocument();
  });
});
