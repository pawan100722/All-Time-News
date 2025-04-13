import { ToastContainer } from "react-toastify";
import { Homepage } from "./Homepage"

export const MainComponent=()=>{

  return <div className="main-component-container">
    <ToastContainer/>
  <Homepage/>
  </div>
}

export const increaseAPICallCount=()=>{
  const key ='apiCount';
  const count =localStorage.getItem(key);
  if(!count){
    localStorage.setItem(key,'1');
  } else{
    localStorage.setItem(key,`${Number(count)+1}`);
  }
}