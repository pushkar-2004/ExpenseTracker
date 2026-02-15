import React, { useState } from "react";
import "./ProductList.css";
import axios from 'axios';

const ProductList = () => {

  const [data, setData] = useState({
    itemName: "",
    quantity: "",
    price: 0,
    status: "pending",
  });

  function handleChange(e) {
    try {
      setData({ ...data, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/api/createItem",
        data,
      );
      setData({
        itemName:"",
        quantity:"",
        price: 0,
        status: "pending",
      });
      console.log(data)
    } catch (error) {
      console.log(`error occured ${error}`);
    }
  }

  return (

    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Add Item</h2>

        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={data.itemName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={data.quantity}
          onChange={handleChange}
        />

        

        <button type="submit">Submit</button>
      </form>
    </div>

  );
};

export default ProductList;
