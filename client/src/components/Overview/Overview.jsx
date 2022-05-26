import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import Gallery from './Gallery.jsx';
import Descriptions from './Descriptions.jsx';

export const DescriptionsContext = createContext();

// TODO: Create cart, announcement header, website header
function Overview() {

  const [styles, setProductStyles] = useState([])
  const [displayed, setDisplayed] = useState([])
  const {id, setId} = useContext(PropIdContext);
  const {allRatings, setAllRatings} = useContext(PropIdContext);


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
    });
    axios.get('/reviews/meta', {params:{id}})
    .then((response) => {
      setRatings(response.data.ratings);
    })
  }, [id])

  return(
    <div>
      <WebsiteHeader>OVERVIEW</WebsiteHeader>
      <AnnouncementHeader>SITE-WIDE ANNOUNCEMENT</AnnouncementHeader>
      <OverviewComps>
        <DescriptionsContext.Provider value={{displayed, setDisplayed, styles, setProductStyles, styles, setProductStyles}}>
          <Gallery/>
          <Descriptions/>
        </DescriptionsContext.Provider>
      </OverviewComps>
    </div>
  )
}

export default Overview;

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
  justify-content: center;
`;

