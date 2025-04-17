export interface NewsDataQueryParamDTO {
  language?: string;
  removeduplicate:number;
  page?: string;
  size?: string | number;
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
