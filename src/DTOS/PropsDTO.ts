import { NewsDTO } from "./NewsDTO";
import { CountryDTO } from "./OtherDTO";

export interface SearchNewsPropDTO {
  setSearchKeywordProp: (val: string) => void;
}

export interface CountriesPropDTO {
  countryProp: CountryDTO;
  setCountryProp: (val: CountryDTO) => void;
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
