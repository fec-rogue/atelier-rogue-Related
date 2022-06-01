import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext, createContext } from 'react';
import {RiShoppingBagLine} from "react-icons/ri";

function Cart() {
  const [qty, setQty] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    /*
    axios.get('/cart')
    .then((response) => {
      setItems(response.data);
      setQty(repsonse.data.length);
    })
    .catch((err) => {console.log(err)});
    */
  })
  return(
    <BannerContainer>
      <WebTitle><strong>ROUGE</strong></WebTitle>
      <CartContainer>
        <CartBtn><RiShoppingBagLine size={28}/></CartBtn>
        {qty > 0 ? <Qty>{qty}</Qty> : null}
      </CartContainer>
    </BannerContainer>
  )
};

export default Cart;

const CartBtn = styled.button`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  &:hover{
    color: gray;
    cursor: pointer;
  }
`;
const Qty = styled.p`
  margin-right: 10px;
`;
const CartContainer = styled.div`

`
const WebTitle = styled.h2`
  margin-left: 30px;
`;
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;
// display: flex;
// justify-content: space-bewteen;
// align-items: center;