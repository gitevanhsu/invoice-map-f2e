"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// handle language change while path change
function handleLanguageChange(pathname: string, targetLanguage?: string) {
  const lng = pathname.split("/").slice(1)[0];
  const subPath = pathname.split("/").slice(2).join("/");
  return `/${targetLanguage || lng}/${subPath}`;
}

export default function LanguageLink({ l }: { l: string }) {
  const pathname = usePathname();

  return <Link href={handleLanguageChange(pathname, l)}>{l}</Link>;
}
