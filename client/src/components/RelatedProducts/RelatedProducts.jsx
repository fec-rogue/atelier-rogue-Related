import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import Cards from './Cards/Cards.jsx';
import Outfits from './Outfits/Outfits.jsx';

const RelatedProducts = () => {
    const [relatedProductsStyles, setRelatedProductsStyles] = useState([]);
    const [relatedProductsDetail, setRelatedProductsDetail] = useState([]);

    //use local storage to set up outfit
    // const [outfitData, setOutfitData] = useState([]);

    const {id, setId} = useContext(PropIdContext);
    const [defaultidinfo, setDefaultIdinfo] = useState([]);

    useEffect(() => {
      axios.get(`products/info?product_id=${id}`)
        .then((res) => {
          // console.log('default info', res.data)
          setDefaultIdinfo(res.data)
        })
        .catch((err) => {
          console.log('error while getting the data', err)
        })
    }, [])

    useEffect(() => {

        axios.get(`products/related?product_id=${id}`)
          .then((res) => {
           let allRelatedRequestStyles= res.data.map((eachRelated) => {
              return axios.get(`products/styles?product_id=${eachRelated}`)
            });
            let allRelatedRequestInfo= res.data.map((eachRelated) => {
              return axios.get(`products/info?product_id=${eachRelated}`)
            });
            Promise.all(allRelatedRequestStyles)
              .then(result => {
                // console.log('resultStyles', result.map((eachProduct) => eachProduct.data));
                setRelatedProductsStyles(result.map((eachProduct) => eachProduct.data));
              })
            Promise.all(allRelatedRequestInfo)
              .then(result => {
                // console.log('resultCategory', result.map((eachProduct) => eachProduct.data));
                setRelatedProductsDetail(result.map((eachProduct) => eachProduct.data));
            })
          })
          .catch((err) => {
            console.log('error while getting the data', err)
          })
    }, []);


  return(
    <div>
      {
         relatedProductsStyles.length > 0 && relatedProductsDetail.length > 0 &&
        <Cards
        relatedProductsStyles={relatedProductsStyles}
        relatedProductsDetail={relatedProductsDetail}
        defaultInfo={defaultidinfo}/>
      }
    </div>
  )
}

export default RelatedProducts;



