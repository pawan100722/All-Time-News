import { useEffect, useState } from "react";
import { getLatestNews } from "../Services/api.services";
import { NewsDataQueryParamDTO, NewsDTO } from "../DTOS/NewsDTO";
import defaultNewsImage from '../Images/news_card,jpg.jpg';
import '../Styles/Homepage.css'
import { NewsSlider } from "./NewsSlider";
import { increaseAPICallCount } from "./MainComponent";
import {toast} from 'react-toastify';

export const Homepage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [sliderData, setSliderData] = useState<NewsDTO[]>([]);

  /**
   * sets data for slider data when component mounts
   */
  useEffect(() => {
    fetchSliderData();
  }, []);

  /**
   * Sets the card data when data is fetched fro slider 
   * and next page token is received
   */
  useEffect(() => {
    fetchCardsData();
  }, [nextPageToken]);

  /**
   * Fetches the news data from api request
   * sets the slider data in state variable
   */
  const fetchSliderData = async () => {
    try {
      const result = await fetchData();
      setSliderData(result?.results);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.message ||
        err?.message ||
        "Error Occurred in API CAll for slider data";
      toast.error(message);
    }
  };

  /**
   * Fetches the news data from api request
   * sets the cards data in state variable
   */
  const fetchCardsData = async () => {
    try {
      const result = await fetchData();
      setCardsData(result?.results);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.message ||
        err?.message ||
        "Error Occurred in Cards DataAPI CAll";
      toast.error(message);
    }
  };

  const fetchData = async () => {
    try {
      const params: NewsDataQueryParamDTO = { language: "en" };
      if (nextPageToken) {
        params["page"] = nextPageToken;
      }
      params["size"] = 10;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await getLatestNews(params);
      increaseAPICallCount();
      if (result?.nextPage) {
        setNextPageToken(result?.nextPage);
      }
      return result;
    } catch (err) {
      console.log("Error while fetching data in homepage.tsx");
      throw err;
    }
  };

  return (
    <div className="homepage-container">
      <NewsSlider newsDataProp={sliderData} />
      <div className="news-cards-container">
        {cardsData.map((news: NewsDTO) => {
          return (
            <a
              href={news?.link}
              key={news?.id}
              className="each-news-card-container"
              target="_blank"
            >
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


