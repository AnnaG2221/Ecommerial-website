import React from "react";
import Input from "./Input";
import { formContent } from "./formContent";
import { useState, useEffect } from "react";
import "./createForm.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditForm({ product }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formDate, setFormDate] = useState({});
  const [image, setImage] = useState(formDate.link);
  const [error, setError] = useState("");

  const changeHandle = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const getInfo = async () => {
    const res = await axios
      .get(`http://localhost:8000/api/allPruducts/${id}`)
      .catch((e) => {
        console.log("Error", e);
      });
    // console.log(res)
    setFormDate(res.data);
  };

  const { name, description, category, quantity, price, link } = formDate;

  const previewHandle = () => {
    setImage(link);
    // console.log('click')
  };


  const handleChange = async (e) => {

    try {
      const res = await axios.post(
        `http://localhost:8000/api/edit/${id}`,
        formDate
      );
      console.log(res);
      navigate("/");
      alert("product Edited sucessfully");
      console.log("this part render");
    } catch (e) {
      console.log("Error", e);
      setError(e.response.data.error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/edit/${id}`)
      console.log(res)
      alert('product deleted')
    } catch (e) {
      console.log('Error', e)
    }
  }

  useEffect(() => {
    getInfo();
  }, []);
  console.log('formDate', formDate)
  return (
    <div className="createPage">
      <h1>Edit Product</h1>
      <div className="createForm">
        <form
        action='/'
          // method="post"
          // onSubmit={submitHandle}
        >
          <div className="inputbar">
            {/* {success && <div>{success}</div>} */}
            <label>Product name</label>
            <input
              onChange={changeHandle}
              type="text"
              name="name"
              value={name}
              required
            ></input>
          </div>
          <label htmlFor="description">Product description</label>
          <textarea
            onChange={changeHandle}
            value={description}
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
                value={category}
                required
              ></input>
            </div>
            <div className="inputbar">
              <label>Price</label>
              <input
                onChange={changeHandle}
                type="number"
                name="price"
                value={price}
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
                  value={quantity}
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
          {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
          <div className="ui grid center aligned">
            <button onClick={handleChange} className="ui primary button" type="submit">
              Change
            </button>
            <button onClick={handleDelete} className="ui primary button">Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
