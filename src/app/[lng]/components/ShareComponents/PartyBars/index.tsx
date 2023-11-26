"use client";
import Image, { StaticImageData } from "next/image";
import { fromColorMapLight } from "@/app/setting/color";
import { partyIconMap } from "@/app/setting/partyIcon";

type DataType = {
  year: string;
  party: string;
  icon: StaticImageData;
};

type PartyBarsProps = {
  data: Array<DataType>;
  label: string;
};

const years = ["1996", "2000", "2004", "2008", "2012"];
const party = ["親民黨", "中國國民黨", "民主進步黨"];

function createMockNum(year: string) {
  const id = Math.round(Math.random() * 2);

  return { year, icon: partyIconMap[party[id]], party: party[id] };
}

export default function PartyBars({ data: realData, label }: PartyBarsProps) {
  const width = `w-[${Math.round(realData.length / 100)}%]`;
  const fakeData = years.map((year) => createMockNum(year));
  const data = [...fakeData, ...realData];
  return (
    <div className="mt-4 flex space-x-[2px]">
      <div className="flex w-8 items-center text-xs text-[#94A3B8]">
        {label}
      </div>
      {data.map(({ year, party, icon }) => (
        <div key={year} className="flex-grow ">
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
