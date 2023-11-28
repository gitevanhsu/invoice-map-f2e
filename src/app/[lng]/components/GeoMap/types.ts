export type CountyGeoItemType = {
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

export type TownGeoItemType = CountyGeoItemType & {
  properties: { town_en: string; town: string };
};
