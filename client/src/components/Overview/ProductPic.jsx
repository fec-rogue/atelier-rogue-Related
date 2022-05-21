import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import {DisplayedPhotoContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';


const MainPicture = styled.img`
  display: flex;
  flex-wrap: wrap;
  width: 35%;
  heigh: 35%;
  object-fit: contain;
`;

const SidePic = styled.img`
  flex: 33.33%;
  padding: 5px;
  width: 10%;
  heigh: 10%;
  object-fit: contain;
`;

function ProductPic() {

  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [curPhoto, setCurPhoto] = useState([]);
  const {id, setId} = useContext(PropIdContext);

  useEffect(() => {
    console.log('curPhoto: ', curPhoto);

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
      <div>
        <MainPicture src={curPhoto.url}></MainPicture>
        {displayed.photos.map((thumbnails, key) => {
          if (thumbnails !== curPhoto) {
            return <SidePic key={key} src={thumbnails.thumbnail_url} onClick={() => {setCurPhoto(thumbnails)}}></SidePic>
          }
        })}
      </div>
    )
  }
}

export default ProductPic;
