"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import triRightImg from "@/public/images/icon_arrow_right.png";
import triLeftImg from "@/public/images/icon_arrow_left.png";
import { InvoiceDataType, InvoiceType } from "@/app/types";
import { bgColorMapLight } from "@/app/setting/color";
import { countyArray, countyTownArray } from "@/app/setting/location";
import {
  findHighestCandidate,
  numberFormatter,
  formatToPercentage,
} from "@/app/utils/number";
import CandidateBasicInfo from "../CandidateBasicInfo";
import ElectionDetail from "../ElectionDetail";
import {
  Card,
  TabButtonRow,
  TabButtonCol,
  PartyBars,
  SimpleChart,
  NumberBars,
  Item,
  CardSmall,
} from "../ShareComponents";
import { useQueryState } from "next-usequerystate";
import { useTranslation } from "@/app/i18n/client";
import { partyIconMap } from "@/app/setting/partIcon";
import { removeSpace } from "@/app/utils/string";
import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";

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
const electionSession: { [key: string]: { session: string } } = {
  "2020": { session: "第15屆" },
  "2016": { session: "第14屆" },
};

function parsePartyBarsData(
  data: { [key: string]: InvoiceType },
  county: string | null,
  town: string | null
) {
  const key = (county && removeSpace(county)) ?? "all";

  return Object.keys(data).map((item) => {
    const townData =
      town &&
      data[item][key].detail &&
      data[item][key].detail![removeSpace(town)];

    const { candidate1, candidate2, candidate3 } =
      (townData as InvoiceDataType) ?? data[item][key];

    const { party } = findHighestCandidate(candidate1, candidate2, candidate3);
    return {
      year: item,
      party,
      icon: partyIconMap[party],
    };
  });
}

function parseSimpleChartData(
  data: { [key: string]: InvoiceType },
  county: string | null,
  town: string | null
) {
  const key = (county && removeSpace(county)) ?? "all";

  return Object.keys(data).map((item) => {
    const townData =
      town &&
      data[item][key].detail &&
      data[item][key].detail![removeSpace(town)];

    const { voteRate } = (townData as InvoiceDataType) ?? data[item][key];
    return {
      year: item,
      rate: voteRate,
    };
  });
}

function parseNumberBarsData(
  data: { [key: string]: InvoiceType },
  county: string | null,
  town: string | null
) {
  const key = (county && removeSpace(county)) ?? "all";
  return Object.keys(data).map((item) => {
    const townData =
      town &&
      data[item][key].detail &&
      data[item][key].detail![removeSpace(town)];

    const { validVotes } = (townData as InvoiceDataType) ?? data[item][key];
    return {
      year: item,
      number: validVotes,
    };
  });
}

export default function MobileSheet({
  lng,
  year,
  data,
  allData,
}: {
  lng: string;
  year: string;
  data: InvoiceType;
  allData: { [key: string]: InvoiceType };
}) {
  const [rowTab, setRowTab] = useState("1");
  const [colTab, setColTab] = useQueryState("chart");
  const [county, setCounty] = useQueryState("county");
  const [town, setTown] = useQueryState("town");
  const { t } = useTranslation(lng, "mobile-sheet");

  const rowTabArray = [
    { value: t("投票率"), id: "1" },
    { value: t("投票數"), id: "2" },
  ];
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

  const result = data[countyKey];

  const townArray =
    result.detail &&
    Object.keys(result.detail).reduce<Array<{ value: string; key: string }>>(
      (acc, town) => {
        if (town !== "all") {
          acc.push({
            value: result.detail![town].fieldCN,
            key: result.detail![town].fieldEn,
          });
        }
        return acc;
      },
      []
    );

  const currentCounty =
    countyArray.find(({ key }) => key === county)?.value ?? "全國";

  const currentTown =
    townArray && townArray.find(({ key }) => key === town)?.value;

  const electionDetail = getElectionDetail(data, countyKey);

  return colTab === "2" ? (
    <div className="pointer-events-none absolute top-0 mt-[50px] w-full md:mt-[80px]">
      <p className="flex items-center bg-[#e2e8f0] p-4 text-lg font-bold leading-none text-primary-bgMain">
        {currentTown ? (
          <>
            <CardSmall className="px-2 py-1">
              <>{currentCounty}</>
            </CardSmall>
            <p className="mx-[2px] text-lg leading-none text-primary-bgMain">
              /
            </p>
            {currentTown}
          </>
        ) : (
          currentCounty
        )}
        {county && " "}歷屆變化
      </p>

      {county && (
        <div className="pointer-events-none relative h-[400px]">
          <div
            className="absolute right-5 top-5 flex items-center rounded-lg border bg-white p-2 pl-1"
            onClick={() => {
              setCounty(null);
              setTown(null);
            }}
          >
            <Icon path={mdiChevronLeft} size={1} color={"#475569"} />
            <p className="pointer-events-auto text-base font-medium leading-none text-primary-bgMain">
              返回全國
            </p>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col space-y-3 bg-[#e2e8f0] p-4 ${
          !county && "pt-0"
        }`}
      >
        <Card
          titleDivide
          className="rounded-b-lg"
          title={<p className="-mb-1 text-base">政黨輪替</p>}
        >
          <div className="px-4">
            <PartyBars
              data={parsePartyBarsData(allData, county, town)}
              label={"政黨"}
            />
          </div>
        </Card>
        <Card
          titleDivide
          className="rounded-b-lg"
          title={<p className="-mb-1 text-base">歷屆投票率</p>}
        >
          <div className="pr-4 pt-2">
            <SimpleChart
              data={parseSimpleChartData(allData, county, town)}
              labelY="%"
              dataKeyY="rate"
              dataKeyX="year"
              tooltipLabel="投票率"
              tooltipPostFix="年"
            />
          </div>
        </Card>
        <Card
          titleDivide
          className="rounded-b-lg"
          title={<p className="-mb-1 text-base">歷屆投票數</p>}
        >
          <div className="px-4 pt-2">
            <NumberBars
              data={parseNumberBarsData(allData, county, town)}
              dataKeyY="number"
              dataKeyX="year"
              tooltipLabel="投票數"
              tooltipPostFix="年"
            />
          </div>
        </Card>
        <Card className="rounded-b-lg">
          <div>
            {county ? (
              <div>
                <p className="mb-2 border-b border-b-[#94A3B8] px-3 pb-2 text-base font-semibold leading-none text-primary-bgMain">
                  鄉鎮市區
                </p>
                <div className="pointer-events-auto mx-2 mb-3 flex flex-wrap gap-2">
                  {townArray &&
                    townArray.map(({ value, key }) => {
                      return (
                        <Item key={key} onClick={() => setTown(key)}>
                          {value}
                        </Item>
                      );
                    })}
                </div>
              </div>
            ) : (
              countyTownArray.map(({ label, counties }) => {
                return (
                  <div key={label}>
                    <p className="pointer-events-auto mb-2 border-b border-b-[#94A3B8] px-3 pb-2 text-base font-semibold leading-none text-primary-bgMain">
                      {label}
                    </p>
                    <div className="pointer-events-auto mx-2 mb-3 flex flex-wrap gap-2">
                      {counties.map(({ value, key }) => {
                        return (
                          <Item
                            key={key}
                            onClick={() => {
                              setTown(null);
                              setCounty(key);
                            }}
                          >
                            {value}
                          </Item>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
      <div className="pointer-events-auto fixed right-0 top-1/2 pb-3 pr-4">
        <TabButtonCol
          tabs={colTabArray}
          currentTab={colTab || "1"}
          onClick={setColTab}
        />
      </div>
    </div>
  ) : (
    <div className="absolute bottom-0 left-0 max-h-[60%] w-full ">
      <div className="absolute bottom-full right-0 pb-3 pr-4">
        <TabButtonCol
          tabs={colTabArray}
          currentTab={colTab || "1"}
          onClick={setColTab}
        />
      </div>
      <Card
        className="px-4 pt-4"
        title={
          <p>
            {t(
              countyArray.find(({ key }) => key === county)?.value ??
                electionSession[year || "2020"].session
            )}
          </p>
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
                  data[countyKey].detail &&
                  Object.keys(data[countyKey].detail!).map((item) => {
                    if (item === "all") return null;
                    const {
                      voteRate,
                      candidate1,
                      candidate2,
                      candidate3,
                      validVotes,
                      fieldCN,
                    } = data[countyKey].detail![item];
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
                {(!county || !data[countyKey].detail) &&
                  countyArray.map(({ value, key }) => {
                    const {
                      voteRate,
                      candidate1,
                      candidate2,
                      candidate3,
                      validVotes,
                    } = data[removeSpace(key)];
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
                        onClick={() => {
                          setTown(null);
                          setCounty(key);
                        }}
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
