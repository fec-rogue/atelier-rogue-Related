import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import CardEntry from './CardEntry.jsx';
import { FcPrevious,  FcNext } from "react-icons/fc";

const Cards = ({relatedProductsStyles, relatedProductsDetail, relatedProductsRatings,
  setShowModal, setSelectedid}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const display = relatedProductsStyles.slice(currentIndex, (currentIndex + 4));
    const length = relatedProductsStyles.length;
    const max = currentIndex + 3;
    const min = currentIndex;

    const prevArrow = () => {
      setCurrentIndex(currentIndex === 0 ? max : currentIndex -1)
    };

    const nextArrow = () => {
      setCurrentIndex(currentIndex === max ? 0 : currentIndex + 1)
    };

    return (
      <CardsWrapper>
      <Indicators>
      { currentIndex !== 0 ? < PrevButton onClick={prevArrow}> <FcPrevious/> </PrevButton> : null }
      { max !== length -1 ?  <NextButton onClick={nextArrow}> <FcNext/> </NextButton>: null }
    </Indicators>

    <Cardscontainer style={{ transform: `translateX(-${currentIndex * 25}%)`}}>
    {display.map((eachProduct, index) => {
      const id = Number(eachProduct.product_id);
      const detailProduct = relatedProductsDetail.find(detail => detail.id === id);
      const detailRatings = relatedProductsRatings.find(detail => Number(detail.product_id) === id);

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

      return(
        <Individualcard key={id}>
        {index <= max && index >= min && display.length > 0 &&
          <CardEntry
            defaultsStyles={defaultsStyles}
            detailProduct = {detailProduct}
            detailRatings={detailRatings}
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
      gap: 10px;
      position: relative;
      transitions: .5s;
      scroll-behavior: smooth;
      `;

      const Individualcard = styled.div`
      width:300px;
      height: 400px;
      box-shadow: 0 0 24px 8px rgba(0,0,0,0.01);
      `
      const Indicators = styled.div`
        top:50%;
        display:flex;
        justify-content: center;
        position: absolute;
        z-index: 500;
        cursor:pointer;
        user-select:none;
      `
      const PrevButton = styled.button`
        left:0;
      `

      const NextButton = styled.button`
        right:0

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