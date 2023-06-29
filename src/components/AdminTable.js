import React, { useState } from "react";
import Editrow from "./Editrow.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { red } from '@mui/material/colors';
import "./AdminTable.css";
//component to display admin data pagewise
const AdminTable = ({data,newArr,setnewArr,searchArray,setsearchArray,}) => {
  const [selectedId, setselectedId] = useState(-1);

  //function is called whenever user clicks on the checkbox
  //returns modified array which has newpropery isChecked
  const handleCheckBox = (e) => {
    const { name, checked } = e.target;

    if (name === "selectall") {
      let allCheckedUser = data.map((user) => {
        return { ...user, isChecked: checked };
      });

      let checkedUser = newArr.map((user, index) => {
        let selectedData = allCheckedUser.find((item) => {
          return item.id === user.id;
        });
        if (selectedData) {
          return selectedData;
        } else {
          return user;
        }
      });

      let searchedCheckedUser = searchArray.map((user, index) => {
        let selectedData = allCheckedUser.find((item) => {
          return item.id === user.id;
        });

        if (selectedData) {
          return selectedData;
        } else {
          return user;
        }
      });

      setnewArr(checkedUser);
      setsearchArray(searchedCheckedUser);
    } else {
      let checkedUser = newArr.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      let searchedCheckedUser = searchArray.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      
      setnewArr(checkedUser);
      setsearchArray(searchedCheckedUser);
    }
  };


  //when the user clicks on delete icon function gets called
  //return array excluding deleted elements
  const deleteSelected = (id) => {
    const newRecord = newArr.filter((record) => record.id !== id);
    const recordAfterDelete = searchArray.filter((record) => record.id !== id);

    setnewArr(newRecord);
    setsearchArray(recordAfterDelete);
  };

  

console.log(data)
  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead className="table-header">
          <tr>
            <th>
              <input
                className="checkbox"
                type="checkbox"
                name="selectall"
                checked={
                  data.filter((user) => user?.isChecked !== true).length < 1
                }
                onChange={handleCheckBox}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        
          { data.map((item) => {
            
            return (
              <>
                {selectedId === item.id ? (
                  <Editrow
                    item={item}
                    newArr={newArr}
                    setnewArr={setnewArr}
                    setselectedId={setselectedId}
                    setsearchArray={setsearchArray}
                    searchArray={searchArray}
                  />
                ) : (
                  <tr key={item.id} className={item.isChecked ? "selected" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        name={item.name}
                        checked={item?.isChecked || false}
                        onChange={handleCheckBox}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                    <EditCalendarOutlinedIcon
                        onClick={() => setselectedId(item.id)}
                      />
                      <DeleteOutlineOutlinedIcon
                      sx={{ color: red[500] }}
                     
                        onClick={() => deleteSelected(item.id)}
                      />
                       </td>
                  </tr>
                )}
              </>
            );
          })
        
       }
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
