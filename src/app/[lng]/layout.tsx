import { Suspense } from "react";
import { dir } from "i18next";
import Image, { StaticImageData } from "next/image";
import { languages } from "@/app/i18n/settings";

import "@/app/globals.css";
import { LayoutProps } from "./types";
import { DeskHeader, MobileHeader, Footer, LanguageLink } from "./components";

import twIcon from "@/language-icon/taiwan.png";
import jpIcon from "@/language-icon/japan.png";
import usIcon from "@/language-icon/united-states.png";

import MyLoading from "./MyLoading";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

type LanguageIconMapProps = {
  [key: string]: { icon: StaticImageData; title: string };
};

const languageIconMap: LanguageIconMapProps = {
  "zh-Hant": { title: "繁體中文", icon: twIcon },
  ja: { title: "日本語", icon: jpIcon },
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
            priority
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        suppressHydrationWarning={true}
        className="relative flex h-screen flex-col bg-primary-bgMain md:overflow-hidden"
      >
        <Suspense fallback={<MyLoading lng={lng} />}>
          <DeskHeader languageList={languageList} lng={lng} />
          <MobileHeader languageList={languageList} lng={lng} />
          <main className="h-[calc(100%_-_80px_-_25px)]">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
