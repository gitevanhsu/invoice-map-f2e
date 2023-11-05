import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

type Props = {
  cookies: {
    has: (arg0: string) => any;
    get: (arg0: string) => {
      (): any;
      new (): any;
      value: string | null | undefined;
    };
  };
  headers: {
    get: (arg0: string) => string;
    has: (arg0: string) => any;
  };
  nextUrl: { pathname: string };
  url: string | URL | undefined;
};

export function middleware(req: Props) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);

  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // get subPath
  const subpath = req.nextUrl.pathname.split("/").slice(2).join("/");

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => loc === req.nextUrl.pathname.split("/")[1]) &&
    subpath
  ) {
    return NextResponse.redirect(new URL(`/en/${subpath}`, req.url));
  }
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
