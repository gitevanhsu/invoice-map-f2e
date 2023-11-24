"use client";
import { useState } from "react";
import { useClickOutSide } from "@/app/[lng]/Hooks";
type CardProps = {
  title?: JSX.Element;
  titleDivide?: boolean;
  titleRight?: JSX.Element;
  otherInfo?: JSX.Element;
  children: JSX.Element;
  className?: string;
};

export default function Card({
  title,
  titleDivide = false,
  otherInfo,
  titleRight,
  children,
  className,
}: CardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useClickOutSide(() => setOpen(false));
  return (
    <div
      ref={ref}
      className={`rounded-t-lg bg-white/60 ${
        otherInfo ? "rounded-b-lg" : "py-3"
      } ${className && className}`}
    >
      {title && (
        <div
          className={`mx-3 mb-3 flex items-center text-lg font-semibold leading-none text-[#475569] ${
            titleRight && "justify-between"
          }`}
        >
          {title}
          {titleRight && titleRight}
        </div>
      )}
      {titleDivide && <hr className="border-[#94A3B8]" />}
      {children}
      {otherInfo && (
        <div
          className={`${
            open ? "h-auto overflow-auto" : "h-0 overflow-hidden"
          } max-h-full origin-bottom transition-all duration-300`}
        >
          {otherInfo}
        </div>
      )}
      {otherInfo && (
        <p
          onClick={() => setOpen((prev) => !prev)}
          className={`mt-3 flex cursor-pointer items-center justify-center py-3 text-base leading-none text-[#475569] ${
            open || "border-t border-[#94A3B8]"
          }`}
        >
          {open ? "收合內容" : "展開更多"}
        </p>
      )}
    </div>
  );
}
