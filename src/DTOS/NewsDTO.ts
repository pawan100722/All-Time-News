export interface NewsDataQueryParamDTO {
  language?: string;
  page?: string;
  size?: string | number;
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
