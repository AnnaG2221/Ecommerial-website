import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import "./head.css";
import "antd/dist/antd.css";
import {MyContext} from './MyContext';

const Head = ({success, setSuccess}) => {

  const {cartCount,setCart, setCartCount} = useContext(MyContext);
  // console.log(cartCount)
  const handleClick = () => {
    if (success) {
      setSuccess(false)
      localStorage.removeItem('User')
      setCartCount(0)
      setCart([])

    }
  }


  return (
    <div className="head">
      <div className="form-1">
        <div>
          <Link to="/">
            <span
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "white" }}
            >
              Anna's{" "}
            </span>
            <span style={{ fontSize: "0.5rem", color: "white" }}>store</span>
          </Link>
        </div>
        <div>
          <input type="text" placeholder="Search"></input>
        </div>
        <i
          style={{
            color: "rgb(164, 155, 155)",
            position: "relative",
            left: "-80px",
          }}
          className="fa-solid fa-magnifying-glass magnify"
        ></i>
        <div></div>
      </div>
      <div className="form-2">
        <i className="fa-solid fa-user"></i>
        <Link onClick={handleClick} to="/login" style={{ color: "white" }}>
          {success ? "Log out" : "Sign in"}
        </Link>
        <Link to = '/cart' style={{color:'white'}}>

        <i className="fa-solid fa-cart-shopping"></i>
        <span>{cartCount}</span>
        </Link>
      </div>
    </div>
  );
};

export default Head;
