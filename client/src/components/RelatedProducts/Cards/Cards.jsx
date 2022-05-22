import React from 'react';
import { useState, useEffect, useContext } from "react";
import CardEntry from './CardEntry.jsx';


const Cards = ({relatedProductsStyles, relatedProductsDetail}) => {
  console.log('relatedProductsDetail', relatedProductsDetail);
  return (
    <div>
    {/* {relatedProductsStyles.map((eachProduct) => {
        //filter the styles photos default;
        var defaultsStyles = eachProduct.data.results.filter((eachStyle) => eachStyle['default?'] === true);
        // var defaultsStyles = eachProduct.data.results;
        console.log('defaultsStyles', defaultsStyles);
        return(
        <div>
          <CardEntry defaultsStyles={defaultsStyles} />
        </div>
          )
      })} */}

   {relatedProductsDetail.map((eachProduct) => {
          //filter the styles photos default;
          // var defaults = eachProduct.data.results.filter((eachStyle) => eachStyle['default?'] === true);
          return(
          <div>
            <CardEntry productDetail={eachProduct} />
          </div>
            )
        })}
    </div>
  )
}

export default Cards;