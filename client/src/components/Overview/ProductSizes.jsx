import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DisplayedPhotoContext} from './Overview.jsx'

function ProductSizes() {
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [sizeAndQty, setSizeAndQty] = useState({});

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
  }, [displayed]);

  if (Object.keys(sizeAndQty).length === 0) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
        {Object.keys(sizeAndQty).map((size, key) => {
          return (
            <label value={key} name={size}>
              <input id={key} type='radio'/>{size}
            </label>
          )
        })}
      </div>
    )
  }
}

/*
<Field>
  <StyleDiv>
    {Object.keys(sizeAndQty).map((size, key) => {
      return <SizeList key={key}>
        <RadioButtons type='radio' value={size} name='size'/>
        <SizeBox><span>{size}</span></SizeBox>
      </SizeList>
    })}
  </StyleDiv>
</Field>
*/

const GridDiv = styled.div`
    display: grid;
    justify-content: flex-start;
    grid-template-columns: repeat(auto-fill, 52px);
    grid-gap: 0;
    gap: 0;
    align-items: center;
    margin: -5px;
    position: relative;
`;

const SizeList = styled.li`
  flex-direction: row;
`;

const RadioButtons = styled.input`
  opacity: 0;
`;

const Field = styled.fieldset`
  display: block;
  border: 0;
`;

const SizeBox = styled.label`
  text-align: center;
  background-color: transparent;
  font-family: DS Trade Gothic,Trade Gothic,sans-serif;
  letter-spacing: .6px;
`;


export default ProductSizes;
