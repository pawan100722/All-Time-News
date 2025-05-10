import { NewsDTO } from "../DTOS/NewsDTO";
import { NewsCardsProp } from "../DTOS/PropsDTO";
import defaultNewsImage from "../Images/news_card,jpg.jpg";

export const NewsCards = ({ props }: NewsCardsProp) => {
  const { newsData } = props;
  return (
    <div className="news-cards-container" id="scrollableDiv">
      {newsData?.map((news: NewsDTO) => {
        return (
          <a
            href={news?.link}
            key={`${news?.id}-${Math.random()}-${news?.image_url}`}
            className="each-news-card-container"
            target="_blank"
          >
            <img
              // key={`${news?.id}-${news?.image_url}-${Math.random()}`}
              src={news?.image_url || defaultNewsImage}
              alt={`News Image-${news.id}`}
              className="news-card-image"
            />
            <h1
              // key={`${news?.id}-${news?.title}--${Math.random()}`}
              className="news-card-title"
            >
              {news?.title}
            </h1>
          </a>
        );
      })}
    </div>
  );
};
