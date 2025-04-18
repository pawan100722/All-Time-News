import { ToastContainer } from "react-toastify";
import '../Styles/MainComponent.css';
import { Homepage } from "./Homepage";

export const MainComponent=()=>{

  return <div className="main-component-container">
    <ToastContainer/>
  <Homepage/>
  </div>
}

export const increaseAPICallCount=()=>{
  const key ='apiCount';
  const count =sessionStorage.getItem(key);
  if(!count){
    sessionStorage.setItem(key,'1');
  } else{
    sessionStorage.setItem(key,`${Number(count)+1}`);
  }
}