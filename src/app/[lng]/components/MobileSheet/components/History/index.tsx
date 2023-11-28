"use client";
import { useContext } from "react";

import { useQueryState } from "next-usequerystate";

import { useTranslation } from "@/app/i18n/client";
import { InvoiceDataType, InvoiceType } from "@/app/types";
import { countyArray, countyTownArray } from "@/app/setting/location";
import { partyIconMap } from "@/app/setting/partyIcon";
import { removeSpace } from "@/app/utils/string";
import { findHighestCandidate } from "@/app/utils/number";

import { DataContext } from "@/app/[lng]/components/Providers";
import {
  Card,
  TabButtonCol,
  PartyBars,
  SimpleChart,
  NumberBars,
  Item,
  CardSmall,
} from "@/app/[lng]/components/ShareComponents";

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

export default function History() {
  const { lng, data, allData } = useContext(DataContext);
  const [colTab, setColTab] = useQueryState("chart");
  const [county, setCounty] = useQueryState("county");
  const [town, setTown] = useQueryState("town");
  const { t } = useTranslation(lng, "info-sheet");

  const colTabArray = [
    { value: t("本屆"), id: "1" },
    { value: t("歷屆"), id: "2" },
  ];

  const queryCounty = countyArray.find(({ key }) => key === county);
  const countyKey = queryCounty ? removeSpace(queryCounty.key) : "all";

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

  return (
    <div className="pointer-events-none absolute top-0 mt-[50px] w-full md:mt-[80px]">
      <div className="pointer-events-auto flex items-center bg-[#e2e8f0] p-4 text-lg font-bold leading-none text-primary-bgMain">
        {currentTown ? (
          <>
            <CardSmall className="justify-center px-2 py-1">
              <>{t(currentCounty)}</>
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
      </div>

      {county && <div className="pointer-events-none relative h-[400px]"></div>}
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
          <div className="h-[120px] pr-4 pt-2">
            <SimpleChart
              data={parseSimpleChartData(allData, county, town)}
              labelY="%"
              dataKeyY="rate"
              dataKeyX="year"
              tooltipLabel={t("投票率")}
              tooltipPostFix={t("年")}
            />
          </div>
        </Card>
        <Card
          titleDivide
          className="rounded-b-lg"
          title={<p className="-mb-1 text-base">{t("歷屆投票數")}</p>}
        >
          <div className="h-[120px] px-4 pt-2">
            <NumberBars
              data={parseNumberBarsData(allData, county, town)}
              dataKeyY="number"
              dataKeyX="year"
              tooltipLabel={t("投票數")}
              tooltipPostFix={t("年")}
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
                <div className="pointer-events-auto mx-2 mb-3 grid grid-cols-4 gap-2">
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
                    <div className="pointer-events-auto mx-2 mb-3 grid grid-cols-4 gap-2">
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
  );
}
