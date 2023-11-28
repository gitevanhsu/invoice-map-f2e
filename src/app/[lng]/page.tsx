import { PageProps } from "./types";
import { GeoMap, MobileSheet, DesktopSheet, DataProvider } from "./components/";

import _data2016 from "@/public/2016.json";
import _data2020 from "@/public/2020.json";
import { InvoiceType } from "../types";
const data2020: InvoiceType = _data2020;
const data2016: InvoiceType = _data2016;

function dataPicker(year: string) {
  switch (year) {
    case "2016":
      return data2016;

    case "2020":
      return data2020;
    default:
      return data2020;
  }
}

export default async function Page(props: PageProps) {
  const {
    params: { lng },
    searchParams: { year = "2020" },
  } = props;
  const data = dataPicker(year);

  return (
    <DataProvider data={data} year={year} lng={lng}>
      <>
        <GeoMap />
        <MobileSheet />
        <DesktopSheet />
      </>
    </DataProvider>
  );
}
