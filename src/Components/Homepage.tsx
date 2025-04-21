import { toast } from "react-toastify";
import "../Styles/Homepage.css";
import { NewsSlider } from "./NewsSlider";
import { useEffect, useRef, useState } from "react";
import { NewsCards } from "./NewsCards.tsx";
import { Countries } from "./Countries.tsx";
import { Categories } from "./Categories.tsx";
import { SearchNews } from "./SearchNews.tsx";
import { Language } from "./LanguageSelect.tsx";
import { CountryDTO } from "../DTOS/OtherDTO.ts";
import { increaseAPICallCount } from "./MainComponent";
import { getLatestNews } from "../Services/api.services";
import {
  NewsDataQueryParamDTO,
  NewsDTO,
  NewsResponseDTO,
} from "../DTOS/NewsDTO";
import { DataNotFound } from "./DataNotFound.tsx";

export const Homepage = () => {
  const isMounted = useRef(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);
  const [category, setCategory] = useState<string>("world");
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [country, setCountry] = useState<CountryDTO>({
    name: "India",
    code: "in",
  });

  /**
   * sets data for slider data when component mounts
   */
  useEffect(() => {
    console.log("initial effect");

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * fetches the data when language, search keyword, country, category is changed
   */
  useEffect(() => {
    if (isMounted.current) {
      fetchData();
    } else {
      isMounted.current = true;
    }
  }, [selectedLanguage, searchKeyword, country, category]);

  const fetchData = async () => {
    try {
      const params: NewsDataQueryParamDTO = {
        language: selectedLanguage,
        removeduplicate: 1,
        country: country?.code,
        category,
        size: "10",
      };

      if (nextPageToken) {
        params["page"] = nextPageToken;
      }
      if (searchKeyword) {
        params["q"] = searchKeyword;
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
      toast.error(
        err?.message + "  " + err?.response?.statusText ||
          "Error while fetching data in homepage"
      );
    }
  };

  const handleLanguageChange = (
    eventParam: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(eventParam?.target?.value);
  };

  const handleNextClick = async () => {
    await fetchData();
  };

  return (
    <div className="homepage-container">
      {newsData.length ? (
        <>
          <div className="homepage-input-container">
            <Language
              props={{
                selectedLanguageProp: selectedLanguage,
                handleLanguageSelectedProp: handleLanguageChange,
              }}
            />
            <Countries countryProp={country} setCountryProp={setCountry} />
            <SearchNews setSearchKeywordProp={setSearchKeyword} />
          </div>
          <Categories setCategoryProp={setCategory} />
          <NewsSlider newsDataProp={newsData} />
          <NewsCards props={{ newsData }} />

          <div className="next-container">
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
};
