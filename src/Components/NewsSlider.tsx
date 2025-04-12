import { useState, useEffect } from "react";
import { NewsDTO } from "../DTOS/NewsDTO";
import defaultNewsImage from "../Images/news_card,jpg.jpg";
import "../Styles/HomepageSlider.css";

export const NewsSlider = ({ newsDataProp }: NewsDataPropDTO) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const next = () => {
    if(currentIndex===0 || currentIndex< newsDataProp.length){
    setCurrentIndex((prev) => prev +1);}else{ setCurrentIndex(0)}
  }

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    const setIntervalId = setInterval(() => {
      next();
    }, 1500);
    return () => clearInterval(setIntervalId);
  }, [currentIndex]);

  return (
    <div className="news-slider-container">
      {newsDataProp?.map((news: NewsDTO) => {
        return (
          <a
            href={news?.link}
            key={news?.id}
            className="news-slider-card-container"
            target="_blank"
            style={{ transform: `translate(${-currentIndex * 100}%)` }}
          >
            <img
              key={`${news?.id}-${news?.image_url}-${Math.random()}`}
              src={news?.image_url || defaultNewsImage}
              alt={`News Image-${news.id}`}
              className="news-slider-card-image"
            />
            <h1
              key={`${news?.id}-${news?.title}`}
              className="news-slider-card-title"
            >
              {news?.title}
            </h1>
          </a>
        );
      })}
    </div>
  );
};

interface NewsDataPropDTO {
  newsDataProp: NewsDTO[];
}
