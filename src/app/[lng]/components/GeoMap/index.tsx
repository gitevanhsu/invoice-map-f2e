"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import { useQueryState } from "next-usequerystate";
import { select } from "d3-selection";
import * as d3Transition from "d3-transition";
select.prototype.transition = d3Transition;

import countyGeoData from "@/public/countyGeoData.json";
import { useTranslation } from "@/app/i18n/client";
import { CountyGeoItemType } from "./types";
import { pathGenerator } from "./setting";

import { DataContext } from "../Providers";
import { CountyGeo, TownGeo } from "./components";

// Taiwan GeoMap
export default function GeoMap() {
  const { data, lng } = useContext(DataContext);
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
    <div className="max-w[650] relative h-full min-w-[350px] md:w-1/2">
      <svg
        className="absolute left-0 top-0 h-full w-full"
        viewBox="0 0 300 375"
        ref={svgRef}
        onClick={({ target }) => target === svgRef.current && handleZoomOut()}
      >
        <g ref={gRef}>
          <CountyGeo
            data={data}
            zoom={zoom}
            hover={hover}
            onClick={(item) => handleZoomIn(item)}
            onMouseOver={(id) => zoom || setHover(id)}
            onMouseLeave={() => setHover("")}
          />
          <TownGeo
            data={data}
            zoom={zoom}
            hover={hover}
            onMouseOver={(townName) => setHover(townName)}
            onMouseLeave={() => setHover("")}
          />
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
