import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import {MyContext} from '../MyContext';
import {useContext} from 'react'

function Item({i}) {
  const {cart, setCart, admit} = useContext(MyContext)
  // console.log(cart)
  return (
    <div className="product">
      <Link to={`/${i._id}`}>
        <img
          src={i.link}
          atl="img loading"
          width="218px"
          height="198px"
          key={i}
        />
        <p>{i.name}</p>
        <p>{'$'+i.price.toFixed(2)}</p>
      </Link>
      <div>
        <Button product={i}/>
        {admit && <Link to={`/edit/${i._id}`}>
          <button id="edit">Edit</button>
        </Link>}
      </div>
    </div>
  );
}

export default Item;
