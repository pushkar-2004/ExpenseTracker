import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ExpenseCard from "../Components/ExpenseCard";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {

  const [exp, setExp] = useState([]);
  const navigate = useNavigate();
  const [lastDate,setLastDate] = useState(null);

  useEffect(() => {
    getAllExp();
  }, []);

  async function getAllExp() {
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/exp/getAllExpenditure`;
      if(lastDate){
        url+=`?lastDate=${lastDate}`;
      }
      const result = await axios.get(
        url
      );
      const arr = result.data.data;
      // console.log(arr)
      // console.log(lastDate)
      if(arr.length>0){
        setExp(prev=>arr)
        const lastItem=arr[arr.length-1];
        setLastDate(lastItem.date)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      // console.log(id)
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/exp/deleteExpenditure/${id}`,
      );
      const arr = exp.filter((item) => {
        if (item._id != id) return true;
        else return false;
      });
      setExp(arr);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Expense Tracker</h2>

      <ul className="tracker-list">
        {exp.map((item) => (
          <li key={item._id} className="expense-row">
            <div className="expense-card-wrapper">
              <ExpenseCard item={item} />
            </div>

            <button
              className="update-btn"
              onClick={() => navigate(`/updateExpenditure/${item._id}`)}
            >
              Update
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={getAllExp}>
        Load More
      </button>
    </div>
  );
};

export default ExpenseTracker;
