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
    (<Selector name='qty' value={qtySelected} >
      <option value='' disabled hidden>-</option>
    </Selector>)
    : (sizeAndQty[sizeSelected] === 0) ?
    (<Selector name='qty' value={qtySelected} disabled>
      <option value='' disabled hidden>OUT OF STOCK</option>
    </Selector>)
    : (<Selector name='qty' required value={qtySelected} onChange={handleQtyChange}>
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



  return(
    <SizeQtyDiv>
      <p><strong>Size: {sizeSelected}</strong></p>
      <Selector name='sizes' onChange={handleSizeChange} required value={sizeSelected}>
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
    </SizeQtyDiv>
  )
}

// export on separate css page

const SizeQtyDiv = styled.div`
  display: flex
  justify-content: space-between;
`;

const Selector = styled.select`
  padding: 7px;
  margin: 5px;
  margin-top: 0px;
`;

export default SizeSelection;