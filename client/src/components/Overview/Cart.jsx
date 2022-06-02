import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext, createContext } from 'react';
import {RiShoppingBagLine} from "react-icons/ri";
import {BsFillPersonFill} from "react-icons/bs";
import { FiSun, FiMoon } from 'react-icons/fi';

function Cart({handleThemeChange, currentTheme}) {
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);
  const [isActive, setActive] = useState(false);

  /*
  useEffect(() => {
    axios.get('/cart')
    .then((response) => {
      setItems(response.data);
      setQty(repsonse.data.length);
    })
    .catch((err) => {console.log(err)});
  })
  */

  // onClick open up modal showing items within bag and sub total
  // have non functioning buttons that allow users to checkout
  const handleBagClick = () => {

  }

  return(
    <BannerContainer>
      <WebTitle>
        <Logo src={'/Logo/roguewhitee.png'}></Logo>
      </WebTitle>
      <CartContainer>
        <ThemeChanger onClick={handleThemeChange} >
        {currentTheme === 'light' ? <FiMoon size={28} style={{color: 'white'}}/> : <FiSun size={28} style={{color: 'white'}}/>}
        </ThemeChanger>
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

const Logo = styled.img`

`;
const AccountDiv = styled.div`
  margin-right: 15px;
  &:hover{
    opacity: 90%;
    cursor: pointer;
    transform: scale(0.96);
  }
`;
const CartBtn = styled.button`
  margin-right: ${props => props.marg};
  background-color: transparent;
  border: none;
  &:hover{
    opacity: 90%;
    cursor: pointer;
    transform: scale(0.96);
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
  background-color: #008C75;

`;

const ThemeChanger = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  // margin: 10px;
  color: #FFF;
`;
// display: flex;
// justify-content: space-bewteen;
// align-items: center;