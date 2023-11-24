import { dir } from "i18next";
import Image, { StaticImageData } from "next/image";
import { languages } from "@/app/i18n/settings";

import { LayoutProps } from "./types";
import { DeskHeader, MobileHeader, Footer } from "./components";

import LanguageLink from "./components/LanguageLink";

import twIcon from "@/language-icon/taiwan.png";
import jpIcon from "@/language-icon/japan.png";
import usIcon from "@/language-icon/united-states.png";
import "@/app/globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

type LanguageIconMapProps = {
  [key: string]: { icon: StaticImageData; title: string };
};

const languageIconMap: LanguageIconMapProps = {
  tw: { title: "繁體中文", icon: twIcon },
  jp: { title: "日本語", icon: jpIcon },
  en: { title: "English", icon: usIcon },
};

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  const languageList = languages.map((language) => ({
    id: language,
    active: language === lng,
    title: (
      <LanguageLink
        className="flex w-full min-w-[150px] items-center justify-between"
        l={language}
      >
        <>
          <p>{languageIconMap[language].title}</p>
          <Image
            className="h-[30px] w-[30px]"
            src={languageIconMap[language].icon}
            alt="flag icon"
          />
        </>
      </LanguageLink>
    ),
  }));

  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body
        suppressHydrationWarning={true}
        className="relative flex min-h-screen flex-col bg-primary-bgMain"
      >
        <DeskHeader languageList={languageList} lng={lng} />
        <MobileHeader languageList={languageList} lng={lng} />
        <main className="h-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
