import Image from "next/image";
import Icon from "@mdi/react";
import { mdiWeb } from "@mdi/js";

import { useTranslation } from "@/app/i18n";
import { HoverList } from "../ShareComponents";
import { HeaderProps } from "./types";
import logo from "./icon_vote.png";

export default async function DeskHeader({ languageList, lng }: HeaderProps) {
  const { t } = await useTranslation(lng, "header");
  return (
    <header className="hidden h-[80px] items-center justify-between bg-primary-blue py-7 pl-[60px] leading-6 md:flex">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="logo"
          className="mr-2 h-[26px] w-[26px] font-sans text-2xl font-bold leading-none"
        />
        <p className="text-white">{t("總統開票懶人包")}</p>
      </div>
      <div>
        <HoverList
          title={
            <div className="z-20 px-4 py-2">
              <Icon path={mdiWeb} size={1} color="#fff" />
            </div>
          }
          content={languageList}
        />
      </div>
    </header>
  );
}
