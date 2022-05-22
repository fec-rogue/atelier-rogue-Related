import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {PropIdContext} from '../App.jsx';

const RelatedProducts = () => {
    const [relatedProductsData, setRelatedProductsData] = useState([]);
    const {id, setId} = useContext(PropIdContext);

    useEffect(() => {
        axios.get(`products/related?product_id=${id}`)
          .then((res) => {
            // console.log('response from API', res.data)
           let allRelatedRequest= res.data.map((eachRelated) => {
              // console.log('eachRelated', eachRelated);
              return axios.get(`products/styles?product_id=${eachRelated}`)
            });
            // console.log('allRelatedRequest', allRelatedRequest);
            return axios.all(allRelatedRequest)
              .then(axios.spread((...result) => {
              console.log('result', result);
              setRelatedProductsData(result);
              // result.forEach((style) => {
              //   const eachStyleArr = style.data.results;
              //   // console.log('eachStyleArr', eachStyleArr);

              //   let imageURLArr = [];
              //   eachStyleArr.forEach((eachObj) => {
              //     // console.log('eachObj', eachObj)
              //     if(eachObj["default?"] === true) {
              //       var defaultImgURL = eachObj.photos[0].url;
              //       // console.log('defaultImgURL', defaultImgURL)
              //       imageURLArr.push(defaultImgURL);
              //       // setImage(defaultImgURL);
              //     }
              //     // console.log('imageURLArr', imageURLArr);
              //     setImage(imageURLArr);
              //   // console.log('imageURLArr', imageURLArr);

              //     // eachStyleArr.forEach((styleObj) => {
              //     //   // console.log('styleObj', styleObj);
              //     //   if(styleObj["default?"] === true && styleObj.photos[0].url !== null) {
              //     //      setImage(styleObj.photos[0].url)
              //     //  }
              //     // })
              // })
              // })
          }))
        })
          .catch((err) => {
            console.log('error while getting the data', err)
          })
    }, []);

  return(
    <div>
      {relatedProductsData.map((eachProduct) => {
       var defaults = eachProduct.data.results.filter((eachStyle) => eachStyle['default?'] === true);
        return(
        <div>
          {defaults[0] && <img src={defaults[0].photos[0].url}/>}
        </div>
          )
      })}

    </div>
  )

}

export default RelatedProducts;





  // return axios.get(`products/styles?product_id=40344`)
   // .then((res) => {
          //   console.log('res.data.results', res.data);
          //  res.data.results.forEach((style) => {
          //    if(style["default?"] === true) {
          //     setImage(style.photos[4].url)
          //    }
          //  });
          // })

            //   useEffect(() => {
  //     axios.get(`products/related?product_id=40344`)
  //       .then((res) => {
  //         console.log('response from API', res.data)
  //        return axios.get(`products/info?product_id=${res.data[1]}`)
  //       })
  //       .then((res) => {
  //         console.log('category data', res.data);
  //         setCategory(res.data.category)
  //         setName(res.data.name)
  //         setPrice(res.data.default_price)
  //       })
  //       .catch((err) => {
  //         console.log('error while getting the data', err)
  //       })
  // }, []);
