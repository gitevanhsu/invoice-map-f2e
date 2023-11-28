"use client";
import { useContext, useState } from "react";

import { useQueryState } from "next-usequerystate";

import { useTranslation } from "@/app/i18n/client";
import { bgColorMapLight } from "@/app/setting/color";
import { countyArray } from "@/app/setting/location";
import { removeSpace } from "@/app/utils/string";
import {
  findHighestCandidate,
  numberFormatter,
  formatToPercentage,
} from "@/app/utils/number";

import { DataContext } from "@/app/[lng]/components/Providers";
import { CandidateBasicInfo, ElectionDetailDesk } from "@/app/[lng]/components";
import {
  Card,
  TabButtonRow,
  LinkGroup,
  ItemColored,
} from "@/app/[lng]/components/ShareComponents";

type getElectionDetailProps = {
  [key: string]: {
    voteRate: number;
    votes: number;
    validVotes: number;
    invalidVotes: number;
  };
};

const electionSession: { [key: string]: { session: string } } = {
  "2020": { session: "第15屆" },
  "2016": { session: "第14屆" },
};

function getElectionDetail(data: getElectionDetailProps, key: string) {
  return {
    percentage: formatToPercentage(data[key].voteRate / 100).replace("%", ""),
    total: numberFormatter(data[key].votes),
    valid: numberFormatter(data[key].validVotes),
    invalid: numberFormatter(data[key].invalidVotes),
  };
}

// Desk 本屆資訊
export default function Current() {
  const { year, data, lng } = useContext(DataContext);
  const [rowTab, setRowTab] = useState("1");
  const [county, setCounty] = useQueryState("county");
  const [town, setTown] = useQueryState("town");
  const { t } = useTranslation(lng, "info-sheet");

  const rowTabArray = [
    { value: t("投票率"), id: "1" },
    { value: t("投票數"), id: "2" },
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
    <>
      <LinkGroup
        leftHref={`/${lng}?year=2020${county ? `&county=${county}` : ""}`}
        rightHref={`/${lng}?year=2016${county ? `&county=${county}` : ""}`}
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
  );
}
