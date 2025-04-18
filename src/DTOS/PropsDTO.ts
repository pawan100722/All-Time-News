export interface SearchNewsPropDTO {
  setSearchKeywordProp:(val:string)=>void;
}

export interface CountriesPropDTO {
  setCountryProp: (val:string)=>void;
}

export interface CategoriesProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCategoryProp:(param: any)=>any;
}