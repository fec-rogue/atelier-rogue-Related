import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SizeSelection from './SizeSelection.jsx';
import ProductStyleSel from './ProductStyleSel.jsx'
import {PropIdContext} from '../App.jsx';
import {StyledProductsContext, DisplayedPhotoContext} from './Overview.jsx'

function ProductDetails() {

  const {id, setId} = useContext(PropIdContext);
  const {styles, setProductStyles} = useContext(StyledProductsContext);
  const [productInfo, setProductInfo] = useState([]);
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [price, setPrice] = useState('0');
  const [sizeAndQty, setSizeAndQty] = useState({});

  useEffect(() => {
    axios.get('/products/info', {params:{product_id: id}})
    .then((response) => {
      console.log('styles: ', styles);
      console.log('displayed: ', displayed);
      setProductInfo(response.data);
    })
  }, [styles]);

  let renderPrice = () => {
    if (displayed.sale_price) {
      return(
        // make the sale price red
        <p><strike>${displayed.original_price}</strike> ${displayed.sale_price}</p>
      )
    } else {
      return(
        <p>${displayed.original_price}</p>
      )
    }
  };


  if (productInfo.length === 0) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return(
      <div>
        <TitleBlock>
          <h2>{productInfo.name}</h2>
          {renderPrice()}
          <p>* * * * * (46)</p>
        </TitleBlock>
        <SizeAndColor>
          <p><strong>Color: </strong>{displayed.name}</p>
          <ProductStyleSel/>
          <SizeSelection/>
        </SizeAndColor>
      </div>
    )
  }
}

// export to a separate style page lol....
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


export default ProductDetails;

