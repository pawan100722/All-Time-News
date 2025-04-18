import { useState } from "react";
import { COUNTRIES } from "../Services/CONSTANTS";
import '../Styles/Countries.css';
import { CountriesPropDTO } from "../DTOS/PropsDTO";
import { CountryDTO } from "../DTOS/OtherDTO";

export const Countries = ({ countryProp,setCountryProp }: CountriesPropDTO) => {
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModuleOpen((prev) => !prev);
  };

  const handleCountryClick = (countryParam: CountryDTO) => {
    setCountryProp(countryParam?.code);
    setIsModuleOpen((prev) => !prev);
  };

  return (
    <div className="countries-container">
      <button className="select-country" onClick={handleClick}>
        {countryProp}
      </button>
      <div className={`country-list-container ${isModuleOpen ? "scale" : ""}`}>
        {COUNTRIES.map((country: CountryDTO, indx: number) => (
          <div
            onClick={() => handleCountryClick(country)}
            className="country-list-item"
            key={`${indx}-${country.name}-${country?.code}`}
          >
            {country?.name}
          </div>
        ))}
      </div>
    </div>
  );
};