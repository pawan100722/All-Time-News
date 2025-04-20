import { EmptyFolderIcon } from '../Icons/EmptyFolder';
import '../Styles/DataNotFound.css'

export const DataNotFound=()=>{
  return (
    <div className="data-not-found-container">
      <div className="data-not-found-icon">
        <EmptyFolderIcon />
      </div>
      <h1 className="data-not-found-text">No Data Found</h1>
    </div>
  );
}