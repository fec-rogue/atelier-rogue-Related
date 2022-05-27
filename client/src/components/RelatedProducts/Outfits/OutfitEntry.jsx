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
      <button onClick={handleDelete}>
        <AiOutlineDelete/>
        </button>
      <Outfitimage src={item.image} ></Outfitimage>
      <OutfitInfo>
          <p>Category: {item.category}</p>
          <p>Name: {item.name}</p>
          <p>Price: {item.default_price}</p>
          <Ratings>Ratings:{ratings}</Ratings>
      </OutfitInfo>
    </Outfititem>
  )
}


const Outfititem = styled.div`
  height: 400px;
  width: 200px;
  position: relative;
`
const Outfitimage = styled.img`
  width: 100%;
`
const OutfitInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Ratings = styled.div`
`

export default OutfitEntry;