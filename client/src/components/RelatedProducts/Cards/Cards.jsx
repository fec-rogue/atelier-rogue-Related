import React from 'react';
import { useState, useEffect, useContext } from "react";
import CardEntry from './CardEntry.jsx';


const Cards = ({relatedProductsStyles, relatedProductsDetail}) => {
  console.log('relatedProductsDetail', relatedProductsDetail);
  return (
    <div>
       <h1>Related Products</h1>
    {relatedProductsStyles.map((eachProduct) => {
        //filter the styles photos default;
        const id = Number(eachProduct.product_id);
        const detailProduct = relatedProductsDetail.find(detail => detail.id === id);
        console.log('detailProduct',detailProduct);
        const category = detailProduct.category;
        const name = detailProduct.name;
        const price= detailProduct.default_price;
        const defaultsStyles = eachProduct.results.filter((eachStyle) => eachStyle['default?'] === true);
        return(
        <div key={id}>
          <CardEntry defaultsStyles={defaultsStyles}  category={category} name={name} price={price} />
        </div>
          )
      })}


    </div>
  )
}

export default Cards;