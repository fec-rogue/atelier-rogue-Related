import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import CardEntry from './CardEntry.jsx';
import { GrCaretPrevious,  GrCaretNext } from "react-icons/Gr";

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

      { currentIndex !== 0 ? < PrevButton onClick={prevArrow}> <GrCaretPrevious/> </PrevButton> : null }

    <Cardscontainer style={{ transform: `translateX(-${currentIndex * 50}%)`}}>
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

        { max !== length -1 ?  <NextButton onClick={nextArrow}> <GrCaretNext/> </NextButton>: null }
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
        box-shadow: 0 0 24px 8px rgba(0,0,0,0.01);
      `

      const PrevButton = styled.button`
        position: absolute;
        z-index: 1;
        left:0;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 45px;
        border-radius: 100%;
        border: none;
        box-shadow: 1px 1px 3px rgba(0,0,0,.25);
        transition: all .25s ease;
        font-weight: bold;
        background-color: rgba(255,255,255, 0.75);
        backdrop-filter: blur(2px);
        @media (max-height: 1100px) {
          height: 36px;
          width: 36px;
        }
        &:hover,
        &:focus {
          background-color: #dee2e6;
          outline: none;
          opacity: .7;
        }
      `
        const NextButton = styled.button`
          position: absolute;
          z-index: 1;
          right:0;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 100%;
          border: none;
          box-shadow: 1px 1px 3px rgba(0,0,0,.25);
          transition: all .25s ease;
          font-weight: bold;
          background-color: rgba(255,255,255, 0.75);
          backdrop-filter: blur(2px);
          @media (max-height: 1100px) {
            height: 36px;
            width: 36px;
          }
          &:hover,
          &:focus {
            background-color: #dee2e6;
            outline: none;
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