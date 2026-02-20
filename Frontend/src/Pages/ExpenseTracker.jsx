import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ExpenseCard from "../Components/ExpenseCard";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  
  const [exp, setExp] = useState([]);
  const navigate = useNavigate();

  const [lastDate, setLastDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );

  const [totalExp, setTotalExp] = useState(0);

  useEffect(() => {
    getAllExp();
  }, [lastDate]);

  async function getAllExp() {
    try {
      let temp = 0;
      let url = `${import.meta.env.VITE_API_URL}/api/exp/getAllExpenditure/?lastDate=${lastDate}`;
      const result = await axios.get(url);
      const arr = result.data.data;
      for (let i = 0; i < arr.length; i++) {
        temp += arr[i].amount;
      }
      setTotalExp(temp);
      setExp(arr);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleDelete(id) {
    try {
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
      <input
        type="date"
        name="lastDate"
        value={lastDate ? new Date(lastDate).toISOString().split("T")[0] : ""}
        onChange={(e)=>{setLastDate(e.target.value)}}
      />
      <ul className="tracker-list">
        {exp.length === 0 ? (
          <h3>No expenditure done </h3>
        ) : (
          exp.map((item) => (
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
          ))
        )}
      </ul>
      <h2>Total Expenditure is {totalExp}</h2>
    </div>
  );
};

export default ExpenseTracker;
