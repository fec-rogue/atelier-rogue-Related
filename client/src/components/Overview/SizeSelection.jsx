import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DisplayedPhotoContext} from './Overview.jsx'

function SizeSelection () {
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [sizeAndQty, setSizeAndQty] = useState({});
  const [sizeSelected, setSizeSelected] = useState('');

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


  return(
    <div>
      <p><strong>Size: {sizeSelected}</strong></p>
      <StyleSelector name='sizes' onChange={handleSizeChange} required value={sizeSelected}>
        <option value='' disabled hidden>Select Size</option>
        {Object.keys(sizeAndQty).map((size, key) => {
            return (
              <option value={size} key={key}>{size}</option>
            )
          })}
      </StyleSelector>
    </div>
  )
}

const StyleSelector = styled.select`
  padding: 7px;
  margin: 5px;
  margin-top: 0px;
`;

export default SizeSelection;