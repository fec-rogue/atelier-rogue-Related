import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DisplayedPhotoContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';

const PictureContainer = styled.div `
  display: flex;
  justify-content: flex-start;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  margin-right: -15%;
`;

const MainPicture = styled.img`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 70%;
  max-height: 1000px;
  max-width: 800px;
  object-fit: contain;
`;

const SidePic = styled.img`
  padding: 3px;
  width: 40%;
  height: 40%;
  object-fit: contain;
`;

function ProductPic() {

  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [curPhoto, setCurPhoto] = useState([]);
  const {id, setId} = useContext(PropIdContext);

  useEffect(() => {

    // find better conditions for if statement
    if (!Array.isArray(displayed) && curPhoto.length === 0) {
      setCurPhoto(displayed.photos[0])
    }
  }, [displayed, curPhoto])

  // conditionally render info if displayed is empty
  // when there's no data, image/error page should be displayed
  // show an image placeholder when there's no data

  if (curPhoto.length === 0 || Array.isArray(displayed)) {
    console.log('loading')
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  } else {
    return(
      <PictureContainer>
        <CarouselContainer>
          {displayed.photos.map((thumbnails, key) => {
            if (thumbnails !== curPhoto) {
              return <SidePic key={key} src={thumbnails.thumbnail_url} onClick={() => {setCurPhoto(thumbnails)}}></SidePic>
            }
          })}
        </CarouselContainer>
        <MainPicture src={curPhoto.url}></MainPicture>
      </PictureContainer>
    )
  }

}

export default ProductPic;
