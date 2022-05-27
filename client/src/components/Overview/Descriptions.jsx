import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdowns from './Dropdowns.jsx';
import StyleSelection from './StyleSelection.jsx'
import {PropIdContext} from '../App.jsx';
import {DescriptionsContext} from './Overview.jsx';
import AverageStars from '../stars/AverageStars.jsx'


// TODO: Share on social media buttons, description of products (toggle box)
function Descriptions() {

  const {styles, setProductStyles, displayed, setDisplayed} = useContext(DescriptionsContext);
  const {id, setId, allRatings, setallRatings} = useContext(PropIdContext);
  const [price, setPrice] = useState('0');
  const [productInfo, setProductInfo] = useState([]);
  const [sizeAndQty, setSizeAndQty] = useState({});


  useEffect(() => {
    axios.get('/products/info', {params:{product_id: id}})
    .then((response) => {
      setProductInfo(response.data);
    });
  }, [styles]);

  // render price of product, marking price as red if on sale
  let renderPrice = () => {
    return (displayed.sale_price) ?
    (<p>
      <strike>${displayed.original_price}</strike>
      <strong style={{ color: 'red' }}>${displayed.sale_price}</strong>
    </p>) :
    (<p>${displayed.original_price}</p>)
  };

  return (productInfo.length === 0 || Object.keys(allRatings).length === 0) ?
  <div>Loading...</div> :
  (<div>
    <TitleBlock>
      <h2>{productInfo.name}</h2>
      <p>{productInfo.category}</p>
      {renderPrice()}
      <StarsDiv>
        {AverageStars(allRatings.ratings)}
      </StarsDiv>
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

const StarsDiv = styled.div`
  display: flex;
  margin: 5px;
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

