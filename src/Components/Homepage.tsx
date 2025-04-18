import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import '../Styles/Homepage.css';
import { NewsSlider } from "./NewsSlider";
import {LANGUAGES} from '../Services/CONSTANTS.ts';
import { increaseAPICallCount } from "./MainComponent";
import { getLatestNews } from "../Services/api.services";
import defaultNewsImage from '../Images/news_card,jpg.jpg';
import { NewsDataQueryParamDTO, NewsDTO, NewsResponseDTO } from "../DTOS/NewsDTO";
import { SearchNews } from "./SearchNews.tsx";
import { Countries } from "./Countries.tsx";
import { Categories } from "./Categories.tsx";

export const Homepage = () => {
  const [country, setCountry]= useState<string>('in');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [category, setCategory]= useState<string>('world');
  const [newsData, setNewsData] = useState<NewsDTO[]>([])
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  /**
   * sets data for slider data when component mounts
   */
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  /**
   * fetches the data when language, search keyword, country, category is changed
   */
  useEffect(()=>{
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedLanguage,searchKeyword, country, category])


  const fetchData = async () => {
    try {
      const params: NewsDataQueryParamDTO = {
        language: selectedLanguage,
        removeduplicate : 1,
        country,
        category,
        size: '10'
      };
      
      if (nextPageToken) {
        params["page"] = nextPageToken;
      }
      if(searchKeyword){
        params['q']=searchKeyword;
      }

      const result: NewsResponseDTO = await getLatestNews(params);
      increaseAPICallCount();
      setNewsData(result?.results);
      if (result?.nextPage) {
        setNextPageToken(result?.nextPage);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("Error while fetching data in homepage.tsx");
      toast.error(err?.message || err?.response?.message || 'Error while fetching data in homepage')
      throw err;
    }
  };


  const handleLanguageChange=(eventParam: React.ChangeEvent<HTMLSelectElement>)=>{
     setSelectedLanguage(eventParam?.target?.value);
  }

  return (
    <div className="homepage-container">
      <div className="homepage-input-container">
        <select
          name="languages"
          className="language-select"
          onChange={handleLanguageChange}
        >
          {LANGUAGES.map((lang, index) => (
            <option
              className="language-option"
              key={`${index}-${lang?.code}-${lang.code}`}
              selected={selectedLanguage === lang?.code}
              value={lang.code}
            >
              {lang?.name}
            </option>
          ))}
        </select>

        <SearchNews setSearchKeywordProp={setSearchKeyword} />
        <Countries setCountryProp={setCountry} />
        <Categories setCategoryProp={setCategory} />
      </div>
      <NewsSlider newsDataProp={newsData} />
      <div className="news-cards-container">
        {newsData?.map((news: NewsDTO) => {
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


