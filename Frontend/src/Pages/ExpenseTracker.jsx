import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ExpenseCard from "../Components/ExpenseCard";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const [exp, setExp] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllExp();
  }, []);

  async function getAllExp() {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/exp/getAllExpenditure",
      );
      setExp(result.data.data);
      // console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      // console.log(id)
      const result = await axios.delete(
        `http://localhost:3000/api/exp/deleteExpenditure/${id}`,
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

  async function handleUpdate(){
    try {
      
    } catch (error) {
      
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
    </div>
  );
};

export default ExpenseTracker;
