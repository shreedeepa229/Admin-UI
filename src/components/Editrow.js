import React, { useEffect, useState } from "react";
 import "./Editrow.css";
 import Button from '@mui/material/Button';


//Displays the view with update button when user clicks on edit icon
const Editrow = ({item,newArr,setnewArr,setselectedId,setsearchArray,searchArray,}) => {
  const [updateUserData, setupdateUserData] = useState(item);

  //function checks whether the filed is empty or not
  //return boolean value
  const validateInput = () => {
    for (let userItem in updateUserData) {
      if (updateUserData[userItem] === "") {
        return false;
      }
    }
    return true;
  };

  //updates the array with new elemets
  //onclicking the update button new element will be added to the array
  const handleUpdate = () => {
    let result = validateInput();
    if (!result) {
      alert("Field should not be empty");
    } else {
      const newData = newArr.map((records) => {
        if (records.id === item.id) {
          return { ...updateUserData };
        } else {
          return records;
        }
      });

      const dataAfterSearch = searchArray.map((records) => {
        if (records.id === item.id) {
          return { ...updateUserData };
        } else {
          return records;
        }
      });
     
      setnewArr(newData);
      setsearchArray(dataAfterSearch);
    }
    setselectedId(-1);
  };

  const handleInputChange = (e) => {
    setupdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          className="input-style"
          type="text"
          name="name"
          value={updateUserData.name}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="input-style"
          type="text"
          name="email"
          value={updateUserData.email}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="input-style"
          type="text"
          name="role"
          value={updateUserData.role}
          onChange={handleInputChange}
        />
      </td>

      <td>
        {/* <button
          type="submit"
          onClick={handleUpdate}
        >
          update
        </button> */}
        <Button color="primary" variant="contained"  onClick={handleUpdate} >
      UPDATE
      </Button>
      </td>

     
    </tr>
  );
};

export default Editrow;
// {(e) => {
//   handleUpdate(e, item.id);
// }}