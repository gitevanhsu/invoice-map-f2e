import Link from "next/link";
import { useTranslation } from "../../i18n";
import { PageProps } from "./types";

export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng, "second-page");
  return (
    <>
      <h1>{t("title")}</h1>
      <Link className="border-2" href={`/${lng}`}>
        {t("back-to-home")}
      </Link>
    </>
  );
}
