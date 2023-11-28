"use client";
import { useQueryState } from "next-usequerystate";

import { Current, History } from "./components";

export default function MobileSheet() {
  const [colTab] = useQueryState("chart");

  return (
    <div className="md:hidden">
      {colTab === "2" ? <History /> : <Current />}
    </div>
  );
}
