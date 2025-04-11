import { useEffect, useState } from "react";
import { getLatestNews } from "../Services/api.services";
import { NewsDataQueryParamDTO } from "../DTOS/NewsDTO";

export const Homepage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestNewsData, setLatNewsData] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");

  /**
   * sets the state variable with news data when component mounts
   */
  useEffect(() => {
    setNewsData();
  }, []);

  /**
   * Fetches the news data from api request
   * sets the data in state variable
   */
  const setNewsData = async () => {
    try {
      const params: NewsDataQueryParamDTO = { language: "en" };
      if(nextPageToken){
      params["page"] = nextPageToken;}
      params["size"] = 10;
      console.log('params are:::::', params);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await getLatestNews(params);

      setLatNewsData(result?.results);
      if (result?.nextPage) {
        setNextPageToken(result?.nextPage);
      }
    } catch (err) {
      console.log("error in Homepage.tsx fetchNewsData():", err);
    }
  };

  return (
    <div className="homepage-container">
      <div className="news-cards-container">
        {latestNewsData.map((news: any) => {
          return (
            <div key={news?.id}>
              <h1
                key={`${news?.id}-${news?.title}`}
                className="news-card-title"
              >
                {news?.title}
              </h1>
              <img
                key={`${news?.id}-${news?.image_url}`}
                src={news?.image_url}
                alt={`News Image-${news.id}`}
                className="news-card-image"
                width= '500px'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


