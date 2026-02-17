import React from "react";
import "./Card.css";
import axios from "axios";
import { Link } from "react-router-dom";

async function handleItemDelete(id, items, setItems) {
  try {
    const result = await axios.delete(
      `http://localhost:3000/api/deleteItem/${id}`,
    );
    console.log(result);
    const arr = items.filter((item) => {
      if (item._id != id) {
        return true;
      }
      return false;
    });
    console.log(arr);
    setItems(arr);
  } catch (error) {
    console.log(error);
  }
}

const Card = (props) => {
  // console.log(props)
  const idx = props.idx;
  const item = props.items[idx];
  // console.log(item)
  return (
    <div className="card">
      <div className="card-header">
        <h3>{item.itemName}</h3>
        <span className={`status pending`}>{item.status}</span>
      </div>

      <div className="card-body">
        <p>
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p>
          <strong>Price:</strong> ₹{item.price}
        </p>

        <p>
          <button onClick={() => navigate(`/updateItem/${item._id}`)}>
            Update Item
          </button>
        </p>
        <p>
          <button
            onClick={() =>
              handleItemDelete(item._id, props.items, props.setItems)
            }
          >
            Delete Item
          </button>
        </p>
      </div>
    </div>
  );
};

export default Card;
