import Image from "next/image";
import Link from "next/link";

import triRightImg from "@/public/images/icon_arrow_right.png";
import triLeftImg from "@/public/images/icon_arrow_left.png";
type LinkGroupProps = {
  leftHref: string;
  rightHref: string;
  year: string;
  children: JSX.Element;
};
export default function LinkGroup({
  leftHref,
  rightHref,
  year,
  children,
}: LinkGroupProps) {
  return (
    <div className="flex h-6 items-center rounded bg-white shadow md:h-12">
      <Link
        href={leftHref}
        className={`flex items-center justify-center p-[2px] ${
          year === "2020" && "cursor-not-allowed"
        }`}
      >
        <Image
          priority
          className={`h-5 w-5 md:h-8 md:w-8 ${
            year === "2020" && "cursor-not-allowed"
          }`}
          src={triLeftImg}
          alt="button img"
        />
      </Link>
      <div className="flex flex-grow justify-center border-x border-[#E2E8F0] p-1 font-medium leading-none md:text-[28px]">
        {children}
      </div>

      <Link
        href={rightHref}
        className={`flex items-center justify-center p-[2px] ${
          year === "2016" && " cursor-not-allowed"
        }`}
      >
        <Image
          priority
          className={`h-5 w-5 md:h-8 md:w-8 ${
            year === "2016" && "cursor-not-allowed"
          }`}
          src={triRightImg}
          alt="button img"
        />
      </Link>
    </div>
  );
}
