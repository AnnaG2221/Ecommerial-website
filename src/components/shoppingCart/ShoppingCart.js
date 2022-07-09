import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const [value,setValue] = useState('')
  const { cart, setCart, cartCount, setCartCount } = useContext(MyContext);
  // console.log('cartCount', cartCount)
  let cartNumber = 0;
  cart.filter((i) => i !== 1).forEach((e) => (cartNumber += e.cartQuantity));
  let productPrice = 0;
  let discount = 0;
  setCartCount(cartNumber);
  if (cart.length > 0) {
    cart.forEach((i) => (productPrice += i.price * i.cartQuantity));
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  if(value.toUpperCase() === 'SAVE10'){
    discount = 10;
  }


  let tax = productPrice*0.08
  let total = productPrice+tax-discount
 console.log('need render item',cart)
  return (
    <div className="ui container productDetail">
      <div className="ui placeholder segment">
        <h1>
          Cart <span>({cartCount})</span>
        </h1>
        <div>
          {cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
        </div>
        <br></br>
        <div class='ui container bewteen'>

        <label class = 'ui' id='promotion'>Promotion code: </label>
        <input class='ui input left' type='text' name='promotion' placeHolder='code' onChange={handleChange}></input>
        </div>
        <div>
          <div>Subtotal</div>
          <div>{'$'+productPrice.toFixed(2)}</div>
          <div>Tax</div>
          <div>{'$'+tax.toFixed(2)}</div>
          <div>Discount</div>
          <div>{'$'+discount.toFixed(2)}</div>
          <div>Estimated total</div>
          <div>{'$'+total.toFixed(2)}</div>
        </div>
        <br></br>
        <Link to="/">
          <div class="ui primary button">close</div>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCart;
