import axios from 'axios';
import { CONSTANT } from './CONSTANTS';
import { NewsDataQueryParamDTO } from '../DTOS/NewsDTO';


export const getLatestNews= async(queryParams: NewsDataQueryParamDTO)=>{
  try{
    const url=`${CONSTANT.BASE_URL}/latest`;
    const params ={
      apiKey: CONSTANT.API_KEY,
      ...queryParams
    }
    const result = await axios.get(url,{params});
    return result?.data;
  }
  catch(err){
    console.log("error in api service getLatestNews():",err);
    
  }
}