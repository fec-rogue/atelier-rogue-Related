import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DescriptionsContext} from './Overview.jsx';
import {FavoriteContext} from '../App.jsx';
import { BsHeartFill } from "react-icons/bs";

function Dropdowns () {
  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const [sizeAndQty, setSizeAndQty] = useState({});
  const [sizeSelected, setSizeSelected] = useState('');
  const [qtySelected, setQtySelected] = useState('');
  const [cartValid, setCartValid] = useState(true);
  // going to need a cache/local storage to keep track of which items have already been faved

  useEffect(() => {
    var sizeQty = {};
    for (var props in displayed.skus) {
      if (sizeQty.hasOwnProperty(displayed.skus[props].size)) {
        sizeQty[displayed.skus[props].size] += displayed.skus[props].quantity;
      } else {
        sizeQty[displayed.skus[props].size] = displayed.skus[props].quantity;
      }
    };
    setSizeAndQty(sizeQty);
    setQtySelected('');
    setSizeSelected('');
  }, [displayed]);

  var handleSizeChange = function(e) {
    setSizeSelected(e.target.value);
    setQtySelected(1);
  };

  var handleQtyChange = function(e) {
    setQtySelected(e.target.value);
  }

  /*
  If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdowns
  */

 var handleCart = function() {
   var elem = '';
   if (sizeSelected === '') {
     setCartValid(false);
    } else {
      setCartValid(true);
      console.log('added to cart');
    }
  }
/*
  var handleFave = function() {
    console.log('clicked');
    setFave(displayed);
  }
*/
  var renderQty = function() {
    let max = sizeAndQty[sizeSelected];
    if (sizeAndQty[sizeSelected] >= 15) {
      max = 15;
    };
    return (sizeSelected === '') ?
    (<Selector id='qty' name='qty' value={qtySelected} onChange={handleQtyChange}>
      <option value='' disabled hidden>-</option>
    </Selector>)
    : (sizeAndQty[sizeSelected] === 0) ?
    (<Selector id='qty' name='qty' value={qtySelected} disabled>
      <option value='' disabled hidden>OUT OF STOCK</option>
    </Selector>)
    : (<Selector id='qty' name='qty'required value={qtySelected} onChange={handleQtyChange}>
        {(() => {
        const options = [];
        for (let i = 1; i <= max; i++) {
          options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
        })()}
      </Selector>)
  }
  return(
    <SizeQtyDiv>
      {cartValid === false ?
      <ErrorDiv>
        <ErrMsg role='alert'>Please Select A Size</ErrMsg>
      </ErrorDiv>
      : null}
      <p><strong>Size: {sizeSelected}</strong></p>
      <Selector id ='sizes' name='sizes' onChange={handleSizeChange} required value={sizeSelected}>
        <option value='' disabled hidden>Select Size</option>
        {Object.keys(sizeAndQty).map((size, key) => {
          return (
              <option value={size} key={key}>{size}</option>
          )
          })}
      </Selector>
      {renderQty()}
      <CartDiv>
        {sizeAndQty[sizeSelected] === 0 ?
        <NoStockMsg>The items with the selected options is out of stock.</NoStockMsg>
        :<CartBtn onClick={handleCart}>ADD TO CART</CartBtn>
        }

      </CartDiv>
    </SizeQtyDiv>
  )
}

/*
        <FaveBtn onClick={handleFave}>
          <BsHeartFill />
        </FaveBtn>
        */
// export on separate css page
const FaveBtn = styled.button`
  background-color: #000;
  color: #fff;
  font-weight: 400;
  border: 1px solid #2B2E34;
  padding: 0;
  line-height: 0;
  font-size: 14px;
  height: 46px;
  text-transform: uppercase;
  text-align: center;
  width: 25%;
`;
const CartBtn = styled.button`
  background-color: #000;
  color: #fff;
  font-weight: 400;
  border: 1px solid #2B2E34;
  padding: 0;
  line-height: 0;
  font-size: 14px;
  height: 46px;
  text-transform: uppercase;
  text-align: center;
  width: 70%;
`;

const CartDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  margin-left: 0px;
  margin-top: 35px;

`;
const SizeQtyDiv = styled.div`
  display: flex
  justify-content: space-between;
`;

const Selector = styled.select`
  padding: 7px;
  margin: 5px;
  margin-top: 0px;
  margin-left: 0px;
`;

const ErrorDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px;
`

const ErrMsg = styled.p`
  display: block;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  background-color: #c00;
  border-radius: 0;
  color: #fff;
  font-family: DS Trade Gothic,Trade Gothic,sans-serif;
  font-weight: 700;
  padding: 10px 20px;
  font-weight: 400;
`;

const NoStockMsg = styled.p`
  color: #aa2525;
  display: inline-block;
  font-size: 11px;
  margin-bottom: 15px;
  background: 0 0;
  border: 2px solid transparent;
  border-radius: 10px;
  background-clip: padding-box;

`;
export default Dropdowns;