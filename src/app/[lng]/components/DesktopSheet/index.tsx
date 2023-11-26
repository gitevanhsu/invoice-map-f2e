"use client";
import { useState } from "react";

import { InvoiceDataType, InvoiceType } from "@/app/types";
import { bgColorMapLight, textColorMap } from "@/app/setting/color";
import { countyArray, countyTownArray } from "@/app/setting/location";
import {
  findHighestCandidate,
  numberFormatter,
  formatToPercentage,
} from "@/app/utils/number";
import CandidateBasicInfo from "../CandidateBasicInfo";
import {
  Card,
  TabButtonRow,
  TabButtonCol,
  PartyBars,
  SimpleChart,
  NumberBars,
  Item,
  CardSmall,
  LinkGroup,
  ItemColored,
} from "../ShareComponents";
import { useQueryState } from "next-usequerystate";
import { useTranslation } from "@/app/i18n/client";
import { partyIconMap } from "@/app/setting/partyIcon";
import { removeSpace } from "@/app/utils/string";
import { ElectionDetailDesk } from "..";

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
  const { t } = useTranslation(lng, "info-sheet");

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

  const coloredItemArray =
    (data[countyKey].detail &&
      Object.keys(data[countyKey].detail!).reduce<
        Array<{ value: string; key: string }>
      >((acc, item) => {
        if (item === "all") return acc;
        acc.push({ value: data[countyKey].detail![item].fieldCN, key: item });
        return acc;
      }, [])) ??
    countyArray;

  const coloredItemData = data[countyKey].detail ?? data;

  return (
    <div className="hidden md:block">
      <div className="absolute right-0 top-20 h-[calc(100vh_-_80px_-25px)] min-h-[600px] w-1/2 overflow-auto pb-10 pr-5 pt-10">
        {colTab === "2" ? (
          <div className="absolute top-0 w-full">
            <p className="flex items-center bg-[#e2e8f0] p-4 text-lg font-bold leading-none text-primary-bgMain">
              {currentTown ? (
                <>
                  <CardSmall className="px-2 py-1">
                    <>{t(currentCounty)} </>
                  </CardSmall>
                  <p className="mx-[2px] text-lg leading-none text-primary-bgMain">
                    /
                  </p>
                  {t(currentTown)}
                </>
              ) : (
                t(currentCounty)
              )}
              {county && " "}
              {t("歷屆變化")}
            </p>
            <div
              className={`flex flex-col space-y-3 bg-[#e2e8f0] p-4 ${
                !county && "pt-0"
              }`}
            >
              <Card
                titleDivide
                className="rounded-b-lg"
                title={<p className="-mb-1 text-base">{t("政黨輪替")}</p>}
              >
                <div className="px-4">
                  <PartyBars
                    data={parsePartyBarsData(allData, county, town)}
                    label={t("政黨")}
                  />
                </div>
              </Card>
              <Card
                titleDivide
                className="rounded-b-lg"
                title={<p className="-mb-1 text-base">{t("歷屆投票率")}</p>}
              >
                <div className="h-[150px] pr-4 pt-2">
                  <SimpleChart
                    data={parseSimpleChartData(allData, county, town)}
                    labelY="%"
                    dataKeyY="rate"
                    dataKeyX="year"
                    tooltipLabel={t("投票率")}
                    tooltipPostFix="年"
                  />
                </div>
              </Card>
              <Card
                titleDivide
                className="rounded-b-lg"
                title={<p className="-mb-1 text-base">{t("歷屆投票數")}</p>}
              >
                <div className="h-[180px] px-4 pt-2">
                  <NumberBars
                    data={parseNumberBarsData(allData, county, town)}
                    dataKeyY="number"
                    dataKeyX="year"
                    tooltipLabel={t("投票數")}
                    tooltipPostFix="年"
                  />
                </div>
              </Card>
              <Card className="rounded-b-lg">
                <div>
                  {county ? (
                    <div>
                      <p className="mb-2 border-b border-b-[#94A3B8] px-3 pb-2 text-base font-semibold leading-none text-primary-bgMain">
                        {t("鄉鎮市區")}
                      </p>
                      <div className="grid grid-cols-7 gap-2 p-2">
                        {townArray &&
                          townArray.map(({ value, key }) => {
                            return (
                              <Item
                                key={key}
                                className="cursor-pointer"
                                onClick={() => setTown(key)}
                              >
                                {t(value)}
                              </Item>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    countyTownArray.map(({ label, counties }) => {
                      return (
                        <div key={label} className="mb-6">
                          <p className="mb-2 border-b border-b-[#94A3B8] px-3 pb-2 text-base font-semibold leading-none text-primary-bgMain">
                            {t(label)}
                          </p>
                          <div className="mt-3 grid grid-cols-6 gap-3 p-3">
                            {counties.map(({ value, key }) => {
                              return (
                                <Item
                                  key={key}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setTown(null);
                                    setCounty(key);
                                  }}
                                >
                                  {t(value)}
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
          </div>
        ) : (
          <>
            <LinkGroup
              leftHref={`/${lng}?year=2020${county ? `&county=${county}` : ""}`}
              rightHref={`/${lng}?year=2016${
                county ? `&county=${county}` : ""
              }`}
              year={year}
            >
              <h1>
                {year} {t(electionSession[year].session)} {queryCounty?.value}
                {currentTown}
              </h1>
            </LinkGroup>
            <Card className="mt-3 flex flex-col gap-3 rounded-b-lg p-6">
              <>
                <div className="flex items-center justify-center gap-2 rounded-lg md:flex-wrap">
                  {candidateArray.map((item) => (
                    <CandidateBasicInfo key={item.id} {...item} t={t} />
                  ))}
                </div>
                <ElectionDetailDesk {...electionDetail} t={t} />
                <TabButtonRow
                  tabs={rowTabArray}
                  currentTab={rowTab}
                  onClick={setRowTab}
                />
                <Card
                  titleDivide
                  className="rounded-b-lg"
                  title={<>{t(county ? "鄉鎮市區" : "縣市")}</>}
                  titleRight={
                    <div className="flex gap-x-1 font-normal">
                      <div className="rounded bg-white px-2 py-1 shadow">
                        {t("地區")}
                      </div>
                      <div className="rounded bg-white px-2 py-1 shadow">
                        {t(rowTab === "1" ? "比率" : "票數")}
                      </div>
                    </div>
                  }
                >
                  <div className="grid grid-cols-5 gap-3 p-3">
                    {coloredItemArray.map(({ value, key }) => {
                      const {
                        voteRate,
                        candidate1,
                        candidate2,
                        candidate3,
                        validVotes,
                      } = coloredItemData[removeSpace(key)];
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
                        <ItemColored
                          key={key}
                          bg={bgColorMapLight[candidate.party]}
                          label={<>{t(value)}</>}
                          onClick={
                            county
                              ? () => {}
                              : () => {
                                  setTown(null);
                                  setCounty(key);
                                }
                          }
                        >
                          {rowTab === "1" ? (
                            <p className="relative w-full cursor-pointer px-1 text-center text-sm font-normal leading-none md:text-lg md:leading-none">
                              {rate}
                              <span className="absolute right-1">%</span>
                            </p>
                          ) : (
                            <p className="cursor-pointer text-center text-sm font-normal leading-none md:text-lg md:leading-none">
                              {number}
                            </p>
                          )}
                        </ItemColored>
                      );
                    })}
                  </div>
                </Card>
              </>
            </Card>
          </>
        )}
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
