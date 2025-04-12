import { useEffect, useState } from "react";
import { getLatestNews } from "../Services/api.services";
import { NewsDataQueryParamDTO, NewsDTO } from "../DTOS/NewsDTO";
import defaultNewsImage from '../Images/news_card,jpg.jpg';
import '../Styles/Homepage.css'
import { NewsSlider } from "./NewsSlider";

export const Homepage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestNewsData, setLatNewsData] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [sliderData, setSliderData] = useState<any[]>([])

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
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await getLatestNews(params);
      const sliderData = result?.results?.splice(0,5)
      setLatNewsData(result?.results);
      setSliderData(sliderData)
      if (result?.nextPage) {
        setNextPageToken(result?.nextPage);
      }
    } catch (err) {
      console.log("error in Homepage.tsx fetchNewsData():", err);
    }
  };

  return (
    <div className="homepage-container">
        <NewsSlider newsDataProp={sliderData}/>
      <div className="news-cards-container">
        {latestNewsData.map((news: NewsDTO) => {
          return (
            <a href={news?.link} key={news?.id} className="each-news-card-container" target="_blank">
              <img
                key={`${news?.id}-${news?.image_url}`}
                src={news?.image_url || defaultNewsImage}
                alt={`News Image-${news.id}`}
                className="news-card-image"
              />
              <h1
                key={`${news?.id}-${news?.title}`}
                className="news-card-title"
              >
                {news?.title}
              </h1>
            </a>
          );
        })}
      </div>
    </div>
  );
};


