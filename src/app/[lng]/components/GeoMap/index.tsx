"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { geoPath, geoMercator } from "d3-geo";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { useQueryState } from "next-usequerystate";
import { select } from "d3-selection";
import * as d3Transition from "d3-transition";
select.prototype.transition = d3Transition;

import {
  fillColorMap,
  fillColorMapDark,
  fillColorMapLight,
} from "@/app/setting/color";
import countyGeoData from "@/public/countyGeoData.json";
import townGeoData from "@/public/townGeoData.json";
import { InvoiceType } from "@/app/types";
import { findHighestCandidate } from "@/app/utils/number";
import { removeSpace } from "@/app/utils/string";
import { useTranslation } from "@/app/i18n/client";

type CountyGeoItemType = {
  type: string;
  properties: {
    county_en: string;
    county: string;
    county_id: string;
    area: number;
    sort: number;
  };
  geometry: { type: string; coordinates: number[][][][] };
  id: string;
};

type TownGeoItemType = CountyGeoItemType & {
  properties: { town_en: string; town: string };
};

const projection = geoMercator().center([124.5, 23.4]).scale(4300);
const pathGenerator: any = geoPath().projection(projection);

// Taiwan GeoMap
export default function GeoMap({
  data,
  lng,
}: {
  data: InvoiceType;
  lng: string;
}) {
  const [county, setCounty] = useQueryState("county");
  const [town, setTown] = useQueryState("town");
  const { t } = useTranslation(lng, "info-sheet");

  const [hover, setHover] = useState<string>("");
  const [zoom, setZoom] = useState<string>("");

  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  const handleZoomIn = useCallback(
    function handleZoomIn(geoItem: CountyGeoItemType) {
      setCounty(geoItem.properties.county_en);
      setTown(null);
      setZoom(geoItem.properties.county_en);
      const bounds = pathGenerator.bounds(geoItem);
      const dx = bounds[1][0] - bounds[0][0];
      const dy = bounds[1][1] - bounds[0][1];

      const x = (bounds[0][0] + bounds[1][0]) / 2;
      const y = (bounds[0][1] + bounds[1][1]) / 2;

      const scale = 0.9 / Math.max(dx / 300, dy / 400);
      const translate = [300 / 2 - scale * x, 400 / 2 - scale * y];
      select(gRef.current)
        .transition()
        .duration(750)
        .attr("transform", `translate(${translate}) scale(${scale})`);
    },
    [setCounty, setTown]
  );

  const handleZoomOut = useCallback(
    function handleZoomOut() {
      setCounty(null);
      setTown(null);
      setZoom("");
      setHover("");
      select(gRef.current)
        .transition()
        .delay(100)
        .duration(750)
        .attr("transform", "translate(0,0)");
    },
    [setCounty, setTown]
  );

  useEffect(() => {
    if (county) {
      const target = countyGeoData.features.find(
        ({ properties: { county_en } }) => county_en === county
      );
      if (target) handleZoomIn(target);
    } else {
      handleZoomOut();
      setTown(null);
    }
  }, [county, handleZoomIn, handleZoomOut, setTown]);

  return (
    <div className="max-w[650] relative min-w-[350px] md:w-1/2">
      <svg
        className="h-full max-h-[800px] w-full"
        viewBox="0 0 300 375"
        ref={svgRef}
        onClick={({ target }) => target === svgRef.current && handleZoomOut()}
      >
        <g ref={gRef}>
          <g>
            {countyGeoData.features.map((item: CountyGeoItemType, index) => {
              if (!data) return null;
              const { county_id, county_en, county } = item.properties;
              const { candidate1, candidate2, candidate3 } =
                data[removeSpace(county_en)];

              const candidate = findHighestCandidate(
                candidate1,
                candidate2,
                candidate3
              );
              const { party } = candidate;
              const bounds = pathGenerator.bounds(item);
              const x = (bounds[0][0] + bounds[1][0]) / 2;
              const y = (bounds[0][1] + bounds[1][1]) / 2;
              return (
                <g key={index} className="relative">
                  <path
                    onClick={() => handleZoomIn(item)}
                    onMouseOver={() =>
                      zoom || setHover(item.properties.county_id)
                    }
                    onMouseLeave={() => setHover("")}
                    className={`cursor-pointer stroke-white ${
                      county_id === hover
                        ? fillColorMapLight[party]
                        : zoom && zoom !== county_en
                        ? fillColorMapDark[party]
                        : fillColorMap[party]
                    }`}
                    d={pathGenerator(item)}
                    style={{
                      strokeWidth: zoom ? "0.1px" : "0.3px",
                    }}
                  />
                  {!zoom && (
                    <text
                      x={x}
                      y={y}
                      className="pointer-events-none fill-black text-[0.4em] leading-none"
                      textAnchor="middle"
                    >
                      {t(county)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
          <g
            className={`${!zoom && "hidden"} ${!zoom && "pointer-events-none"}`}
          >
            {(townGeoData as { features: Array<TownGeoItemType> }).features.map(
              (item, index) => {
                const { county_en, town_en, town } = item.properties;
                if (county_en !== zoom) return null;

                const { candidate1, candidate2, candidate3 } =
                  data[removeSpace(county_en)].detail![removeSpace(town_en)];
                const candidate = findHighestCandidate(
                  candidate1,
                  candidate2,
                  candidate3
                );
                const { party } = candidate;
                const bounds = pathGenerator.bounds(item);
                const x = (bounds[0][0] + bounds[1][0]) / 2;
                const y = (bounds[0][1] + bounds[1][1]) / 2;
                return (
                  <g key={index}>
                    <path
                      onClick={() => {}}
                      onMouseOver={() => setHover(town_en)}
                      onMouseLeave={() => setHover("")}
                      className={`stroke-white stroke-[0.1] ${
                        town_en === hover
                          ? fillColorMapLight[party]
                          : fillColorMap[party]
                      }`}
                      d={pathGenerator(item)}
                    />
                    {zoom && (
                      <text
                        x={x}
                        y={y}
                        className="pointer-events-none fill-black text-[0.09em] leading-none"
                        textAnchor="middle"
                      >
                        {t(town)}
                      </text>
                    )}
                  </g>
                );
              }
            )}
          </g>
        </g>
      </svg>
      {zoom && (
        <div
          className="absolute right-5 top-14 flex cursor-pointer items-center rounded-lg border bg-white p-2 pl-1 md:top-5"
          onClick={handleZoomOut}
        >
          <Icon path={mdiChevronLeft} size={1} color={"#475569"} />
          <p className="text-base font-medium leading-none text-primary-bgMain">
            {t("返回全國")}
          </p>
        </div>
      )}
    </div>
  );
}
