import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiOutlineDelete} from "react-icons/Ai";

const OutfitEntry = ({item, setOutfit, ratings}) => {
  let handleDelete = () => {
    let outfit = JSON.parse(localStorage.getItem('outfit'));
    let newOutfit = outfit.filter((eachOutfit) => item.id !== eachOutfit.id)
    localStorage.setItem('outfit', JSON.stringify(newOutfit));
    setOutfit(newOutfit);
  }

  return (
    <Outfititem>
      <OutfitImageBox>
        <Outfitimage src={item.image} ></Outfitimage>
      </OutfitImageBox>
      <DeleteButton onClick={handleDelete}>
        <AiOutlineDelete/>
        </DeleteButton>
      <OutfitInfo>
          <p>{item.category}</p>
          <p><b>{item.name}</b></p>
          <p>${item.default_price}</p>
          <Ratings>{ratings}</Ratings>
      </OutfitInfo>
    </Outfititem>
  )
}


const Outfititem = styled.div`
  width: 250px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`

const OutfitImageBox = styled.div`
  width: 100%;
  height: 50%;
`
const Outfitimage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const OutfitInfo = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`

const Ratings = styled.div`
  display:inline-block
`
const DeleteButton = styled.button`
  position:absolute;
  top:10px;
  right: 10px;
`


export default OutfitEntry;