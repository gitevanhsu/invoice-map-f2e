"use client";
import React, { createContext } from "react";

import { InvoiceType } from "@/app/types";
import _data2016 from "@/public/2016.json";
import _data2020 from "@/public/2020.json";

const data2020: InvoiceType = _data2020;
const data2016: InvoiceType = _data2016;

export const DataContext = createContext({
  lng: "zh-Hant",
  year: "2020",
  data: data2020,
  allData: { "2016": data2016, "2020": data2020 },
});

type DataProviderProps = {
  children: JSX.Element;
  data: InvoiceType;
  year: string;
  lng: string;
};

export default function DataProvider({
  children,
  data,
  year,
  lng,
}: DataProviderProps) {
  return (
    <DataContext.Provider
      value={{
        lng,
        year,
        data,
        allData: { "2016": data2016, "2020": data2020 },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
