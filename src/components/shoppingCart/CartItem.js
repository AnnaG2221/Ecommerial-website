import React from "react";
import Button from "../products/Button";
import { MyContext } from "../MyContext";
import { useContext } from "react";

function CartItem({ product }) {
  const { cart, setCart } = useContext(MyContext);

  const handleRemove = () => {
    const index = cart.findIndex((i) => i._id === product._id);
    const cartItem = [...cart];
    cartItem.splice(index, 1);
    setCart(cartItem);
  };

  return (
    <div>
      <img src={product.link} width="100px" height="100px" />
      <div>{product.name}</div>
      <div>{'$'+(product.price * product.cartQuantity).toFixed(2)}</div>
      <Button product={product}> </Button>
      <div onClick={handleRemove}>Remove</div>
    </div>
  );
}

export default CartItem;
