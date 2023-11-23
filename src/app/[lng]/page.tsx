import { useTranslation } from "@/app/i18n";
import Link from "next/link";

import { PageProps } from "./types";
import GeoMap from "./components/GeoComponents";

export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);

  return (
    <>
      <h1>{t("title")}</h1>
      {/* <Link className="border-2" href={`/${lng}/second-page`}>
        {t("to-second-page")}
      </Link> */}
      <GeoMap />
    </>
  );
}
