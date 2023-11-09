import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import DrawerItem from "./DrawItem";
import { DrawerListProps } from "./types";

export default function DrawerList({ content, onClose }: DrawerListProps) {
  return (
    <div className="overflow-auto bg-primary">
      <div className="flex justify-end px-4 py-2">
        <div className="cursor-pointer" onClick={onClose}>
          <Icon path={mdiClose} size={1} />
        </div>
      </div>
      <div>
        {content.length > 0 && (
          <div className="h-full">
            {content.map((item) => (
              <DrawerItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
