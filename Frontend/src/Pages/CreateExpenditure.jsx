import React, { useState } from "react";
import axios from "axios";
import "./CreateExpenditure.css"

const CreateExpenditure = () => {
  const [exp, setExp] = useState({
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    itemList: [],
  });

  const [temp, setTemp] = useState("");

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
      setTemp(e.target.value);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    try {
      setExp({ ...exp, itemList: [...exp.itemList, temp] });
      setTemp("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    try {
      if(exp.amount===0){
        return alert("amount cannot be zero")
      }
      if(exp.itemList.length===0){
        return alert("item list cannot be empty")
      }
      console.log("Submitting:", exp);
      const result = await axios.post(
        `http://localhost:3000/api/exp/createExpenditure`,
        exp,
      );
      // console.log(result)
      setExp({ ...exp, amount: 0, itemList: [] });
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  function handleRemoveItem(idx){
    try {
      const arr = exp.itemList.filter((item,ind)=>{
        if(ind==idx) return false;
        return true;
      });
      setExp({...exp,itemList:arr});
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
          value={exp.amount}
          name="amount"
          onChange={handleChange}
        />

        <label>Enter Item Name</label>
        <div className="item-row">
          <input type="text" value={temp} onChange={handleAddItem} />
          <button type="button" onClick={handleClick}>
            Add
          </button>
        </div>

        <button className="submit-btn">Submit</button>
      </form>

      <ul className="item-list">
        {exp.itemList.map((item, idx) => (
          <li key={idx} onClick={()=>handleRemoveItem(idx)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateExpenditure;
