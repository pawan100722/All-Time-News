import { NewsDTO } from "./NewsDTO";

export interface SearchNewsPropDTO {
  setSearchKeywordProp: (val: string) => void;
}

export interface CountriesPropDTO {
  countryProp: string;
  setCountryProp: (val: string) => void;
}

export interface CategoriesProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCategoryProp: (param: any) => any;
}

export interface LanguageSelectProp {
  props: {
    selectedLanguageProp: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleLanguageSelectedProp: (param: any) => void;
  };
}

export interface NewsCardsProp {
  props: { newsData: NewsDTO[] };
}
