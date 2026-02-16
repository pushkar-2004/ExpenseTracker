import React, { useState } from "react";
import "./ExpenseCard.css";

const ExpenseCard = (props) => {
  const [showItem, setShowItem] = useState(false);

  return (
    <li
      className="expense-card"
      onClick={() => setShowItem(prev => !prev)}
    >
      <div className="expense-header">
        <div className="expense-date">
          {new Date(props.item.createdAt).toLocaleDateString("en-GB")}
        </div>

        <div className="expense-amount">
          ₹ {props.item.amount}
        </div>
      </div>

      {showItem && (
        <div className="expense-items">
          {props.item.itemList?.map((itm, idx) => ( // optionalChaining
            <div key={idx} className="expense-item">
              • {itm.itemName + " ₹" + itm.price}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default ExpenseCard;
