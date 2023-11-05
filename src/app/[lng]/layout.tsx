import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";

import { Footer } from "./components/Footer";
import { LayoutProps } from "@/app/types";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: LayoutProps) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body suppressHydrationWarning={true}>
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
