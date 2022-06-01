import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext, createContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';
import MainCarousel from './MainCarousel.jsx';
import ExpandedView from './ExpandedView.jsx';


function Gallery() {

  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const {curPhoto, setCurPhoto} = useContext(DescriptionsContext);


  useEffect(() => {
    // if displayed contains a product, AND if curPhoto doesn't already have an index, set to first photo in product
    if (!Array.isArray(displayed) && curPhoto === '') {
      setCurPhoto(0)
    }
  }, [displayed]);

  return (curPhoto === '' || Array.isArray(displayed)) ?
  null :
  <PictureContainer>
    <MainPicDiv>
      <ThumbnailCarousel/>
      <MainCarousel/>
    </MainPicDiv>
  </PictureContainer>

}

const PictureContainer = styled.div `
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const MainPicDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainPicture = styled.img`
  width: 90%;
  height: 90%;
  max-height: 580px;
  max-width: 580px;
  object-fit: cover;
`;



export default Gallery;
