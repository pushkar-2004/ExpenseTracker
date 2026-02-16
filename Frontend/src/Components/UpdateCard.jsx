import React, { useEffect, useState } from "react";
import "./UpdateCard.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";



const UpdateCard = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    // console.log(id)

  const [data, setData] = useState({
    itemName: "",
    quantity: "",
    price: 0,
    status: "pending",
  });

  useEffect(()=>{
    updatedValues();
  },[]);

  async function updatedValues(){
    try {
        const result = await axios.get(`http://localhost:3000/api/getItemById/${id}`);
        setData(result.data.data);
        
    } catch (error) {
        console.log(error);
    }
  }

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
      const result = await axios.patch(
        `http://localhost:3000/api/updateItem/${id}`,
        data,
      );
      console.log(result.data.data)
      if(data.status=="purchased"){
        const result1 = await axios.patch(
          `http://localhost:3000/api/exp/updateExpenditure`,
          result.data.data
        );
      }
      navigate('/listItem');
    } catch (error) {
      console.log(`error occured1 ${error}`);
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
          type="string"
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

        <button type="submit">
           Submit
        </button>
      </form>
    </div>

  );
};

export default UpdateCard;
