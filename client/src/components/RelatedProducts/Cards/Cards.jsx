import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import CardEntry from './CardEntry.jsx';
import { GrCaretPrevious,  GrCaretNext } from "react-icons/gr";

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

      { currentIndex !== 0 ? < PrevButton onClick={prevArrow}> <GrCaretPrevious /> </PrevButton> : null }

    <Cardscontainer style={{ transform: `translateX(-${currentIndex * 5}%)`}}>
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
        { max !== length -1 ?  <NextButton onClick={nextArrow}> <GrCaretNext style={{color:'blue'}}/> </NextButton>: null }
        </CardsWrapper>
        )
      }

      const CardsWrapper = styled.ul`
        width:  1400px;
        padding: 40px 0;
        overflow: hidden;
        position: relative;
      `
      const Cardscontainer = styled.div`
        margin-left: 33px;
        display: flex;
        gap: 10px;
        position: relative;
        transition: .5s;
        scroll-behavior: smooth;
      `;

      const Individualcard = styled.div`
        width:300px;
        height: 400px;

      `

      const PrevButton = styled.button`
      align-items: center;
      justify-content: center;
      display: flex;
        position: absolute;
        z-index: 1;
        left:16px;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 45px;
        border-radius: 100%;
        border: 1px solid #008c75;
        box-shadow: 1px 1px 3px rgba(0,0,0,.25);
        transition: all .25s ease;
        font-weight: bold;
        background-color: rgba(255,255,255, 0.75);
        backdrop-filter: blur(2px);
        &:hover,
        &:focus {
          background-color: #008c75;
          outline: none;
          opacity: .7;
        };
        & svg {
          transform: translateX(-22%);
          stroke: #008c75 !important;
          fill: #008c75 !important;
        }
      `
        const NextButton = styled.button`
        align-items: center;
        justify-content: center;
        display: flex;
          position: absolute;
          z-index: 1;
          right:16px;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 100%;
          border: 1px solid #008c75;
          box-shadow: 1px 1px 3px rgba(0,0,0,.25);
          transition: all .25s ease;
          font-weight: bold;
          background-color: rgba(255,255,255, 0.75);
          backdrop-filter: blur(2px);
          &:hover,
          &:focus {
            background-color: #008c75;
            outline: none;
          };
          & svg {
            transform: translateX(22%);
          }
        `

      const ComparisonWrapper = styled.div`
        position: fixed;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        backgroundColor: #FFF;
        padding: 50px;
        zIndex: 1000;
      `

      export default Cards;