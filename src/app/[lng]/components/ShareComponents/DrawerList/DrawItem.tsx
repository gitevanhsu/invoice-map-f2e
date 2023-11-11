"use client";
import { useState } from "react";

import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { ItemProps } from "./types";

export default function DrawerItem({
  title,
  subList,
  icon,
  active,
}: ItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        className={`flex min-h-[45px] w-full list-none items-center px-4 py-2 hover:brightness-150 hover:backdrop-brightness-150
        ${subList && "cursor-pointer"}
        ${active && "brightness-150 backdrop-brightness-150"}`}
        onClick={() => subList && setOpen((prev) => !prev)}
      >
        <div className="flex w-full items-center">
          {icon && <div className="mr-2">{icon}</div>}
          {title}
        </div>
        {subList && (
          <div className="ml-auto">
            <Icon path={open ? mdiChevronUp : mdiChevronDown} size={1} />
          </div>
        )}
      </li>
      {open &&
        subList &&
        subList.map((item) => <DrawerItem key={item.id} {...item} />)}
    </>
  );
}
