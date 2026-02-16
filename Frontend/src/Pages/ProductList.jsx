import React, { useState } from "react";
import "./ProductList.css";
import axios from 'axios';

const ProductList = (e) => {

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
      // console.log(data)
    } catch (error) {
      console.log(`error occured ${error}`);
    }
  }

  return (

    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Add Item</h2>

        <strong>Item Name</strong>
        <input
          type="text"
          name="itemName"
          // placeholder="Item Name"
          value={data.itemName}
          onChange={handleChange}
        />

        <strong>Quantity</strong>
        <input
          type="text"
          name="quantity"
          value={data.quantity}
          onChange={handleChange}
        />

        <strong>Price</strong>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
        />
        
        <strong>Status</strong>
        <select name="status" id="status" onChange={handleChange} value={data.status}>
          <option value="pending">Pending</option>
          <option value="purchased">Purchased</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>

  );
};

export default ProductList;
