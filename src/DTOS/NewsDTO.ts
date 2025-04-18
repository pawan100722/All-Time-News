export interface NewsDataQueryParamDTO {
  language: string;
  size: string | number;
  removeduplicate:number;
  country: string;
  category: string;
  page?: string;
  q?: string;
}

export interface NewsDTO{
  id: string;
  title:string;
  image_url: string;
  link:string;
}

export interface NewsResponseDTO {
  nextPage: string;
  results: NewsDTO[];
  status: string;
  totalResults:number;
}
