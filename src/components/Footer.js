import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import "./Footer.css";


//pagination component
const Footer = ({newArr,setnewArr,count,currentPageIndex,setcurrentPageIndex,searchArray,setsearchArray,}) => {

  const matches = useMediaQuery('(max-width:512px)');
  //function deletes multiple elemts at a time
  //clicking on delete all buttons appends the array by removing seleted records
  const deleteAllRecords = () => {
    const afterDeleting = newArr.filter((user) => user.isChecked !== true);
    const deletedAfterSearch = searchArray.filter(
      (user) => user.isChecked !== true
    );

    setnewArr(afterDeleting);
    setsearchArray(deletedAfterSearch);
  };

  return (
    
    <div className="admin-footer">
      {/* <button className="button-style" type="submit">
        Delete Selected
      </button> */}
      <Button className="button-style" variant="contained"  onClick={deleteAllRecords} >
      Delete Selected
      </Button>
      <Pagination
      size={`${matches ? "small" : ""}`}
      className="pagination"
       count={count}
      //  variant="outlined"
       color="primary"
        showFirstButton
        showLastButton
        page={
          currentPageIndex > count ? currentPageIndex - 1 : currentPageIndex
        }
        onChange={(event,value) => {
          setcurrentPageIndex(value);
        }}
      />
      </div>
    
  );
};

export default Footer;
