import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiFillStar} from "react-icons/Ai";
import AverageStars from "../../stars/AverageStars.jsx"

const CardEntry = ({defaultsStyles, detailProduct, detailRatings,  defaultInfo, id, category, name, price, length, setShowModal, setSelectedid}) => {

  const imageNotFound = "http://placecorgi.com/260/180";
  // console.log('defaultImage', defaultsStyles[0])
  return(
      <Carditem>
        <CardImageBox>
          { defaultsStyles[0].photos[0].url === null
          ? <Cardimage src={imageNotFound} />
          : <Cardimage src={defaultsStyles[0].photos[0].url}/>}
        </CardImageBox>

        <StarButton onClick={() => {
          setShowModal(true)
          setSelectedid(detailProduct)}}>
          <AiFillStar/>
        </StarButton>

        <CardInfo>
          <p>Category: {category}</p>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
          <Ratings>{AverageStars(detailRatings.ratings)}</Ratings>
        </CardInfo>
      </Carditem>
  )
}

const Carditem = styled.div`
  width: 250px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`
const CardImageBox = styled.div`
  width: 100%;
  height: 50%;
`
const Cardimage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const CardInfo = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`
const StarButton = styled.button`
  position:absolute;
  top:10px;
  right: 10px;
`
const Ratings = styled.div`
  display:inline-block
`

export default CardEntry;
