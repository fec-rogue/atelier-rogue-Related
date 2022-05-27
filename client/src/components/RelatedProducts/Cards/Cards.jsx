import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import CardEntry from './CardEntry.jsx';
import { FcPrevious,  FcNext } from "react-icons/fc";


const Cards = ({relatedProductsStyles, relatedProductsDetail, relatedProductsRatings, defaultInfo, setShowModal, setSelectedid}) => {
  const [current, setCurrent] = useState(0);
  const length = relatedProductsStyles.length;

  const prevArrow = () => {
    setCurrent(current === 0 ? length -1 : current -1)
  };

  const nextArrow = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  };

  const max = current + 3;
  const min = current;

  return (
    <CardsWrapper>
      <Indicators>
        { current !== 0 ? <FcPrevious onClick={prevArrow}/> : null }
        { max !== length -1 ?  <FcNext onClick={nextArrow}/> : null }
      </Indicators>

    <Cardscontainer style={{ transform: `translateX(-${current * 100}%)`}}>
      {relatedProductsStyles.map((eachProduct, index) => {
        // console.log('eachProduct', eachProduct);
        const id = Number(eachProduct.product_id);
        const detailProduct = relatedProductsDetail.find(detail => detail.id === id);
        // console.log('detailProduct',detailProduct);
        const detailRatings = relatedProductsRatings.find(detail => Number(detail.product_id) === id);
        // console.log('detailRatings', detailRatings);
        const category = detailProduct.category;
        const name = detailProduct.name;
        const features = detailProduct.features;
          let isDefault = false;
          let defaultsStyles = [];
          let stylesResults = eachProduct.results;
          stylesResults.forEach((eachStyle) => {
              if(eachStyle['default?'] === true) {
                isDefault = true;
                defaultsStyles.push(eachStyle);
              }
          })
          if(isDefault === false) {
            defaultsStyles.push(stylesResults[0])
          }
        // const defaultsStyles = eachProduct.results.filter((eachStyle) => eachStyle['default?'] === true);
        // console.log('defaultStyles', defaultsStyles);

        const defaultPrice = detailProduct.default_price;
        const saleprice = defaultsStyles[0] && defaultsStyles[0].sale_price;
        const price = saleprice === null ? defaultPrice : saleprice;

        return(
        <Individualcard key={id}>
          {index <= max && index >= min &&
            <CardEntry
              defaultsStyles={defaultsStyles}
              detailProduct = {detailProduct}
              detailRatings={detailRatings}
              defaultInfo={defaultInfo}
              id={id}
              category={category}
              name={name}
              price={price}
              index={index}
              current={current}
              length={length}
              setShowModal={setShowModal}
              setSelectedid={setSelectedid}
            />}
          </Individualcard>
            )
          })}
         </Cardscontainer>
        </CardsWrapper>
        )
      }

      const CardsWrapper = styled.ul`
        width:1200px;
        padding: 40px 0;
        overflow: hidden;
        position: relative;
      `
      const Cardscontainer = styled.div`
        display: flex;
        gap: 60px;
        position: relative;
        transitions: .5s;
        scroll-behavior: smooth;
      `;

      const Individualcard = styled.div`
        width:300px;
        height: 400px;
        box-shadow: 0 0 24px 8px rgba(0,0,0,0.05);
      `
      const Indicators = styled.div`
        top:50%;
        display:flex;
        justify-content: center;
        position: absolute;
        z-index: 1;
        cursor:pointer;
      `
      const PrevButton = styled.button`
        // position: absolute;
        // top: 0;
        // bottom: 0;
        // z-index: 1;
        // cursor:pointer;
        user-select:none;
      `

      const NextButton = styled.button`
        right:32px;
        position: absolute;
        top: 50%;
        bottom: 0;
        z-index: 1;
        cursor:pointer;
        user-select:none;
      `

      const ComparisonWrapper = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        backgroundColor: #FFF;
        padding: 50px;
        zIndex: 1000
      `

      export default Cards;