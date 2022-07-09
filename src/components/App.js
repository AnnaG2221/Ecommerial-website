import React from "react";
// import "antd/dist/antd.css";
// import { Button, Modal } from 'antd'
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Foot from "./Foot";
import Head from "./Head";
import Login from "./form/Login";
import Register from "./form/Register";
import CreateForm from "./createProduct/CreateForm";
import Product from "./products/Product";
import EditForm from "./createProduct/EditForm";
import ProductDetails from "./products/ProductDetails";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import axios from "axios";
import { MyContext } from "./MyContext";
import './app.css';

function App() {

  const getUser = localStorage.getItem("User");
  const localCart = JSON.parse(localStorage.getItem('cart'));
  const cartInit = localCart? localCart : [];
  const [product, setProduct] = useState([]);
  const [success, setSuccess] = useState(Boolean(getUser));
  const [cart, setCart] = useState(cartInit);
  const [cartCount, setCartCount] = useState(0);
  const [admit, setAdmit] = useState(false);

  // call product api get product and update product state
  const getProduct = async () => {
    const { data } = await axios
      .get("http://localhost:8000/api/allPruducts")
      .catch((err) => {
        console.log("Err: ", err);
      });

    if (JSON.stringify(product) !== JSON.stringify(data)) {
      setProduct(data);
    }
  };

  // call user api get cart info from user.
  // const getCart = async () => {
  //   try {
  //      const res = await axios.get("http://localhost:8000/api/user")
  //      console.log('getCart res', res)
  //       if (getUser !== null) {
  //     const findUser = res.data.filter((i) => i.email === getUser);
  //     console.log('setCart', findUser[0].cart)
  //     setCart(findUser[0].cart);
  //       }
  //   } catch (e) {
  //     console.log("Error", e);
  //   }

  // };

  // update cart base on user
  const UserCart = async () => {
    if (getUser) {
      const res = await axios
        .put("http://localhost:8000/api/cart", { email: getUser, cart })
        .catch((e) => {
          console.log("Error", e);
        });
    }
  };

  useEffect(() => {
    getProduct();

  }, [product]);

  useEffect(() => {
    UserCart();
    // getCart()
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // console.log('getcart render bash on user')
    // getCart();
    if (getUser === "admit@admit.com") {
      setAdmit(true);
    } else {
      setAdmit(false);
    }
  }, [getUser]);

  useEffect(() => {
    if(localStorage.getItem){

     const localCart = JSON.parse(localStorage.getItem("cart"))
     setCart(localCart)
    }
  }, []);

  // console.log('cart at App', cart)

  return (
    <div>
      <MyContext.Provider
        value={{ cart, setCart, cartCount, setCartCount, admit }}
      >
        <Head success={success} setSuccess={setSuccess}></Head>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Product product={product} admit={admit} />}
            />
            <Route path="/:id" element={<ProductDetails product={product} />} />
            <Route path="/cart" element={<ShoppingCart />} />

            <Route path="/login" element={<Login setCart={setCart} success={setSuccess} product={product} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<Login />} />
            <Route
              path="/add"
              element={<CreateForm setProduct={setProduct} />}
            />
            <Route path="/edit/:id" element={<EditForm product={product} />} />
          </Routes>
        </div>
      </MyContext.Provider>

      <Foot className="foot"></Foot>
    </div>
  );
}

export default App;
