import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../Components/Card';
import './ListItem.css'

const ListItem = () => {

    const [items,setItems] = useState([]);

    useEffect(()=>{
        getItems();
    },[]);

    async function getItems(){
        try {
            const result = await axios.get('http://localhost:3000/api/getItem');
            console.log(result.data.data);
            setItems(result.data.data)
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="card-container">
        <ul className="card-list">
            {items.map((item) => {
            return (
                <li key={item._id} className="card-item">
                <Card {...item} />
                </li>
            );
            })}
        </ul>
    </div>

  )
}

export default ListItem