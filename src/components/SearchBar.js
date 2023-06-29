import React, { useEffect, useState } from "react";
import "./SearchBar.css";
//Search component which displays the result of search
const SearchBar = ({ searchArray, setnewArr,setloading }) => {
  //Displays searched elements after filtering through the array
  const performSearch = (e) => {
    let value = e.target.value;
    const arrayAfterSearch = searchArray.filter(
      (ele) =>
        ele.name.toLowerCase().includes(value.toLowerCase()) ||
        ele.role.toLowerCase().includes(value.toLowerCase()) ||
        ele.email.toLowerCase().includes(value.toLowerCase()) ||
        ele.id.toLowerCase().includes(value.toLowerCase())
    );
    setnewArr(arrayAfterSearch);
    if(arrayAfterSearch.length===0){
      setloading(1)
    }
    else{
      setloading(0)
    }
  };

  return (
    <input 
      className="search-bar"
      type="search"
      placeholder="Search by name,email or role"
      onChange={(e) => {
        performSearch(e);
      }}
    />
  );
};

export default SearchBar;
