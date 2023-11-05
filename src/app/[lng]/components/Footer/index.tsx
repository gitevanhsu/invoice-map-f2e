import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n";
import LanguageLink from "../LanguageLink";

export const Footer = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng, "footer");

  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from
        <strong>
          <>{{ lng }}</>
        </strong>{" "}
        to:{" "}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <LanguageLink l={l} />
            </span>
          );
        })}
    </footer>
  );
};
