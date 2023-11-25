"use client";
import Image, { StaticImageData } from "next/image";
import { fromColorMapLight } from "@/app/setting/color";

type dataType = {
  year: string;
  party: string;
  icon: StaticImageData;
};

type PartyBarsProps = {
  data: Array<dataType>;
  label: string;
};

export default function PartyBars({ data, label }: PartyBarsProps) {
  const width = `w-[${Math.round(data.length / 100)}%]`;
  return (
    <div className="mt-4 flex space-x-[2px]">
      <div className="flex w-8 items-center text-xs text-[#94A3B8]">
        {label}
      </div>
      {data.map(({ year, party, icon }) => (
        <div key={year} className="max-w-[40px] flex-grow">
          <div
            className={`relative flex h-[100px] items-center justify-center bg-gradient-to-b ${width} ${fromColorMapLight[party]}`}
          >
            <Image
              src={icon}
              alt="party icon"
              className="h-5 w-5 rounded-full"
            />
          </div>
          <div className="mt-0.5 text-center text-xs leading-none text-[#94A3B8]">
            {year}
          </div>
        </div>
      ))}
    </div>
  );
}
