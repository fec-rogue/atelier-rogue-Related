import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DescriptionsContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
import CarouselB from './CarouselB.jsx'

// TODO: CarouselB overlaid on main pic,, make all pictures uniform

function Gallery() {

  const {displayed, setDisplayed} = useContext(DescriptionsContext);
  const [curPhoto, setCurPhoto] = useState([]);
  const {id, setId} = useContext(PropIdContext);

  useEffect(() => {
    if (!Array.isArray(displayed)) {
      console.log('displayed: ', displayed)
      setCurPhoto(displayed.photos[0])
    }
  }, [displayed])

  return (curPhoto.length === 0 || Array.isArray(displayed)) ?
  null :
  <PictureContainer>
    <CarouselB/>
    <MainPicDiv>
      <MainPicture src={curPhoto.url}></MainPicture>
    </MainPicDiv>
  </PictureContainer>

}

const PictureContainer = styled.div `
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const CarouselBContainer = styled.div`
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
  width: 70%;
  height: 90%;
  object-fit: cover;
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
