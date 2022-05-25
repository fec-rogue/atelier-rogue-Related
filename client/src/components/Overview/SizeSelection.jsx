import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DisplayedPhotoContext} from './Overview.jsx'

function SizeSelection () {
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [sizeAndQty, setSizeAndQty] = useState({});
  const [sizeSelected, setSizeSelected] = useState('');
  const [qtySelected, setQtySelected] = useState('');

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
    setSizeSelected('');
  }, [displayed]);

  var handleSizeChange = function(e) {
    setSizeSelected(e.target.value);
  };

  var handleQtyChange = function(e) {
    setQtySelected(e.target.value);
  }

  var renderQty = function() {
    let max = sizeAndQty[sizeSelected];
    if (sizeAndQty[sizeSelected] >= 15) {
      max = 15;
    }
    return (sizeSelected === '') ?
    (<Selector id='qty' name='qty' value={qtySelected} onChange={handleQtyChange}>
      <option value='' disabled hidden>-</option>
    </Selector>)
    : (sizeAndQty[sizeSelected] === 0) ?
    (<Selector id='qty' name='qty' value={qtySelected} disabled>
      <option value='' disabled hidden>OUT OF STOCK</option>
    </Selector>)
    : (<Selector id='qty' name='qty'required value={qtySelected} onChange={handleQtyChange}>
        <option value='' disabled hidden>-</option>
        {(() => {
        const options = [];
        for (let i = 1; i <= max; i++) {
          options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
        })()}
      </Selector>)
  }

  /*
  If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdown, and a message should appear above the dropdown stating “Please select size”
  If there is no stock: This button should be hidden
  If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.
  */

  // if size isnt selected yet
    // guide users to qty box
  // if size IS selected:
    // if no item in stock --> hide button
    // if addCart is clicked without qty being set --> guid user to qty
    // if valid --> add item
  var handleCart = function() {

    var elem = '';
    if (sizeSelected === '') {
      elem = document.getElementById('sizes');
      elem.scrollIntoView({
        behavior: "smooth",
      })
      alert('Select a size and qty');
    } else {
      if (qtySelected === '') {
        elem = document.getElementById('qty');
        elem.scrollIntoView({
          behavior: "smooth",
        })
        alert('Select a qty');
      } else {
        console.log('added');
      }
    }
  }


  return(
    <SizeQtyDiv>
      <p><strong>Size: {sizeSelected}</strong></p>
      <Selector id ='sizes' name='sizes' onChange={handleSizeChange} required value={sizeSelected}>
        <option value='' disabled hidden>Select Size</option>
        {Object.keys(sizeAndQty).map((size, key) => {
          if (sizeAndQty[size] === 0) {
            return (null)
          } else {
            return (
              <option value={size} key={key}>{size}</option>
            )
          }
          })}
      </Selector>
      {renderQty()}
      <CartDiv>
        <CartBtn onClick={handleCart}>ADD TO CART</CartBtn>
      </CartDiv>
    </SizeQtyDiv>
  )
}

// export on separate css page
const CartBtn = styled.button`

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

export default SizeSelection;