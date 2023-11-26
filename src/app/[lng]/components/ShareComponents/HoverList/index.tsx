"use client";
import { useState } from "react";

import { HoverListProps } from "./types";

export default function HoverList({ title, content }: HoverListProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative z-20 cursor-pointer bg-primary-blue"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title}
      <ul
        className={`absolute right-[0px] top-[100%] overflow-hidden rounded-md bg-primary-blue text-white 
        ${hover ? "block" : "hidden"}`}
      >
        {content.length > 0 &&
          content.map(({ title, id, active }) => (
            <li
              className={`list-none px-4 py-2 hover:brightness-150 hover:backdrop-brightness-150
              ${active && "brightness-150 backdrop-brightness-150"}`}
              key={id}
            >
              {title}
            </li>
          ))}
      </ul>
    </div>
  );
}
