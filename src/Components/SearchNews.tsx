import { useEffect, useState } from 'react';
import '../Styles/SearchNews.css';
import { SearchIcon } from '../Icons/SearchIcon';
import { SearchNewsPropDTO } from '../DTOS/PropsDTO';

export const SearchNews=({setSearchKeywordProp}: SearchNewsPropDTO)=>{

  const [inputText, setInputText] = useState<string>('');
  const [timeoutId, setTimeoutId] = useState<number>(NaN);

  const handleInputChange=(eventParam: React.ChangeEvent<HTMLInputElement>)=>{
    setInputText(eventParam?.target?.value);
  }
  
  useEffect(()=>{
    clearTimeout(timeoutId);
    const id = setTimeout(()=>{
      setSearchKeywordProp(inputText);
    },1000);
    setTimeoutId(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputText])

  return <div className="search-news-container">
    <div className="search-icon">
      <SearchIcon/>
    </div>
  <input type="text" className="search-input" placeholder='Search News Topics...' onChange={handleInputChange}/>
  </div>
}