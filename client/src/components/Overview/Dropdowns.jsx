import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {DescriptionsContext} from './Overview.jsx';
import {FavoriteContext} from '../App.jsx';
import { BsHeartFill } from "react-icons/bs";

function Dropdowns () {
  const {displayed, cartItem, setCartItem} = useContext(DescriptionsContext);
  const [sizeAndQty, setSizeAndQty] = useState({});
  const [sizeSelected, setSizeSelected] = useState('');
  const [qtySelected, setQtySelected] = useState('');
  const [sku, setSku] = useState([]);
  const [cartValid, setCartValid] = useState(true);
  const [fave, setFave] = useState([]);

  useEffect(() => {
    var sizeQty = {};
    var skus = [];
    for (var props in displayed.skus) {
      if (sizeQty.hasOwnProperty(displayed.skus[props].size)) {
        sizeQty[displayed.skus[props].size] += displayed.skus[props].quantity;
      } else {
        sizeQty[displayed.skus[props].size] = displayed.skus[props].quantity;
      }
      skus.push(props);
    };
    setSizeAndQty(sizeQty);
    setQtySelected('');
    setSizeSelected('');
    setSku(skus);
  }, [displayed]);

  // updates size selected by user in size dropdown
  const handleSizeChange = (e) => {
    setSizeSelected(e.target.value);
    setQtySelected(1);
  };

  // updates qty selected by user in qty dropdown
  const handleQtyChange = (e) => {
    setQtySelected(e.target.value);
  }

  /*
  If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdowns
  */

 const handleCart = () => {
   var elem = '';
   if (sizeSelected === '') {
     setCartValid(false);
    } else {
      setCartValid(true);
      let skuId = Object.keys(sizeAndQty).indexOf(sizeSelected);
      setCartItem(cartItem+qtySelected);
      /*
      axios.post('/cart',{sku_id: sku[skuId]})
      .catch((err) => console.log(err))
      */
    }
  }

  // adds product to saved outfits in RelatedProducts section
  const handleFave = () => {
    setFave(displayed);
  }

  // conditionally renders quanitiy of product in qty dropdown based on SKU
  const renderQty = () => {
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

  return (Object.keys(displayed).length === 0) ?
  null :
    <SizeQtyDiv>
      <p><strong>Size: {sizeSelected}</strong></p>
      <Selector
        id ='sizes'
        name='sizes'
        onChange={handleSizeChange}
        required
        value={sizeSelected}>
        <option value='' disabled hidden>Select Size</option>
        {Object.keys(sizeAndQty).map((size, key) => {
          return (
            <option value={size} key={key}>{size}</option>
            )
          })}
      </Selector>
      {renderQty()}
      {cartValid === false ?
      <ErrorDiv>
        <ErrMsg role='alert'>Please Select A Size</ErrMsg>
      </ErrorDiv>
      : null}
      <CartDiv>
        {sizeAndQty[sizeSelected] === 0 ?
        <NoStockMsg>The items with the selected options is out of stock.</NoStockMsg>
        :<CartBtn onClick={handleCart}>ADD TO CART</CartBtn>
        }
        <FaveBtn onClick={handleFave}>
          <BsHeartFill />
        </FaveBtn>
      </CartDiv>
    </SizeQtyDiv>

}



// export on separate css page
const FaveBtn = styled.button`
  background-color: #008C75;
  color: #fff;
  font-weight: 400;
  border: 1px solid #008C75;
  border-radius: 3px;
  padding: 0;
  line-height: 0;
  font-size: 14px;
  height: 46px;
  text-transform: uppercase;
  text-align: center;
  width: 25%;
  &:hover {
    cursor: pointer;
    opacity: 93%;
  }
`;
const CartBtn = styled.button`
  background-color: #008C75;
  color: #fff;
  font-weight: 400;
  border: 1px solid #008C75;
  border-radius: 3px;
  padding: 0;
  line-height: 0;
  font-size: 14px;
  height: 46px;
  text-transform: uppercase;
  text-align: center;
  width: 70%;

  &:hover {
    cursor: pointer;
    opacity: 93%;
  }
`;

const CartDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-left: 0px;
  margin-bottom: 15px;
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
  &:hover {
    cursor: pointer;
  }
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
  background-color: #9e3533;
  color: #fff;
  font-family: DS Trade Gothic,Trade Gothic,sans-serif;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 3px;
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