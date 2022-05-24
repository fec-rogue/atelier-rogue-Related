import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DisplayedPhotoContext} from './Overview.jsx'

function ProductSizes() {
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
    clearInputs();
    setSizeSelected('');
  }, [displayed]);

  var handleSizeChange = function(e) {
    setSizeSelected(e.target.value.split(' ').join(''));
  };

  var clearInputs = function() {
    var sizeInputs = document.getElementsByName('size');
    sizeInputs.forEach((elem) => {
      elem.checked = false;
    })
  }

  if (Object.keys(sizeAndQty).length === 0) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
      <p><strong>Size: {sizeSelected}</strong></p>
        <GridDiv>
          {Object.keys(sizeAndQty).map((size, key) => {
            return (
              <SizeBox key={key} name={size}>
                <RadioButtons type='radio' name='size' value={size} onChange={handleSizeChange}/> {` ${size} `}
              </SizeBox>
            )
          })}
        </GridDiv>
      </div>

    )
  }
}


const GridDiv = styled.div`
    display: grid;
    justify-content: flex-start;
    grid-template-columns: repeat(auto-fill, 52px);
    grid-gap: 0;
    gap: 0;
    align-items: center;
    position: relative;
`;

// create hover function for size box, and change box color when a box is selected
const RadioButtons = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const Field = styled.fieldset`
  display: block;
  border: 0;
`;

const SizeBox = styled.label`
  display: inline-block;
  text-align: center;
  background-color: transparent;
  font-family: DS Trade Gothic,Trade Gothic,sans-serif;
  margin-bottom: 30px;
  margin: 5px;
  height: 40px;
  line-height: 44px;
  box-sizing: content-box;
  border-width: 1px;
  border: 0.5px solid #7e858b;

`;


export default ProductSizes;
