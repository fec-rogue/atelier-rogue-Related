import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdowns from './Dropdowns.jsx';
import StyleSelection from './StyleSelection.jsx'
import {PropIdContext} from '../App.jsx';
import {StyledProductsContext, DisplayedPhotoContext, RatingsContext} from './Overview.jsx';
import AverageStars from '../stars/AverageStars.jsx'
import Stars from '../stars/Stars.jsx'

// TODO: Share on social media buttons, description of products (toggle box)
function Descriptions() {

  const {id, setId} = useContext(PropIdContext);
  const {styles, setProductStyles} = useContext(StyledProductsContext);
  const [productInfo, setProductInfo] = useState([]);
  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [price, setPrice] = useState('0');
  const [sizeAndQty, setSizeAndQty] = useState({});
  const {ratings, setRatings} = useContext(RatingsContext);

  useEffect(() => {
    axios.get('/products/info', {params:{product_id: id}})
    .then((response) => {
      setProductInfo(response.data);
    });
  }, [styles]);

  let renderPrice = () => {
    return (displayed.sale_price) ?
    (<p>
      <strike>${displayed.original_price}</strike>
      <strong style={{ color: 'red' }}>${displayed.sale_price}</strong>
    </p>) :
    (<p>${displayed.original_price}</p>)
  };

  return (productInfo.length === 0) ?
  <div>Loading...</div> :
  (<div>
    <TitleBlock>
      <h2>{productInfo.name}</h2>
      <p>{productInfo.category}</p>
      {renderPrice()}
      {AverageStars(ratings)}
    </TitleBlock>
    <SizeAndColor>
      <p><strong>Color: </strong>{displayed.name}</p>
      <StyleSelection/>
      <Dropdowns/>
    </SizeAndColor>
  </div>)


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


export default Descriptions;

