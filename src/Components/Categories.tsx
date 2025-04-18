import '../Styles/Categories.css';
import { CATEGORIES } from "../Services/CONSTANTS";
import { CategoriesProp } from '../DTOS/PropsDTO';

export const Categories=({setCategoryProp}: CategoriesProp)=>{

  const handleCategoryClick=(categoryParam: string)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCategoryProp(categoryParam);
  };

  return <div className="categories-container">
  {
    CATEGORIES.map((category: string, indx: number)=><div onClick={()=>handleCategoryClick(category)} key={`${indx}-${category}`} className="category-item">{category}</div>)
  }
  </div>
}