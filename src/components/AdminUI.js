import React, { useEffect, useState } from "react";
import { config } from "../App";
import axios from "axios";
import "./AdminUI.css";
import Footer from "./Footer.js";
import SearchBar from "./SearchBar";
import AdminTable from "./AdminTable";
const recordPerPage = 10;

const AdminUI = () => {
  const [data, setdata] = useState([]);
  const [searchArray, setsearchArray] = useState([]);
  const [currentPageIndex, setcurrentPageIndex] = useState(1);
  const [newArr, setnewArr] = useState([]);
  const [loading,setloading] = useState(0)
  let countpages = Math.ceil(newArr.length / recordPerPage);

  const arraySlice = (data, currentPageIndex, recordPerPage) => {
    let start_index = currentPageIndex * recordPerPage - recordPerPage;
    let end_index = currentPageIndex * recordPerPage - 1;
    const newdata = data.slice(start_index, end_index + 1);
    return newdata;
  };

  //get the data when page loads
  useEffect(() => {
    const fetchDetailsFromBackend = async () => {
      try {
        let fetchedData = await axios.get(`${config.endpoint}`);

        let arr = fetchedData.data;
        // setloading(1)
        setnewArr(arr);
        setsearchArray(arr);
      } catch (e) {
        alert("Error While Fetching The Data");
      }
      // setloading(0)
    };
    fetchDetailsFromBackend();
  }, []);

  //whenver the page number changes display the relevant data with respect to that page
  useEffect(() => {
    let pageIndex = currentPageIndex;
    if (pageIndex > countpages) {
      pageIndex = currentPageIndex - (currentPageIndex - countpages);
    }
    let newdata = arraySlice(newArr, pageIndex, recordPerPage);
    // console.log("re rendering");
    setdata(newdata);
    
  }, [currentPageIndex, newArr]);

  return (
  
  <div className="container">
      <SearchBar searchArray={searchArray} setnewArr={setnewArr} setloading={setloading}/>
      {(loading===0) && (<div>
        <AdminTable
        data={data}
        newArr={newArr}
        setnewArr={setnewArr}
        searchArray={searchArray}
        setsearchArray={setsearchArray}
      />
      <Footer
        newArr={newArr}
        setnewArr={setnewArr}
        count={countpages}
        currentPageIndex={currentPageIndex}
        setcurrentPageIndex={setcurrentPageIndex}
        searchArray={searchArray}
        setsearchArray={setsearchArray}
      />
      </div>)
     
    
      }
        {(loading===1 ) && 
        <div className="no-data">No data Found</div>
        }
    </div>
   
    
  );
};

export default AdminUI;
