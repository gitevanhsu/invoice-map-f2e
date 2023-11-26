import { bgColorMapLight, textColorMap, bgColorMap } from "@/app/setting/color";
import { Card, CardSmall } from "../ShareComponents";
import { use } from "i18next";
import { useTranslation } from "@/app/i18n";

type CandidateBasicInfoProps = {
  president: string;
  vicePresident: string;
  party: string;
  id: string;
  share: string;
  votes: string;
  win: boolean;
  t: (str: string) => string;
};

export default function CandidateBasicInfo({
  president,
  vicePresident,
  party,
  id,
  win,
  share,
  votes,
  t,
}: CandidateBasicInfoProps) {
  return (
    <Card className="flex flex-grow flex-col items-center space-y-1 rounded-b-lg p-2 md:space-y-3">
      <>
        <CardSmall
          className="w-full items-center justify-center py-1 md:py-2"
          bg={`${bgColorMapLight[party]}`}
        >
          <>
            <div
              className={`mr-[2px] flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-white text-[10px] leading-3 md:text-base ${textColorMap[party]}`}
            >
              {id}
            </div>
            <p className="text-xs leading-none text-white md:text-base md:leading-none">
              {t(party)}
            </p>
          </>
        </CardSmall>
        <p className="text-center text-[#475569]">
          <span className="font-semibold md:text-2xl md:leading-none">
            {president}
          </span>
          <span className="mx-[2px] text-xs leading-none md:text-lg md:leading-none">
            /
          </span>
          <span className="text-xs leading-none md:text-lg md:leading-none">
            {vicePresident}
          </span>
        </p>
        <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:justify-between md:px-4">
          <p className="text-center">
            <span
              className={`text-2xl leading-none text-[#475569] ${
                win && `${bgColorMap[party]} rounded px-1 font-bold text-[#fff]`
              }`}
            >
              {share}
            </span>
            <span
              className={`ml-1 text-xs leading-none ${
                win && `${textColorMap[party]}`
              }`}
            >
              %
            </span>
          </p>
          <p className="text-center text-sm leading-none text-[#475569]">
            {votes} {t("票")}
          </p>
        </div>
      </>
    </Card>
  );
}
