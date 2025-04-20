import { LanguageSelectProp } from "../DTOS/PropsDTO";
import { LANGUAGES } from "../Services/CONSTANTS"

export const Language = ({props}:LanguageSelectProp) => {
  const {
    selectedLanguageProp: selectedLanguage,
    handleLanguageSelectedProp: handleLanguageChange,
  } = props;
  
  return <select
    name="languages"
    className="language-select"
    onChange={handleLanguageChange}
    defaultValue='en'
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
  </select>;
};