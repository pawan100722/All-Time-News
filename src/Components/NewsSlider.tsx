import { useState, useEffect } from "react";
import { NewsDTO } from "../DTOS/NewsDTO";
import defaultNewsImage from "../Images/news_card,jpg.jpg";
import "../Styles/HomepageSlider.css";
import { LeftArrow } from "../Icons/LeftArrow";
import { RightArrow } from "../Icons/RightArrow";

export const NewsSlider = ({ newsDataProp }: NewsDataPropDTO) => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [sliderButtonClicked, setSliderButtonClicked] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sliderIntervalId, setSliderIntervalId] = useState<any>('');

  const next = () => {
    if(currentIndex===0 || currentIndex< newsDataProp.length){
    setCurrentIndex((prev) => prev +1);}else{ setCurrentIndex(0)}
  }

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  /**
   * It sets the slider auto move
   */
  useEffect(() => {
    let intervalId = NaN;
    if(!sliderButtonClicked){intervalId =setInterval(() => {
      next();
    }, 2000);
    setSliderIntervalId(intervalId);}
    return () => clearInterval(intervalId);
  }, [currentIndex]);



  /**
   * Decreases the current index by 1 and checks the minimum range i.e 0
   * To make the slide moves backward
   */
  const handlePrev=()=>{
    clearInterval(sliderIntervalId);
    setSliderButtonClicked(true);
    if(currentIndex===0){
      setCurrentIndex(newsDataProp.length);
    } else setCurrentIndex(prev=> prev-1);
  }

  /**
   * Increases the current index by one and checks if the index reaches maximum
   * To move the slide forward
   */
  const handleNext=()=>{
    clearInterval(sliderIntervalId);
    setSliderButtonClicked(true);
    if (currentIndex === newsDataProp.length) {
      setCurrentIndex(0);
    } else setCurrentIndex((prev) => prev + 1);
  }

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
      <div className="slider-icon-container">
        <div className=" slider-icon" onClick={handlePrev}>
          <LeftArrow />
        </div>
        <div className="slider-icon" onClick={handleNext}>
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

interface NewsDataPropDTO {
  newsDataProp: NewsDTO[];
}
