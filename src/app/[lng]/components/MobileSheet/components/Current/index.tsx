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
import { CandidateBasicInfo, ElectionDetail } from "@/app/[lng]/components";
import {
  Card,
  TabButtonRow,
  TabButtonCol,
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

export default function Current() {
  const { lng, year, data } = useContext(DataContext);
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
    <div className="absolute bottom-0 left-0 max-h-[60%] w-full ">
      <div className="absolute bottom-full right-0 pb-3 pr-4">
        <TabButtonCol
          tabs={colTabArray}
          currentTab={colTab || "1"}
          onClick={setColTab}
        />
      </div>
      <Card
        openText={t("收合內容")}
        closeText={t("展開更多")}
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
          <LinkGroup
            leftHref={`/${lng}?year=2020${county ? `&county=${county}` : ""}`}
            rightHref={`/${lng}?year=2016${county ? `&county=${county}` : ""}`}
            year={year}
          >
            <>{year}</>
          </LinkGroup>
        }
        otherInfo={
          <div className="mt-3 flex flex-col space-y-3">
            <ElectionDetail {...electionDetail} t={t} />
            <TabButtonRow
              tabs={rowTabArray}
              currentTab={rowTab}
              onClick={setRowTab}
            />
            <Card
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
              titleDivide
            >
              <div className="grid grid-cols-4 gap-2 p-2">
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
                        <p className="cursor-pointer text-center text-sm font-normal leading-none">
                          {number}
                        </p>
                      )}
                    </ItemColored>
                  );
                })}
              </div>
            </Card>
          </div>
        }
      >
        <div className="flex items-center justify-center space-x-2 rounded-lg">
          {candidateArray.map((item) => (
            <CandidateBasicInfo key={item.id} {...item} t={t} />
          ))}
        </div>
      </Card>
    </div>
  );
}
