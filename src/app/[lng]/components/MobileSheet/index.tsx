"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import triRightImg from "@/public/images/icon_arrow_right.png";
import triLeftImg from "@/public/images/icon_arrow_left.png";
import { InvoiceType } from "@/app/types";
import { bgColorMapLight } from "@/app/setting/color";
import { countyArray } from "@/app/setting/location";
import {
  findHighestCandidate,
  numberFormatter,
  formatToPercentage,
} from "@/app/utils/number";
import CandidateBasicInfo from "../CandidateBasicInfo";
import ElectionDetail from "../ElectionDetail";
import { Card, TabButtonRow, TabButtonCol } from "../ShareComponents";
import { useQueryState } from "next-usequerystate";
import { useTranslation } from "@/app/i18n/client";

type getElectionDetailProps = {
  [key: string]: {
    voteRate: number;
    votes: number;
    validVotes: number;
    invalidVotes: number;
  };
};

function getElectionDetail(data: getElectionDetailProps, key: string) {
  return {
    percentage: formatToPercentage(data[key].voteRate / 100).replace("%", ""),
    total: numberFormatter(data[key].votes),
    valid: numberFormatter(data[key].validVotes),
    invalid: numberFormatter(data[key].invalidVotes),
  };
}
const electionSession: {
  [key: string]: {
    session: string;
  };
} = { "2020": { session: "第15屆" }, "2016": { session: "第14屆" } };

export default function MobileSheet({
  lng,
  year,
  data,
}: {
  lng: string;
  year: string;
  data: InvoiceType;
}) {
  const [rowTab, setRowTab] = useState("1");
  const [colTab, setColTab] = useState("1");
  const [county, setCounty] = useQueryState("county");
  const { t } = useTranslation(lng, "mobile-sheet");

  const rowTabArray = [
    { value: t("投票率"), id: "1" },
    { value: t("投票數"), id: "2" },
  ];
  const colTabArray = [
    { value: t("本屆"), id: "1" },
    { value: t("歷屆"), id: "2" },
  ];

  const queryCounty = countyArray.find(({ value }) => value === county);
  const dataKey = queryCounty ? queryCounty.key.replaceAll(" ", "") : "all";

  const { candidate1, candidate2, candidate3 } = data[dataKey];
  const candidate = findHighestCandidate(candidate1, candidate2, candidate3);

  const candidateArray = [candidate1, candidate2, candidate3].map((item) => ({
    ...item,
    votes: numberFormatter(item.votes),
    share: formatToPercentage(item.votes / data[dataKey].validVotes).replace(
      "%",
      ""
    ),
    win: candidate.id === item.id,
  }));

  const electionDetail = getElectionDetail(data, dataKey);

  return (
    <div className="absolute bottom-0 left-0 max-h-[60%] w-full ">
      <div className="absolute bottom-full right-0 pb-3 pr-4">
        <TabButtonCol
          tabs={colTabArray}
          currentTab={colTab}
          onClick={setColTab}
        />
      </div>
      <Card
        className="px-4 pt-4"
        title={
          <p>{t(county ? county : electionSession[year || "2020"].session)}</p>
        }
        titleRight={
          <div className="flex h-6 rounded bg-white shadow">
            <Link
              href={`/${lng}?year=2020${county ? `&county=${county}` : ""}`}
              className={`flex items-center justify-center p-[2px] ${
                year === "2020" && " cursor-not-allowed"
              }`}
            >
              <Image
                className={`h-5 w-5 ${
                  year === "2020" && " cursor-not-allowed"
                }`}
                src={triLeftImg}
                alt="button img"
              />
            </Link>
            <div className="flex border-x border-[#E2E8F0] p-1 font-medium leading-none">
              {year}
            </div>

            <Link
              href={`/${lng}?year=2016${county ? `&county=${county}` : ""}`}
              className={`flex items-center justify-center p-[2px] ${
                year === "2016" && " cursor-not-allowed"
              }`}
            >
              <Image
                className={`h-5 w-5 ${
                  year === "2016" && " cursor-not-allowed"
                }`}
                src={triRightImg}
                alt="button img"
              />
            </Link>
          </div>
        }
        otherInfo={
          <div className="mt-3 flex flex-col space-y-3">
            <ElectionDetail {...electionDetail} />
            <TabButtonRow
              tabs={rowTabArray}
              currentTab={rowTab}
              onClick={setRowTab}
            />
            <Card
              className="rounded-b-lg"
              title={<>{county ? "鄉鎮市區" : "縣市"}</>}
              titleRight={
                <div className="flex gap-x-1 font-normal">
                  <div className="rounded bg-white px-2 py-1 shadow">地區</div>
                  <div className="rounded bg-white px-2 py-1 shadow">
                    {rowTab === "1" ? "比率" : "票數"}
                  </div>
                </div>
              }
              titleDivide
            >
              <div className="flex flex-wrap gap-2 p-3">
                {county &&
                  data[dataKey].detail &&
                  Object.keys(data[dataKey].detail!).map((item) => {
                    if (item === "all") return null;
                    const {
                      voteRate,
                      candidate1,
                      candidate2,
                      candidate3,
                      validVotes,
                      fieldCN,
                    } = data[dataKey].detail![item];
                    const rate = formatToPercentage(voteRate / 100).replace(
                      "%",
                      ""
                    );

                    const candidate = findHighestCandidate(
                      candidate1,
                      candidate2,
                      candidate3
                    );
                    const number = numberFormatter(validVotes);
                    return (
                      <div
                        key={item}
                        className={`flex w-[calc(100%_/_4_-_8px_+_(8px_/_4))] flex-col items-center rounded py-2 text-base font-semibold text-white ${
                          bgColorMapLight[candidate.party]
                        }`}
                      >
                        <p className="mb-1 cursor-pointer leading-none">
                          {fieldCN}
                        </p>
                        {rowTab === "1" ? (
                          <p className="relative w-full cursor-pointer px-1 text-center text-sm font-normal leading-none">
                            {rate}
                            <span className="absolute right-1">%</span>
                          </p>
                        ) : (
                          <p className="cursor-pointer text-center text-sm font-normal leading-none">
                            {number}
                          </p>
                        )}
                      </div>
                    );
                  })}
                {/* if county didn't selected || no detail data */}
                {(!county || !data[dataKey].detail) &&
                  countyArray.map(({ value, key }) => {
                    const {
                      voteRate,
                      candidate1,
                      candidate2,
                      candidate3,
                      validVotes,
                    } = data[key.replaceAll(" ", "")];
                    const rate = formatToPercentage(voteRate / 100).replace(
                      "%",
                      ""
                    );

                    const candidate = findHighestCandidate(
                      candidate1,
                      candidate2,
                      candidate3
                    );

                    const number = numberFormatter(validVotes);
                    return (
                      <div
                        key={value}
                        onClick={() => setCounty(value)}
                        className={`flex w-[calc(100%_/_4_-_8px_+_(8px_/_4))] flex-col items-center rounded py-2 text-base font-semibold text-white ${
                          bgColorMapLight[candidate.party]
                        }`}
                      >
                        <p className="mb-1 cursor-pointer leading-none">
                          {value}
                        </p>
                        {rowTab === "1" ? (
                          <p className="relative w-full cursor-pointer px-1 text-center text-sm font-normal leading-none">
                            {rate}
                            <span className="absolute right-1">%</span>
                          </p>
                        ) : (
                          <p className="cursor-pointer text-center text-sm font-normal leading-none">
                            {number}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        }
      >
        <div className="flex items-center justify-center space-x-2 rounded-lg">
          {candidateArray.map((item) => (
            <CandidateBasicInfo key={item.id} {...item} />
          ))}
        </div>
      </Card>
    </div>
  );
}
