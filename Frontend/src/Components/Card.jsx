import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{props.itemName}</h3>
        <span className={`status ${props.status?.toLowerCase()}`}>
          {props.status}
        </span>
      </div>

      <div className="card-body">
        <p><strong>Quantity:</strong> {props.quantity}</p>
        <p><strong>Price:</strong> ₹{props.price}</p>
      </div>
    </div>
  );
};

export default Card;
