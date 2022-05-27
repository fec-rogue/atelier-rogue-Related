import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
import Carousel from './Carousel.jsx'

// TODO: Carousel overlaid on main pic,, make all pictures uniform

function Gallery() {

  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const [curPhoto, setCurPhoto] = useState([]);
  const {id, setId} = useContext(PropIdContext);

  useEffect(() => {
    // find better conditions for if statement
    if (!Array.isArray(displayed)) {
      setCurPhoto(displayed.photos[0])
    }
  }, [displayed])

  return (curPhoto.length === 0 || Array.isArray(displayed)) ?
  null :
  <PictureContainer>
      <Carousel/>
    <MainPicture src={curPhoto.url}></MainPicture>
  </PictureContainer>

}

const PictureContainer = styled.div `
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const MainPicture = styled.img`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 70%;
  max-height: 700px;
  max-width: 400px;
  object-fit: contain;
  margin-right: 40px;
`;

const SidePic = styled.img`
  padding: 3px;
  width: 40%;
  height: 40%;
  object-fit: contain;
`;

const CurSidePic = styled.img`
padding: 3px;
width: 40%;
height: 40%;
object-fit: contain;
border: 2px solid;
`;


export default Gallery;
