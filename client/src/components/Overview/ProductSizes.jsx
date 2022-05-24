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
      <Field>
        <StyleDiv>
          {Object.keys(sizeAndQty).map((size, key) => {
            return <SizeList key={key}>
              <RadioButtons type='radio' value={size} name='size'/>
              <label><span>{size}</span></label>
            </SizeList>
          })}
        </StyleDiv>
      </Field>
    )
  }
}

const ProductDetailDiv = styled.div`
  display: flex;
`;

const TitleBlock = styled.div`
  display: block;
  border-bottom: 0.5px solid;
`;

const SizeAndColor = styled.div`
  display: block;
  border-bottom: 0.5px solid;
`;

const StyleDiv = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const SizeList = styled.li`
  flex-direction: row;
`;

const StyleColor = styled.img`
  border-radius: 100px;
  border: 1px solid;
  padding: 3px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const RadioButtons = styled.input`
  opacity: 0;
`;

const Field = styled.fieldset`
  display: block;
  border: 0;
`;


export default ProductSizes;
