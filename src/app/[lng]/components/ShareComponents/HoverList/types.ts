export type ListItemProps = {
  id: string;
  title: JSX.Element;
  active?: boolean;
};

export type HoverListProps = {
  title: JSX.Element;
  content: Array<ListItemProps>;
};
