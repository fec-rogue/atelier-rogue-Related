import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
// import Comparison from './ComparisonModal.jsx';
import {AiFillStar} from "react-icons/Ai";


const CardEntry = ({defaultsStyles, detailProduct, defaultInfo, id, category, name, price, length, setShowModal, setSelectedid}) => {

  const imageNotFound = "http://placecorgi.com/260/180";
  // console.log('detailProduct', detailProduct);
  // const [data, setData] = useState({
  //   showModal: Array(length).fill(false),
  //   twoCardsArray: []
  // });

  return(
      <Carditem>
        <StarButton onClick={() => {
          setShowModal(true)
          setSelectedid(detailProduct)}}>
          <AiFillStar/>
        </StarButton>

        {(defaultsStyles[0] ) ? <Cardimage src={defaultsStyles[0].photos[0].url}/> : <Cardimage src={imageNotFound} />}

        {/* <ModalButton onClick={() => {
          setData({
            showModal: true,
            twoCardsArray: [defaultInfo, detailProduct]
          })
        }}> Compare
        </ModalButton>

        {data.showModal && data.twoCardsArray.length > 0 &&
        <Comparison twoCards={data.twoCardsArray} closeModal={setData} />} */}

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


const StarButton = styled.button`

`


export default CardEntry;
