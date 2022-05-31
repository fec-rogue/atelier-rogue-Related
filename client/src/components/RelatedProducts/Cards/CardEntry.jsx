import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiFillStar} from "react-icons/Ai";
import AverageStars from "../../stars/AverageStars.jsx"

const CardEntry = ({defaultsStyles, detailProduct, detailRatings,  setShowModal, setSelectedid}) => {
  // const [hover, setHover] = useState(false);
  const imageNotFound = "http://placecorgi.com/260/180";

  const imagesArr = defaultsStyles[0].photos;

  // const onMouseEnter = () => {
  //   setHover(true)
  // }

  // const onMouseLeave = () => {
  //   setHover(false)
  // }


  return(
      <Carditem  >
        {/* <CardImageBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> */}
        <CardImageBox>

          { imagesArr[0].url === null
          ? <Cardimage src={imageNotFound} />
          : <Cardimage src={imagesArr[0].url} />}
{/*
      { hover &&
          imagesArr.slice(1).map((eachImage,index) => (
            eachImage.url === null ? <MultiImages src={imageNotFound} /> : <MultiImages src = {eachImage.url} />
          ))} */}

        </CardImageBox>

        <StarButton onClick={() => {
          setShowModal(true)
          setSelectedid(detailProduct)}}>
          <AiFillStar/>
        </StarButton>

        <CardInfo>
          <p>{detailProduct.category}</p>
          <h3><b>{detailProduct.name}</b></h3>
          <Price>${ defaultsStyles[0].sale_price === null
          ?  defaultsStyles[0].original_price
          :  defaultsStyles[0].sale_price }</Price>
          <Ratings>{ AverageStars(detailRatings.ratings) }</Ratings>
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
  gap: 10px;

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
  justify-content: space-between;
`
const Price = styled.p`


`
const StarButton = styled.button`
  position:absolute;
  top:10px;
  right: 10px;
`
const Ratings = styled.div`
  display:inline-block
`
const MultiImages = styled.img`
  width: 100%;
  height: 50%;

`

export default CardEntry;


// style={hover? HoverStyle : NormalStyle}
// const NormalStyle = styled.div`
// width: 250px;
// height: 400px;
// position: relative;
// display: flex;
// flex-direction: column;
// align-items: start;
// gap: 10px;

// `

// const HoverStyle = styled.div`

// `