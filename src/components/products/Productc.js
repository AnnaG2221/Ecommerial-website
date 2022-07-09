import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./product.css";
import { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductDetails from './product '
// import ProductComponent from "./ProductComponent";

function Product() {

  const products = useSelector((state) => state.allProducts.products);
  // console.log(products[0].id)
  const dispatch = useDispatch();
  // const fetchProducts = async () => {
  //   const response = await axios
  //     .get("https://fakestoreapi.com/products")
  //     .catch((err) => {
  //       console.log("Err: ", err);
  //     });
  //     console.log(response.data)
  //   dispatch(setProducts(response.data));
  // };
  const fetchProducts = async() => {
    const res = await axios.get('http://localhost:8000/api/allPruducts').catch(err =>{
      console.log('Err: ', err);
    });
    // console.log(res.data)
    dispatch(setProducts(res.data))

  }

  useEffect(() => {
    fetchProducts();
    // console.log('render')
  },[]);

  // console.log('product:',products)


  return (
    <div className="productPage">

      <div className="firstRow">
        <h1> Products</h1>
        <select>
          <option value="lastAdded">Last added</option>
          <option value="lowToHigh"> Price: low to hight</option>
          <option value="highToLow">Price: high to low</option>
        </select>
        <Link to="/add">
          <button>Add Product</button>
        </Link>
      </div>

      <div className="container">
        {products.map((i) => {
          console.log(i._id)
          return (
            <div className="product" key={i.id}>
             <Link to='/{i._id}' >
              <img
                src={i.link}
                atl="img loading"
                width="218px"
                height="198px"
                key={i}
              />
               </Link>
              <p>{i.name}</p>
              <p>{i.price}</p>
              <div>
                <Button />
                <Link to="/edit">
                  <button id='edit'>Edit</button>
                </Link>
              </div>


            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
