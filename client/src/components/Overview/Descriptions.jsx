import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Dropdowns from './Dropdowns.jsx';
import StyleSelection from './StyleSelection.jsx'
import {PropIdContext} from '../App.jsx';
import {DescriptionsContext} from './Overview.jsx';
import AverageStars from '../stars/AverageStars.jsx'
import {BsFacebook, BsTwitter, BsPinterest} from 'react-icons/bs';


// TODO: Share on social media buttons, description of products (toggle box)
function Descriptions() {

  const {styles, setProductStyles, displayed, setDisplayed} = useContext(DescriptionsContext);
  const {id, setId, allRatings, setallRatings} = useContext(PropIdContext);
  const [price, setPrice] = useState('0');
  const [productInfo, setProductInfo] = useState([]);
  const [sizeAndQty, setSizeAndQty] = useState({});
  const [isCol, setCol] = useState(false);


  useEffect(() => {
    axios.get('/products/info', {params:{product_id: id}})
    .then((response) => {
      setProductInfo(response.data);
    });

  }, [styles]);


  return (productInfo.length === 0 || Object.keys(allRatings).length === 0) ?
  <div>Loading...</div> :
  (<div>
    <TitleBlock>
        <Name>{productInfo.name}</Name>
      <StarsDiv>
        {AverageStars(allRatings.ratings)}
        <AvgBtn onClick={() => document.getElementById('reviews').scrollIntoView()}>   ({allRatings.avg})</AvgBtn>
      </StarsDiv>
      <p>{productInfo.category}</p>
      {(displayed.sale_price) ?
        <p>
          <strike>${displayed.original_price}</strike>
          <strong style={{ color: '#9e3533' }}> ${displayed.sale_price}</strong>
        </p>:
        <p>${displayed.original_price}</p>
       }
    </TitleBlock>
    <SizeAndColor>
      <p><strong>Color: </strong>{displayed.name}</p>
      <StyleSelection/>
      <Dropdowns/>
    </SizeAndColor>
    <DescAccordion>
      <div>
        <DescTitle onClick={() => {setCol(!isCol)}}>
          <div>DESCRIPTION</div>
          <div>{isCol ? '-' : '+'}</div>
        </DescTitle>
        {isCol && <div>
          <p><strong>{productInfo.slogan}</strong></p>
          <p>{productInfo.description}</p>
        </div>}
      </div>
    </DescAccordion>
    <SocialsDiv>
      <SocialsBtn>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button"
        data-text="Checkout this out"
        ata-show-count="false"
        ><BsTwitter size={28} style={{color:'#00acee'}}/></a>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </SocialsBtn>
      <SocialsBtn>
        <div
        className="fb-share-button"
        data-href="http://localhost:3000/"
        data-layout="button_count"
        data-size="small">
          <a target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore"><BsFacebook size={28} style={{color: '#4267B2'}}/></a></div>
      </SocialsBtn>
      <SocialsBtn>
        <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"><BsPinterest size={28} style={{color:'#E60023'}}/></a>
      </SocialsBtn>
    </SocialsDiv>
  </div>)

}


// export to a separate style page lol....

const AvgBtn = styled.button`
  border: none;
  background: none;
  &:hover {
    color: gray
  }
`;
const Name = styled.h2`
  margin-bottom: 10px;
`
const SocialsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px;
`;

const SocialsBtn = styled.div`
  margin-right: 15px;
`;
const DescAccordion = styled.div`
  border-bottom: 0.5px solid;
  padding: 15px;
  font-family: "Neuzeit-Grotesk","Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
`;
const DescTitle = styled.div`
  display: flex;
  justify-content: space-between;

`;
const ProductDetailDiv = styled.div`
  display: flex;
`;
const StarsDiv = styled.div`
  display: flex;
  scroll-behavior: smooth;
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

