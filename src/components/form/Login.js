import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './form.css'

function Login(props) {
  const [formDate, setFormDate] = useState({ email: "", password: "" });
  const { email, password } = formDate;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/login";
      const res = await axios.post(url, formDate);
      // console.log(res)
      localStorage.setItem("User", res.data.data.email);
      // window.location = "/";
      navigate('/')
      props.success(true)
      // console.log(res.data.data.cart)

     var cartItem = res.data.data.cart
     const cartExcludeDeleted=[]
     const updateCartItem  = (cart, product) => {

       cart.forEach (i => {
         product.forEach( e => {
           if (i._id === e._id)
           cartExcludeDeleted.push(i)
         })
       })
     }
      updateCartItem(cartItem, props.product)

     console.log('canceled itemt', cartExcludeDeleted)

      // console.log('login cart', cartItem)
      props.setCart(cartExcludeDeleted)
      localStorage.setItem("cart", JSON.stringify(cartExcludeDeleted))
    } catch (error) {
     props.success(false)
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="form">
      <div className="innerForm">
        <h1>Sign in to your account</h1>
        <form action="/login" method="post" onSubmit={submitHandle}>
          <div className="formInput">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              name="email"
              onChange={changeHandle}
            ></input>
            {/* <div style={formType.display}className='warning'>{formInfo.warnEmail}</div> */}
          </div>
          <div id="password" className="formInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={changeHandle}
            ></input>
            {/* <div style={formType.display} className='warning'> {formInfo.warnPassword}</div> */}
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit">Sign in</button>
          <div className="innerBottom">
            <div>
              don't have an account
              <Link to="/register">
                <a>Sign up</a>
              </Link>
            </div>
            <Link to="/forgotPassword">
              <a>Forgot password?</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
