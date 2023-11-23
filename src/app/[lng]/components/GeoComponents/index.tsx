"use client";
import { useRef, useState } from "react";
import { geoPath, geoMercator } from "d3-geo";
import Icon from "@mdi/react";
import { mdiRestart } from "@mdi/js";
import { select } from "d3-selection";
import * as d3Transition from "d3-transition";
select.prototype.transition = d3Transition;

import countyGeoData from "@/public/countyGeoData.json";
import townGeoData from "@/public/townGeoData.json";
import _invoiceData from "@/public/2023.json";
import { InvoiceType } from "@/app/types";
import { findHighestCandidate } from "@/app/utils/number";
import { backgroundColorMap } from "./setting";

const invoiceData = _invoiceData as InvoiceType;

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
const projection = geoMercator().center([124.5, 23.5]).scale(4300);
const pathGenerator: any = geoPath().projection(projection);
// Test
export default function GeoMap() {
  const [hover, setHover] = useState<string>("");
  const [zoom, setZoom] = useState<string>("");

  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  function handleZoomIn(geoItem: CountyGeoItemType) {
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
  }

  function handleZoomOut() {
    setZoom("");
    setHover("");
    select(gRef.current)
      .transition()
      .delay(100)
      .duration(750)
      .attr("transform", "translate(0,0)");
  }

  return (
    <div className="max-w[650] relative min-w-[350px] md:w-1/2">
      <svg
        className="h-full w-full"
        viewBox="0 0 300 400"
        ref={svgRef}
        onClick={({ target }) => target === svgRef.current && handleZoomOut()}
      >
        <g ref={gRef}>
          <g className={``}>
            {countyGeoData.features.map((item: CountyGeoItemType, index) => {
              if (!invoiceData) return null;
              const { county_id, county_en } = item.properties;
              const { candidate1, candidate2, candidate3 } =
                invoiceData[county_en.replaceAll(" ", "")];

              const candidate = findHighestCandidate(
                candidate1,
                candidate2,
                candidate3
              );
              const { id, share } = candidate;

              return (
                <path
                  key={index}
                  onClick={() => handleZoomIn(item)}
                  onMouseOver={() =>
                    zoom || setHover(item.properties.county_id)
                  }
                  onMouseLeave={() => setHover("")}
                  className={`stroke-white`}
                  d={pathGenerator(item)}
                  style={{
                    strokeWidth: zoom ? "0.1px" : "0.2px",
                    fill: backgroundColorMap[
                      `${id}${
                        county_id === hover
                          ? "-light"
                          : zoom && zoom !== county_en
                          ? "-dark"
                          : ""
                      }`
                    ],
                  }}
                />
              );
            })}
          </g>
          <g
            className={`${!zoom && "hidden"} ${!zoom && "pointer-events-none"}`}
          >
            {(townGeoData as { features: Array<TownGeoItemType> }).features.map(
              (item, index) => {
                const { county_en, town_en } = item.properties;
                if (county_en !== zoom) return null;

                const { candidate1, candidate2, candidate3 } =
                  invoiceData[county_en.replaceAll(" ", "")].detail![
                    town_en.replaceAll(" ", "")
                  ];
                const candidate = findHighestCandidate(
                  candidate1,
                  candidate2,
                  candidate3
                );
                const { id, share } = candidate;

                return (
                  <path
                    key={index}
                    onClick={() => {}}
                    onMouseOver={() => setHover(town_en)}
                    onMouseLeave={() => setHover("")}
                    className="stroke-white stroke-[0.2]"
                    d={pathGenerator(item)}
                    style={{
                      fill: backgroundColorMap[
                        `${id}${town_en === hover ? "-light" : ""}`
                      ],
                    }}
                  />
                );
              }
            )}
          </g>
        </g>
      </svg>
      <div
        className="absolute bottom-5 right-5 rounded-lg border"
        onClick={handleZoomOut}
      >
        <Icon path={mdiRestart} size={1} />
      </div>
    </div>
  );
}
