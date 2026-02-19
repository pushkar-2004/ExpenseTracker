import React, { useState } from "react";
import axios from "axios";
import "./CreateExpenditure.css";

const CreateExpenditure = () => {
  const [exp, setExp] = useState({
    amount: 0,
    date: new Date().toLocaleDateString("en-CA"),
    itemList: [],
  });

  const [temp, setTemp] = useState({
    item: "",
    amt: 0,
  });

  // const [flag, setFlag] = useState(true);

  function handleChange(e) {
    try {
      const { name, value } = e.target;
      setExp({ ...exp, [name]: value });
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddItem(e) {
    try {
      const { name, value } = e.target;
      setTemp({ ...temp, [name]: value });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    try {
      let lock = temp.amt && temp.amt != 0;
      let sum = 0;
      console.log(lock)
      for (let i = 0; i < exp.itemList.length && lock; i++) {
        const ele = exp.itemList[i];
        if (!ele.amt || ele.amt == 0) {
          lock = false;
          sum = 0;
        } else {
          sum += Number(ele.amt);
        }
      }
      console.log(sum)
      if (lock) {
        sum += Number(temp.amt);
      }
      console.log(sum)
      setExp((prev)=>({
        ...prev,
        itemList: [...prev.itemList, temp],
        amount: sum,
      }));

      setTemp({ ...temp, item: "", amt: 0 });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    try {
      
      if (exp.amount === "0" || exp.amount == "") {
        return alert("Enter the amount spend");
      }
      if (exp.itemList.length === 0) {
        return alert("item list cannot be empty");
      }
      
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/exp/createExpenditure`,
        exp,
      );
      
      setExp({ ...exp, amount: 0, itemList: [] });
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemoveItem(idx) {
    try {
      const arr = exp.itemList.filter((item, ind) => {
        if (ind == idx) return false;
        return true;
      });

      let lock = true;
      let sum = 0;
      for (let i = 0; i < arr.length && lock; i++) {
        const ele = arr[i];
        if (!ele.amt || ele.amt == 0) {
          lock = false;
          sum = 0;
        } else {
          sum += Number(ele.amt);
        }
      }
      
      setExp((prev)=>({
        ...prev,
        itemList: arr,
        amount: sum
      }));

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Expenditure</h2>

        <label>Enter Date</label>
        <input
          type="date"
          value={exp.date}
          name="date"
          onChange={handleChange}
        />

        <label>Enter Amount</label>
        <input
          type="number"
          value={exp.amount==0?"":exp.amount}
          name="amount"
          onChange={handleChange}
        />

        <label>Enter Item Name</label>
        <div className="item-row">
          <input
            type="text"
            value={temp.item}
            name="item"
            onChange={handleAddItem}
          />
          <input
            type="number"
            value={temp.amt==0?"":temp.amt}
            name="amt"
            onChange={handleAddItem}
          />
          <button type="button" onClick={handleClick}>
            Add
          </button>
        </div>

        <button className="submit-btn">Submit</button>
      </form>

      <ul className="item-list">
        {exp.itemList.map((item, idx) => (
          <li key={idx} onClick={() => handleRemoveItem(idx)}>
            {item.item + " " + (item.amt==0?"":item.amt)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateExpenditure;
