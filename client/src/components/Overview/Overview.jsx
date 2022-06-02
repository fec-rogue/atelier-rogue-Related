import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import Gallery from './Gallery.jsx';
import Descriptions from './Descriptions.jsx';
import ExpandedView from './ExpandedView.jsx';
import Cart from './Cart.jsx';
import { FiSun, FiMoon } from 'react-icons/fi';

export const DescriptionsContext = createContext();

function Overview({handleThemeChange, currentTheme}) {

  const [styles, setProductStyles] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [expanded, setExpanded] = useState(false);
  const [cartItem, setCartItem] = useState(0);
  const {id, setId, allRatings, setAllRatings, curPhoto, setCurPhoto} = useContext(PropIdContext);

  useEffect(() => {
    axios.get('/products/styles', {params:{product_id:id}})
    .then((response) => {
      let result = [];
      let temp = [];
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i]["default?"]) {
          setDisplayed(response.data.results[i]);
        }
        if (i !== 0 && i % 4 === 0) {
          result.push(temp);
          temp = [];
        }
        temp.push(response.data.results[i]);
      }
      if (temp.length > 0) {
        result.push(temp);
      }
      setProductStyles(result);
    });
  }, [id]);


  return(
    <div>
      <DescriptionsContext.Provider
      value={{displayed, setDisplayed, styles, setProductStyles, expanded, setExpanded, curPhoto, setCurPhoto, cartItem, setCartItem}}>
      <Cart handleThemeChange={handleThemeChange} currentTheme={currentTheme}/>
      <AnnouncementHeader>FREE SHIPPING ON ORDERS OVER $100</AnnouncementHeader>
      {expanded ?
      <ExpandedContainer>
          <ExpandedView/>
      </ExpandedContainer> :
      <OverviewComps>
          <GalleryDiv>
            <Gallery/>
          </GalleryDiv>
          <DescriptionsDiv>
            <Descriptions/>
          </DescriptionsDiv>
      </OverviewComps>
      }
      </DescriptionsContext.Provider>
    </div>
  )
}

export default Overview;
const ExpandedContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const WebsiteHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const AnnouncementHeader = styled.h2`
  display: flex;
  justify-content: center;
  margin: 0;
  margin-bottom: 30px;
  padding: 5px;
  background-color: #FCFBF4;
`;

const OverviewComps = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ThemeChanger = styled.span`
  display: inline-block;
  padding: 20px 0 0 20px;
  cursor: pointer;
`;
const GalleryDiv = styled.div`
  width: 50%;
  margin-right: 30px;
`;
const DescriptionsDiv = styled.div`
  width: 20%;
`;