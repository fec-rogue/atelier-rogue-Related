import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import Gallery from './Gallery.jsx';
import Descriptions from './Descriptions.jsx';
import ExpandedView from './ExpandedView.jsx';

export const DescriptionsContext = createContext();

// TODO: Create cart, announcement header, website header
function Overview() {

  const [styles, setProductStyles] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [expanded, setExpanded] = useState(false);
  const [curPhoto, setCurPhoto] = useState('');
  const {id, setId, allRatings, setAllRatings} = useContext(PropIdContext);

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
  }, [id])

  return(
    <div>
      <WebsiteHeader>OVERVIEW</WebsiteHeader>
      <AnnouncementHeader>SITE-WIDE ANNOUNCEMENT</AnnouncementHeader>
      <DescriptionsContext.Provider
      value={{displayed, setDisplayed, styles, setProductStyles, expanded, setExpanded, curPhoto, setCurPhoto}}>
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
`;

const OverviewComps = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
`;

const GalleryDiv = styled.div`
  width: 60%;
`;
const DescriptionsDiv = styled.div`
  width: 30%;
`;