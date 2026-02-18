import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../Components/Card';
import './ListItem.css'

const ListItem = (props) => {

    const [items,setItems] = useState([]);
    const [itemStatus,setItemStatus] = useState("pending");

    useEffect(()=>{
        getItems();
    },[]);

    async function getItems(){
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/getItem`);
            // console.log(result.data.data);
            setItems(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    

  return (
    <div className="card-container">
        <select name="itemStatus" id="itemStatus" value={itemStatus} onChange={(e)=>setItemStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="purchased">Purchased</option>
        </select>
        <ul className="card-list">
            {items.map((item,idx) => {
                // console.log(idx)
                // console.log(item)
                if(itemStatus=="all" || item.status==itemStatus){
                    return (
                        <li key={item._id} className="card-item">
                            <Card items={items} idx={idx} setItems={setItems}/>
                        </li>
                    );
                }
            })}
        </ul>
    </div>

  )
}

export default ListItem