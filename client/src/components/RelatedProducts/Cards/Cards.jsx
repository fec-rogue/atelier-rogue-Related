import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import CardEntry from './CardEntry.jsx';
import { FcPrevious,  FcNext } from "react-icons/fc";

const CardscontainerOuter = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  position: relative;

`
const Cardscontainer = styled.div`
  position: relative;
  width: 200px;
  height: 415px;
  margin: 0px;
  padding: 0px;
  transitions: .5s;
  scroll-behavior: smooth;
`;

const PrevButton = styled.button`
  left: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor:pointer;
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


const Cards = ({relatedProductsStyles, relatedProductsDetail}) => {
  // console.log('relatedProductsDetail', relatedProductsDetail);
  const [current, setCurrent] = useState(0);
  const length = relatedProductsStyles.length;

  const prevArrow = () => {
    setCurrent(current === 0 ? length -1 : current -1)
  };

  const nextArrow = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  };
  console.log('current', current)

  return (
    <div>
       <CardscontainerOuter>
       <FcPrevious onClick={prevArrow}/>
       <FcNext onClick={nextArrow}/>
      {relatedProductsStyles.map((eachProduct, index) => {
          const id = Number(eachProduct.product_id);
          const detailProduct = relatedProductsDetail.find(detail => detail.id === id);
          // console.log('detailProduct',detailProduct);
          const category = detailProduct.category;
          const name = detailProduct.name;
          const price= detailProduct.default_price;
          const defaultsStyles = eachProduct.results.filter((eachStyle) => eachStyle['default?'] === true);
        console.log('defaultsStyles', defaultsStyles)
        return(
          <Cardscontainer key={id}>
            <CardEntry defaultsStyles={defaultsStyles}  category={category} name={name} price={price} index={index} current={current}/>
          </Cardscontainer>
          )
        })}
    </CardscontainerOuter>
    </div>
  )
}

export default Cards;