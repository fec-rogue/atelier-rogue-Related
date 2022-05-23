import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import {StyledProductsContext, DisplayedPhotoContext} from './Overview.jsx'


function ProductDetails() {

  const {id, setId} = useContext(PropIdContext);
  const {styles, setProductStyles} = useContext(StyledProductsContext);
  const [productInfo, setProductInfo] = useState([]);
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [price, setPrice] = useState('0');


  useEffect(() => {
    axios.get('/products/info', {params:{product_id: id}})
    .then((response) => {
      console.log('styles: ', styles);
      console.log('displayed: ', displayed);
      setProductInfo(response.data);
      if (displayed.sale_price) {
        setPrice(displayed.sale_price);
      } else {
        setPrice(displayed.original_price);
      }
    })
  }, [styles]);



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
          <p>${price}</p>
          <p>* * * * * (46)</p>
        </TitleBlock>
        <SizeAndColor>
          <p><strong>Color: </strong>{displayed.name}</p>
          <Field>
            <StyleDiv>
              {styles.map((rows) => {
                return rows.map((icon, key) => {
                  return <StyleCircle key={key}>
                    <label data-variant='image-circle' data-type='image'>
                      <input type='radio' name='color' value={icon.name} id={icon.name} />
                        <StyleColor src={icon.photos[0].thumbnail_url}></StyleColor>
                      </label>
                  </StyleCircle>
                })
              })}
            </StyleDiv>
          </Field>
        </SizeAndColor>
      </div>
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
const StyleCircle = styled.li`
  flex-direction: row;
`;

const StyleColor = styled.img`
  border-radius: 100px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const Field = styled.fieldset`
  display: block;
  border: 0;
`;



export default ProductDetails;

