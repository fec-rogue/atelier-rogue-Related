import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import ProductPic from './ProductPic.jsx';
import ProductDetails from './ProductDetails.jsx';

const WebsiteHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const AnnouncementHeader = styled.h2`
  display: flex;
  justify-content: center;
`;

const OverviewComps = styled.div`
  display: flex;
`;

export const DisplayedPhotoContext = createContext();
export const StyledProductsContext = createContext();

function Overview() {

  const [styles, setProductStyles] = useState([])
  const [displayed, setDisplayed] = useState([])
  const {id, setId} = useContext(PropIdContext);

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
      setProductStyles(result);
    })
  }, [id])

  return(
    <div>
      <WebsiteHeader>OVERVIEW</WebsiteHeader>
      <AnnouncementHeader>SITE-WIDE ANNOUNCEMENT</AnnouncementHeader>
      <OverviewComps>
        <DisplayedPhotoContext.Provider value={{displayed, setDisplayed}}>
          <ProductPic/>
          <StyledProductsContext.Provider value={{styles, setProductStyles}}>
            <ProductDetails/>
          </StyledProductsContext.Provider>
        </DisplayedPhotoContext.Provider>
      </OverviewComps>
    </div>
  )
}

export default Overview;


