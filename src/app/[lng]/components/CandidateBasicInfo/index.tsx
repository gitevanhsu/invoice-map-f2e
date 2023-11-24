import { bgColorMapLight, textColorMap, bgColorMap } from "@/app/setting/color";
import { Card, CardSmall } from "../ShareComponents";

type CandidateBasicInfoProps = {
  president: string;
  vicePresident: string;
  party: string;
  id: string;
  share: string;
  votes: string;
  win: boolean;
};

export default function CandidateBasicInfo({
  president,
  vicePresident,
  party,
  id,
  win,
  share,
  votes,
}: CandidateBasicInfoProps) {
  return (
    <Card className="flex flex-col items-center space-y-1 rounded-b-lg p-2">
      <>
        <CardSmall
          className="w-[80px] items-center py-1"
          bg={`${bgColorMapLight[party]}`}
        >
          <>
            <div
              className={`mr-[2px] flex h-3 w-3 items-center justify-center overflow-hidden rounded-full bg-white text-[10px] leading-3 ${textColorMap[party]}`}
            >
              {id}
            </div>
            <p className="text-xs leading-none text-white">{party}</p>
          </>
        </CardSmall>
        <p className="text-center text-[#475569]">
          <span className="font-semibold">{president}</span>
          <span className="mx-[2px] text-xs leading-none">/</span>
          <span className="text-xs leading-none">{vicePresident}</span>
        </p>
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
          {votes}票
        </p>
      </>
    </Card>
  );
}
