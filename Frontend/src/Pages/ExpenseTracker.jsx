import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ExpenseTracker.css";
import ExpenseCard from "../Components/ExpenseCard";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const [exp, setExp] = useState([]);
  const navigate = useNavigate();
  const [lastDate, setLastDate] = useState("");
  const [hover, setHover] = useState(false);
  const [totalExp, setTotalExp] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    getAllExp();
  }, [lastDate, page,selectedMonth]);

  async function getAllExp() {
    try {
      let temp = 0;
      let url = `${import.meta.env.VITE_API_URL}/api/exp/getAllExpenditure/?page=${page}&limit=${limit}`;

      if (lastDate) {
        url += `&lastDate=${lastDate}`;
      }

      if (selectedMonth) {
        const [year, month] = selectedMonth.split("-");
        url += `&month=${month}&year=${year}`;
      }

      const result = await axios.get(url);
      setTotalPages(result.data.pagination.totalPages);
      const arr = result.data.data;
      for (let i = 0; i < arr.length; i++) {
        temp += arr[i].amount;
      }
      // arr.sort((a, b) => {
      //   if (a.date >= b.date) return -1;
      //   else return 1;
      // });
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
        onChange={(e) => {
          setLastDate(e.target.value);
          setPage(1);
        }}
      />
      <h4>Select Month</h4>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(e.target.value);
          setLastDate(""); // reset day filter
          setPage(1);
        }}
      />
      <div
        onClick={() => {
          setLastDate("");
          setSelectedMonth("");
          setPage(1);
        }}
        style={{
          color: hover ? "red" : "black",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Click show all expenditure
      </div>
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
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <h2>Total Expenditure is {totalExp}</h2>
    </div>
  );
};

export default ExpenseTracker;
