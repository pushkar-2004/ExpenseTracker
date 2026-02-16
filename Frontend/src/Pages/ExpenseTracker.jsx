import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ExpenseCard from "../Components/ExpenseCard";

const ExpenseTracker = () => {
  const [exp, setExp] = useState([]);

  useEffect(() => {
    getAllExp();
  }, []);

  async function getAllExp() {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/exp/getAllExpenditure",
      );
      setExp(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Expense Tracker</h2>

      <ul className="tracker-list">
        {exp.map((item) => (
          <ExpenseCard item={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
