import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import Comparison from './ComparisonModal.jsx';


const CardEntry = ({defaultsStyles, detailProduct, defaultInfo, id, category, name, price, index, current}) => {
  // console.log('defaultsStylesURL', defaultsStyles[0] && defaultsStyles[0].photos[0].url);
  // console.log('defaultprice', defaultsStyles[0] )
  // console.log('detailProduct',detailProduct);
  // console.log('defaultidinfo', defaultidinfo);
  const imageNotFound = "http://placecorgi.com/260/180";

  const [data, setData] = useState({
    showModal: false,
    twoCardsArray: []
  });

  const defaultid = defaultInfo.id;
  const defautidfeatures = defaultInfo;
  return(
      <Carditem>
        {(defaultsStyles[0] && index === current) ? <Cardimage src={defaultsStyles[0].photos[0].url}/> : <Cardimage src={imageNotFound} />}
        <ModalButton onClick={() => {
          setData({
            showModal: true,
            twoCardsArray: [defautidfeatures, detailProduct]
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
