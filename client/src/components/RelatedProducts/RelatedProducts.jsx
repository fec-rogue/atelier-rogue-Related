import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { PropIdContext } from '../App.jsx';
import Cards from './Cards/Cards.jsx';
import Comparison from './Cards/ComparisonModal.jsx';
import Outfits from './Outfits/Outfits.jsx';


const RelatedProducts = () => {

    const {id, setId} = useContext(PropIdContext);
    const [relatedProductsStyles, setRelatedProductsStyles] = useState([]);
    const [relatedProductsDetail, setRelatedProductsDetail] = useState([]);
    const [relatedProductsRatings, setRelatedProductsRatings] = useState([]);
    const [defaultidinfo, setDefaultIdinfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedid, setSelectedid] = useState({});
    const [twoCardsArray, setTwoCardsArray] = useState([]);
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
      //HARD CODE ONE PRODUCT HAS MORE THAN 4 RELATED PRODUCTS TO TEST OUT CAROUSEL
        // axios.get(`products/related?product_id=40346`)
        axios.get(`products/related?product_id=${id}`)
          .then((res) => {
           let allRelatedRequestStyles= res.data.map((eachRelated) => {
              return axios.get(`products/styles?product_id=${eachRelated}`)
            });
            let allRelatedRequestInfo= res.data.map((eachRelated) => {
              return axios.get(`products/info?product_id=${eachRelated}`)
            });
            let allRelatedRequestRatings = res.data.map((eachRelated) => {
              return axios.get(`reviews/meta/?product_id=${eachRelated}`)
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
            Promise.all(allRelatedRequestRatings)
            .then(result => {
              // console.log('resultRatings', result.map((eachProduct) => eachProduct.data));
              setRelatedProductsRatings(result.map((eachProduct) => eachProduct.data));
          })
          })
          .catch((err) => {
            console.log('error while getting the data', err)
          })
    }, []);

    useEffect(() => {
      if(selectedid.features) {
        setTwoCardsArray([defaultidinfo, selectedid]);
      }
    }, [selectedid])

  return(
    <RelatedProductsSection>

      <RelatedHeader>Related Products</RelatedHeader>
      {
        relatedProductsStyles.length > 0 && relatedProductsDetail.length > 0
        && relatedProductsRatings.length > 0 &&
        <Cards
          relatedProductsStyles={relatedProductsStyles}
          relatedProductsDetail={relatedProductsDetail}
          relatedProductsRatings={relatedProductsRatings}
          setShowModal={setShowModal}
          setSelectedid={setSelectedid}
        />
      }

    <ComparisonWrapper>
    { showModal && twoCardsArray.length > 0 &&
      <Comparison
        twoCards={twoCardsArray}
        close={ setShowModal}
      /> }
    </ComparisonWrapper>


    <RelatedHeader>Your Outfit</RelatedHeader>

    <Outfits />

    </ RelatedProductsSection>
  )
}
const RelatedHeader = styled.h3`
  text-transform: uppercase;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const RelatedProductsSection = styled.section`
  display: inline-block;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
`;


const ComparisonWrapper = styled.div`
  position: fixed;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backgroundColor: #FFF;
  padding: 50px;
  zIndex: 1000
`

export default RelatedProducts;



