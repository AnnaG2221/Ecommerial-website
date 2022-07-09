import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import Button from './Button'

const ProductDetails = () => {
  const [info, setInfo] = useState({});
  const {id} = useParams();
  // console.log('id:', id)
  const getInfo = async () => {
    const res = await axios.get(`http://localhost:8000/api/allPruducts/${id}`).catch(err => {
      console.log('Err', err);
    })

    setInfo(res.data)
  };

  useEffect (() => {
    getInfo()
  }, [])

  const {category, description, link, name, price} = info;


  return (
    <div className="ui grid container productDetail" >
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={link} />
              </div>
              <div className="column rp">
                <h1>{name}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                    <Button product={info} ></Button>

              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductDetails;
