import React from "react";
import "./Card.css";
import axios from "axios";
import { Link } from 'react-router-dom'

async function handlePurchased(props){
  try {
    const item=props.items[props.idx];
    const id = item._id;
    const url = `http://localhost:3000/api/updateItem/${id}`;
    const result = await axios.patch(
      url,
      {
        status:"purchased"
      }
    );
    const arr = props.items.map((item,idx)=>{
      if(idx==props.idx){
        item.status="purchased";
      }
      return item;
    })
    props.setItems(arr);

  } catch (error) {
    console.log(error);
  }
}

const Card = (props) => {
  // console.log(props)
  const idx=props.idx;
  const item=props.items[idx];
  // console.log(item)
  return (
    <div className="card">
      <div className="card-header">
        <h3>{item.itemName}</h3>
        <span className={`status pending`}>
          {item.status}
        </span>
      </div>

      <div className="card-body">
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Price:</strong> ₹{item.price}</p>
        {/* <p><button onClick={()=>handlePurchased(props)}>
          <Link to='/'>Purchased</Link>
        </button></p> */}
        {/* {item.status === "pending" && (
          <p>
            <button onClick={() => handlePurchased(props)}>
              Purchased
            </button>
          </p>
        )} */}
        <p>
          <button>
            <Link to={`/updateItem/${item._id}`} >Update Card</Link>
          </button>
        </p>
      </div>


    </div>
  );
};

export default Card;
