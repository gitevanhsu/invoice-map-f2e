import countyGeoData from "@/public/countyGeoData.json";
import {
  fillColorMapLight,
  fillColorMapDark,
  fillColorMap,
} from "@/app/setting/color";
import { findHighestCandidate } from "@/app/utils/number";
import { removeSpace } from "@/app/utils/string";
import { t } from "i18next";
import { pathGenerator } from "../../setting";
import { CountyGeoItemType } from "../../types";
import { InvoiceDataType } from "@/app/types";

type CountyGeoProps = {
  data: { [key: string]: InvoiceDataType };
  zoom: string;
  hover: string;
  onClick: (item: CountyGeoItemType) => void;
  onMouseOver: (id: string) => void;
  onMouseLeave: () => void;
};

export default function CountyGeo({
  data,
  zoom,
  hover,
  onClick,
  onMouseOver,
  onMouseLeave,
}: CountyGeoProps) {
  return (
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
              onClick={() => onClick(item)}
              onMouseOver={() => onMouseOver(item.properties.county_id)}
              onMouseLeave={onMouseLeave}
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
  );
}
