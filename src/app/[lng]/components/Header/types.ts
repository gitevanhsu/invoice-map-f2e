type LanguageListType = {
  id: string;
  title: JSX.Element;
  active: boolean;
};
export type HeaderProps = {
  languageList: Array<LanguageListType>;
  lng: string;
};
