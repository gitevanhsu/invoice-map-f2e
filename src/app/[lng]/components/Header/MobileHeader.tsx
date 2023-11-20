"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import Icon from "@mdi/react";
import { mdiMenu, mdiWeb } from "@mdi/js";

import { useTranslation } from "@/app/i18n/client";
import { HeaderProps } from "./types";
import { DrawerList } from "../ShareComponents";
import logo from "./icon_vote.png";

export default function MobileHeader({ languageList, lng }: HeaderProps) {
  const { t } = useTranslation(lng, "header");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // when menu pop up stop user scroll background
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "";
  }, [open]);

  const drawerList = [
    {
      id: "languages",
      title: <>{t("語言")}</>,
      icon: <Icon path={mdiWeb} size={1} />,
      subList: languageList,
    },
  ];

  return (
    <header className="flex h-[50px] items-center justify-between bg-primary-blue px-4 py-3 md:hidden">
      <div className="flex">
        <Image
          src={logo}
          alt="logo"
          className="mr-2 h-[26px] w-[26px] font-sans text-2xl font-bold"
        />
        <p className="text-white">{t("總統開票懶人包")}</p>
      </div>
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Icon path={mdiMenu} size={1} color="#fff" />
      </div>
      {open && (
        <>
          <div
            className="fixed left-0 top-0 h-full w-screen bg-black/30"
            onClick={() => setOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full min-w-[200px] overflow-auto bg-primary-blue ">
            <DrawerList onClose={() => setOpen(false)} content={drawerList} />
          </div>
        </>
      )}
    </header>
  );
}
