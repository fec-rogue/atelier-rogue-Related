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

function Overview() {

  const [styles, setProductStyles] = useState([])
  const [displayed, setDisplayed] = useState([])
  const {id, setId} = useContext(PropIdContext);

  useEffect(() => {
    axios.get('/products/styles', {params:{product_id:id}})
    .then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i]["default?"]) {
          setDisplayed(response.data.results[i]);
          response.data.results.splice(i, 1)
          setProductStyles(response.data.results);
          break;
        }
      }
    })
  }, [])

  return(
    <div>
      <WebsiteHeader>OVERVIEW</WebsiteHeader>
      <AnnouncementHeader>SITE-WIDE ANNOUNCEMENT</AnnouncementHeader>
      <OverviewComps>
        <DisplayedPhotoContext.Provider value={{displayed, setDisplayed}}>
          <ProductPic/>
        </DisplayedPhotoContext.Provider>
        <ProductDetails/>
      </OverviewComps>
    </div>
  )
}

export default Overview;

// pass productsList to carosal to render out each picture
// pass gallery to ProductPic and ProductDetails
// get product info and product styles in productDetails
// get product info in productPic to display stlye pics

