"use client";
import { useEffect, useState } from "react";

import Icon from "@mdi/react";
import { mdiMenu, mdiWeb } from "@mdi/js";

import { HeaderProps } from "./types";
import { DrawerList } from "../ShareComponents";

export default function MobileHeader({ languageList }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // when menu pop up stop user scroll background
    if (open) document.body.style.overflow = "hidden";
    if (!open) document.body.style.overflow = "";
  }, [open]);

  const drawerList = [
    {
      id: "languages",
      title: <>Languages</>,
      icon: <Icon path={mdiWeb} size={1} />,
      subList: languageList,
    },
  ];

  return (
    <header className="flex h-[45px] items-center justify-between bg-primary px-4 py-2 md:hidden">
      <p>MobileHeader</p>
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Icon path={mdiMenu} size={1} />
      </div>
      {open && (
        <>
          <div
            className="fixed left-0 top-0 h-full w-screen bg-black/30"
            onClick={() => setOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full min-w-[200px] overflow-auto bg-primary">
            <DrawerList onClose={() => setOpen(false)} content={drawerList} />
          </div>
        </>
      )}
    </header>
  );
}
