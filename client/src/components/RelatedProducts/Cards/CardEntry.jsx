import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import Comparison from './ComparisonModal.jsx';


const CardEntry = ({defaultsStyles, detailProduct, defaultInfo, id, category, name, price, length}) => {

  const imageNotFound = "http://placecorgi.com/260/180";

  const [data, setData] = useState({
    showModal: Array(length).fill(false),
    twoCardsArray: []
  });

  return(
      <Carditem>
        {(defaultsStyles[0] ) ? <Cardimage src={defaultsStyles[0].photos[0].url}/> : <Cardimage src={imageNotFound} />}
        <ModalButton onClick={() => {
          setData({
            showModal: true,
            twoCardsArray: [defaultInfo, detailProduct]
          })
        }}> Compare
        </ModalButton>

        {data.showModal && data.twoCardsArray.length > 0 &&
        <Comparison twoCards={data.twoCardsArray} closeModal={setData} />}

        <CardInfo>
          <p>Category: {category}</p>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
        </CardInfo>
      </Carditem>
  )
}

const Carditem = styled.div`
  height: 400px;
  width: 200px;
  position: relative;
`
const Cardimage = styled.img`
  width: 100%;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`


const ModalButton = styled.button`

`


export default CardEntry;
