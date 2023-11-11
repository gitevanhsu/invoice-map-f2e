"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// handle language change while path change
function handleLanguageChange(pathname: string, targetLanguage?: string) {
  const lng = pathname.split("/").slice(1)[0];
  const subPath = pathname.split("/").slice(2).join("/");
  return `/${targetLanguage || lng}/${subPath}`;
}

type Props = { l: string; className?: string; children: JSX.Element };

export default function LanguageLink({ l, children, className }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={className && className}
      href={handleLanguageChange(pathname, l)}
    >
      {children && children}
    </Link>
  );
}
