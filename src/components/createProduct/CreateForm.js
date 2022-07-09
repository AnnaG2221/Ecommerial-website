import React from "react";
// import Input from "./Input";
import { formContent } from "./formContent";
import { useState } from "react";
import "./createForm.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateForm({setProduct}) {
  const [formDate, setFormDate] = useState({
    name: "",
    description: "",
    category: "",
    quanity: 0,
    image: "",
  });
  const { name, description, category, quantity, price, link } = formDate;
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/add";
      const res = await axios.post(url, formDate);
      // console.log(res);
      navigate("/");
      // setSuccess(res.data.success);
      alert('Product Add successfully')
      setProduct([]);
    } catch (error) {
      // success(false);
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

  const previewHandle = ()  => {
    setImage(link)
    // console.log('click')
  }

  return (
    <div className="createPage">
      <h1>Create Product</h1>
      <div className="createForm">
        <form  onSubmit={submitHandle}>
          <div className="inputbar">
            {/* {success && <div>{success}</div>} */}
            <label>Product name</label>
            <input
              onChange={changeHandle}
              type="text"
              name="name"
              required
            ></input>
          </div>
          <label htmlFor="description">Product description</label>
          <textarea
            onChange={changeHandle}
            id="description"
            name="description"
            rows="4"
            cols="50"
          ></textarea>
          <div className="cAndP">
            <div className="inputbar">
              <label>Category</label>
              <input
                onChange={changeHandle}
                type="text"
                name="category"
                required
              ></input>
            </div>
            <div className="inputbar">
              <label>Price</label>
              <input
                onChange={changeHandle}
                type="number"
                name="price"
                required
              ></input>
            </div>
            <div className="qAndL">
              <div className="inputbar">
                <label>In Stock Quantity</label>
                <input
                  onChange={changeHandle}
                  type="number"
                  name="quantity"
                  required
                ></input>
              </div>
              <div className="inputbar">
                <label>Add Image Link</label>
                <input
                  onChange={changeHandle}
                  type="text"
                  name="link"
                  value={link}
                  required
                ></input>
              </div>
            </div>
            <input onClick={previewHandle} type="button" value="preview" />
          </div>
          <img src={image} atl="put in the link" width="250" height="220" />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit"> Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
