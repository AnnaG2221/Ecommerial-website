import React from "react";
// import './button.css'
import {  useRef } from "react";
import { MyContext } from "../MyContext";
import { useContext } from "react";

function Button({ product }) {
  const minors = useRef();
  const num = useRef();
  const add = useRef();
  const { cart, setCart, setCartCount } = useContext(MyContext);


  var quantity = 0;

  let cartNumber = 0;
  if (cart.length !== 0){
    cart.forEach((e) => (cartNumber += e.cartQuantity));
    setCartCount(cartNumber);

  }

  const index = cart.findIndex((item) => {
    return item._id === product._id;
  });


  if (index >= 0) {
    quantity = cart[index].cartQuantity;
  }

  const addHandle = () => {
    quantity += 1;
    const cartItem = [...cart];
    cartItem[index].cartQuantity = quantity;
    setCart(cartItem);
  };

  const minorsHandle = () => {
    const cartItem = [...cart];
    if (quantity > 0) {
      quantity -= 1;
      cartItem[index].cartQuantity = quantity;
      setCart(cartItem);
    }

    if (quantity === 0) {
      cartItem.splice(index, 1);
      setCart(cartItem);
    }
  };

  const addToCartHandle = (e) => {
    const cartItem = [...cart];
    if ((!index && index !== 0) || index === -1) {
      quantity += 1;
      cartItem.push(product);
      cartItem[cartItem.length - 1].cartQuantity = quantity;
    }
    setCart(cartItem);
  };

  return (
    <div className="cartButton">
      {Boolean(quantity) && (
        <button ref={minors} onClick={minorsHandle}>
          -
        </button>
      )}
      <button ref={num} onClick={addToCartHandle}>
        {quantity || "Add"}
      </button>
      {Boolean(quantity) && (
        <button ref={add} onClick={addHandle}>
          +
        </button>
      )}
    </div>
  );
}

export default Button;
