import { useTranslation } from "@/app/i18n";

import { PageProps } from "./types";
import GeoMap from "./components/GeoComponents";
import MobileSheet from "./components/MobileSheet";

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
    params,
    searchParams: { year = "2020" },
  } = props;
  const { t } = await useTranslation(params.lng);
  const data = dataPicker(year);

  return (
    <>
      {/* <h1>{t("title")}</h1> */}
      {/* <Link className="border-2" href={`/${lng}/second-page`}>
        {t("to-second-page")}
      </Link> */}
      <GeoMap data={data} />
      <MobileSheet lng={params.lng} year={year} data={data} />
    </>
  );
}
