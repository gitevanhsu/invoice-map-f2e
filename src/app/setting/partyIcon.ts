import { StaticImageData } from "next/image";
import green from "@/public/images/party_green.png";
import blue from "@/public/images/party_blue.png";
import orange from "@/public/images/party_orange.png";

export const partyIconMap: { [key: string]: StaticImageData } = {
  親民黨: orange,
  中國國民黨: blue,
  民主進步黨: green,
};
