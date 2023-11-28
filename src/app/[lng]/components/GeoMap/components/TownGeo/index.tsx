import townGeoData from "@/public/townGeoData.json";
import { fillColorMapLight, fillColorMap } from "@/app/setting/color";
import { findHighestCandidate } from "@/app/utils/number";
import { removeSpace } from "@/app/utils/string";
import { t } from "i18next";
import { pathGenerator } from "../../setting";
import { TownGeoItemType } from "../../types";
import { InvoiceDataType } from "@/app/types";

type TownGeoProps = {
  data: { [key: string]: InvoiceDataType };
  zoom: string;
  hover: string;
  onMouseOver: (townName: string) => void;
  onMouseLeave: () => void;
};

export default function TownGeo({
  data,
  zoom,
  hover,
  onMouseOver,
  onMouseLeave,
}: TownGeoProps) {
  return (
    <g className={`${!zoom && "hidden"} ${!zoom && "pointer-events-none"}`}>
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
                onMouseOver={() => onMouseOver(town_en)}
                onMouseLeave={onMouseLeave}
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
  );
}
