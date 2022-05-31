import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext, createContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
import ThumbnailCarousel from './ThumbnailCarousel.jsx';
import MainCarouselC from './MainCarouselC.jsx';


function Gallery() {

  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const {id, setId} = useContext(PropIdContext);
  const [curPhoto, setCurPhoto] = useState('');

  useEffect(() => {
    if (!Array.isArray(displayed)) {
      setCurPhoto(0)
    }
  }, [displayed])

  return (curPhoto === '' || Array.isArray(displayed)) ?
  null :
  <PictureContainer>
      <ThumbnailCarousel cur={curPhoto} setCur={setCurPhoto}/>
      <MainPicDiv>
        <MainCarouselC cur={curPhoto} setCur={setCurPhoto}/>
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
