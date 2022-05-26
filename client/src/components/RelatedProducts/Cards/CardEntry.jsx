import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiFillStar} from "react-icons/Ai";
import AverageStars from "../../stars/AverageStars.jsx"

const CardEntry = ({defaultsStyles, detailProduct, detailRatings,  defaultInfo, id, category, name, price, length, setShowModal, setSelectedid}) => {

  const imageNotFound = "http://placecorgi.com/260/180";

  return(
      <Carditem>
        <StarButton onClick={() => {
          setShowModal(true)
          setSelectedid(detailProduct)}}>
          <AiFillStar/>
        </StarButton>

        {(defaultsStyles[0] )
        ? <Cardimage src={defaultsStyles[0].photos[0].url}/>
        : <Cardimage src={imageNotFound} />}

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
  height: 400px;
  width: 200px;
  position: relative;
`
//uniform the photos size
const Cardimage = styled.img`
  width: 100%;

`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`


const StarButton = styled.button`

`
const Ratings = styled.div`
  display:inline-block
`

export default CardEntry;
