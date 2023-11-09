export type DrawerListProps = {
  content: Array<ItemProps>;
  onClose: () => void;
};
export type ItemProps = {
  id: string;
  title: JSX.Element;
  icon?: JSX.Element;
  active?: boolean;
  subList?: Array<ItemProps>;
};
