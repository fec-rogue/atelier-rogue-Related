import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext, createContext } from 'react';
import {RiShoppingBagLine} from "react-icons/ri";
import {BsFillPersonFill} from "react-icons/bs";

function Cart() {
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);
  const [isActive, setActive] = useState(false);

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

  // onClick open up modal showing items within bag and sub total
  // have non functioning buttons that allow users to checkout
  const handleBagClick = () => {

  }

  return(
    <BannerContainer>
      <WebTitle><strong>ROUGE</strong></WebTitle>
      <CartContainer>
        <AccountDiv>
          <BsFillPersonFill size={28} style={{color:'white'}}/>
        </AccountDiv>
        <CartBtn marg={qty > 0 ? '0' : '25'}><RiShoppingBagLine size={28} style={{color:'white'}}/></CartBtn>
        {qty > 0 ? <Qty>{qty}</Qty> : null}
      </CartContainer>
    </BannerContainer>
  )
};

export default Cart;
const AccountDiv = styled.div`
  margin-right: 15px;
  &:hover{
    color: gray;
    cursor: pointer;
  }
`;
const CartBtn = styled.button`
  margin-right: ${props => props.marg};
  background-color: transparent;
  border: none;
  &:hover{
    color: gray;
    cursor: pointer;
  }
`;
const Qty = styled.p`
  margin-right: 25px;
  color: white;
`;
const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const WebTitle = styled.h2`
  margin-left: 35px;
  color: white;
`;
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #8d5535;

`;
// display: flex;
// justify-content: space-bewteen;
// align-items: center;