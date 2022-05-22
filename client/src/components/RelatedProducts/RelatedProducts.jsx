import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {PropIdContext} from '../App.jsx';
import Cards from './Cards/Cards.jsx';

const RelatedProducts = () => {
    const [relatedProductsStyles, setRelatedProductsStyles] = useState([]);
    const [relatedProductsDetail, setRelatedProductsDetail] = useState([]);

    const {id, setId} = useContext(PropIdContext);

    useEffect(() => {
        axios.get(`products/related?product_id=${id}`)
          .then((res) => {
            // console.log('response from API', res.data)
           let allRelatedRequestStyles= res.data.map((eachRelated) => {
              // console.log('eachRelated', eachRelated);
              return axios.get(`products/styles?product_id=${eachRelated}`)
            });
            // console.log('allRelatedRequestStyles', allRelatedRequestStyles);
            return axios.all(allRelatedRequestStyles)
              .then(axios.spread((...result) => {
              // console.log('resultStyle', result);
              setRelatedProductsStyles(result);
          }))
        })
        .catch((err) => {
          console.log('error while getting the data', err)
        })
    }, []);

    useEffect(() => {
      axios.get(`products/related?product_id=${id}`)
        .then((res) => {
          // console.log('response from API', res.data)
         let allRelatedRequestInfo= res.data.map((eachRelated) => {
            // console.log('eachRelated', eachRelated);
            return axios.get(`products/info?product_id=${eachRelated}`)
          });
          // console.log('allRelatedRequestCategory', allRelatedRequest);
          return axios.all(allRelatedRequestInfo)
            .then(axios.spread((...result) => {
            // console.log('resultCategory', result);
            setRelatedProductsDetail(result);
        }))
      })
      .catch((err) => {
        console.log('error while getting the data', err)
      })
  }, []);

  return(
    <div>
      <Cards relatedProductsStyles={relatedProductsStyles} relatedProductsDetail={relatedProductsDetail}/>
    </div>
  )
}

export default RelatedProducts;



