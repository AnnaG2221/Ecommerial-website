import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./product.css";
import Item from './item'

function Product({product, admit}) {
  // console.log(props.info[0].image)
  return (
    <div className="productPage">

      <div className="firstRow">
        <h1> Products</h1>
        <select>
          <option value="lastAdded">Last added</option>
          <option value="lowToHigh"> Price: low to hight</option>
          <option value="highToLow">Price: high to low</option>
        </select>
       {admit && <Link to="/add">
          <button>Add Product</button>
        </Link>}
      </div>

      <div className="container">
        {product.map((i) => {
          // console.log(i._id)
          return (
           <Item  key={i._id} i={i}/>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
