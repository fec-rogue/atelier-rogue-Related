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
    console.log('sizeQty: ',sizeQty);
    setSizeAndQty(sizeQty);

  }, [displayed]);

  return (
    <Field>
      <StyleDiv>
        {Object.keys(sizeAndQty).map((size, key) => {
          <li>test</li>
        })}
      </StyleDiv>
    </Field>
  )
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
const StyleCircle = styled.li`
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
/*
let renderSizeComp = function() {
    // loop through default.skus.size for size text and create a box for each size
    // if quantity of each size is 0, put sikethrough the box and don't let users select
    var sizeQty = {};
    for (var props in displayed.skus) {
      if (sizeQty.hasOwnProperty(displayed.skus[props].size)) {
        sizeQty[displayed.skus[props].size] += displayed.skus[props].quantity;
      } else {
        sizeQty[displayed.skus[props].size] = displayed.skus[props].quantity;
      }
    };
    setSizeAndQty(sizeQty);

    /*
    for (var props in displayed.skus) {
      sizes.push(default.skus[props][size]);
      qty.push(default.skus[props][quantity]);
    }
    console.log('size arr: ',sizes);
    console.log('qty arr: ',qty);
    /*
    return (
      <Field>
        <StyleDiv>
          {Object.keys(sizeAndQty).map((size, key) => {
            if (sizeAndQty.size === 0) {
              return (
                <input key={key} type='radio' value={sizeAndQty.size} disabled='disabled'>
                  <label>
                    <span>{sizeAndQty.size}</span>
                  </label>
                </input>
              )
            } else {
              <input key={key} type='radio' value={sizeAndQty.size}>
                <label>
                  <span>{sizeAndQty.size}</span>
                </label>
              </input>
            }
          })}
        </StyleDiv>
      </Field>
    )

  }
*/