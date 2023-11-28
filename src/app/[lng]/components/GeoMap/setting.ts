import { geoPath, geoMercator } from "d3-geo";

const projection = geoMercator().center([124.5, 23.4]).scale(4300);
export const pathGenerator: any = geoPath().projection(projection);
