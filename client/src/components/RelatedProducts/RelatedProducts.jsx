import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {PropIdContext} from '../App.jsx';

const RelatedProducts = () => {
    const [image, setImage] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([]);
    const [name, setName] = useState([]);
    const {id} = useContext(PropIdContext);
    console.log('id', id);

    useEffect(() => {
        // axios.get(`/products/related`, {params: {product_id: '40344'}})
        axios.get(`products/related?product_id=40344`)
          .then((res) => {
            console.log('response from API', res.data)
          //  return axios.get(`products/styles`, {params: {product_id: res.data[1]}})
          return axios.get(`products/styles?product_id=40344`)
          })
          .then((res) => {
           res.data.results.forEach((style) => {
             if(style["default?"] === true) {
              setImage(style.photos[4].url)
             }
           });
          })
          .catch((err) => {
            console.log('error while getting the data', err)
          })
    }, []);


    useEffect(() => {
      axios.get(`products/related?product_id=40344`)
        .then((res) => {
          console.log('response from API', res.data)
         return axios.get(`products/info?product_id=${res.data[1]}`)
        })
        .then((res) => {
          console.log('category data', res.data);
          setCategory(res.data.category)
          setName(res.data.name)
          setPrice(res.data.default_price)
        })
        .catch((err) => {
          console.log('error while getting the data', err)
        })
  }, []);

  return(
    <div>

        <img src={image} width='250' height='300'/>
        <span>{category}</span>
        <span>{name}</span>
        <span>{price}</span>

    </div>
  )

}


export default RelatedProducts;
