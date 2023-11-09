import Icon from "@mdi/react";
import { mdiWeb } from "@mdi/js";

import { HoverList } from "../ShareComponents";
import { HeaderProps } from "./types";

export default function DeskHeader({ languageList }: HeaderProps) {
  return (
    <header className="hidden h-[45px] items-center justify-between bg-primary px-4 py-2 md:flex">
      <p>Header</p>
      <div>
        <HoverList
          title={
            <div className="px-4 py-2">
              <Icon path={mdiWeb} size={1} />
            </div>
          }
          content={languageList}
        />
      </div>
    </header>
  );
}
