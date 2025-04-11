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
