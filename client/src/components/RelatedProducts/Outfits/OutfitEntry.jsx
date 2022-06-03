import React from 'react';
import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import {AiOutlineDelete} from "react-icons/ai";

const OutfitEntry = ({item, setOutfit, ratings}) => {
  let handleDelete = () => {
    let outfit = JSON.parse(localStorage.getItem('outfit'));
    let newOutfit = outfit.filter((eachOutfit) => item.image !== eachOutfit.image)
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
          <p style={{margin: 0}}>{item.category}</p>
          <p style={{margin: 0, 'fontSize': '24px', 'fontWeight': '600'}}>{item.name}</p>
          <p style={{margin: 0, 'fontWeight': '600', 'color': '#008c75'}}>${item.default_price}</p>
          <Ratings>{ratings}</Ratings>
      </OutfitInfo>
    </Outfititem>
  )
}


const Outfititem = styled.div`
  width: 250px;
  height: 380px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  background-color: #FFF;
  border-radius: 12px;
  overflow:hidden;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
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
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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