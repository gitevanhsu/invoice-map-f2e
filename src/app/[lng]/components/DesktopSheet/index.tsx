"use client";
import { useContext } from "react";

import { useQueryState } from "next-usequerystate";

import { useTranslation } from "@/app/i18n/client";
import { countyArray } from "@/app/setting/location";
import { bgColorMapLight, textColorMap } from "@/app/setting/color";
import { removeSpace } from "@/app/utils/string";
import {
  findHighestCandidate,
  numberFormatter,
  formatToPercentage,
} from "@/app/utils/number";

import { DataContext } from "@/app/[lng]/components/Providers";
import { Current, History } from "./components";
import {
  TabButtonCol,
  CardSmall,
} from "@/app/[lng]/components/ShareComponents";

export default function DeskSheet() {
  const { data, lng } = useContext(DataContext);
  const [colTab, setColTab] = useQueryState("chart");
  const [county] = useQueryState("county");
  const [town] = useQueryState("town");
  const { t } = useTranslation(lng, "info-sheet");

  const colTabArray = [
    { value: t("本屆"), id: "1" },
    { value: t("歷屆"), id: "2" },
  ];

  const queryCounty = countyArray.find(({ key }) => key === county);
  const countyKey = queryCounty ? removeSpace(queryCounty.key) : "all";

  const townKey = town ? removeSpace(town) : "";
  const dataRecourse = townKey
    ? data[countyKey].detail![townKey]
    : data[countyKey];

  const { candidate1, candidate2, candidate3 } = dataRecourse;
  const candidate = findHighestCandidate(candidate1, candidate2, candidate3);

  const candidateArray = [candidate1, candidate2, candidate3].map((item) => ({
    ...item,
    votes: numberFormatter(item.votes),
    share: formatToPercentage(item.votes / data[countyKey].validVotes).replace(
      "%",
      ""
    ),
    win: candidate.id === item.id,
  }));

  return (
    <div className="hidden md:block">
      <div className="absolute right-0 top-20 h-[calc(100vh_-_80px_-25px)] min-h-[600px] w-1/2 overflow-auto pb-10 pr-5 pt-10">
        {colTab === "2" ? <History /> : <Current />}
        <div className="fixed bottom-10 right-6">
          <TabButtonCol
            tabs={colTabArray}
            currentTab={colTab || "1"}
            onClick={setColTab}
          />
        </div>
      </div>
      <div className="fixed bottom-10 left-14">
        {candidateArray.map(({ party, id }) => (
          <CardSmall
            key={party}
            className="m-2 w-full items-center justify-start border border-white p-2"
            bg={`${bgColorMapLight[party]}`}
          >
            <>
              <div
                className={`mr-[2px] flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-white text-[10px] leading-3 md:text-base ${textColorMap[party]} `}
              >
                {id}
              </div>
              <p className="text-xs leading-none text-white md:text-base md:leading-none">
                {t(party)}
              </p>
            </>
          </CardSmall>
        ))}
      </div>
    </div>
  );
}
