import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {DisplayedPhotoContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';

function ProductPic() {

  const {displayed, setDisplayed} = useContext(DisplayedPhotoContext);
  const [curPhoto, setCurPhoto] = useState([]);
  const {id, setId} = useContext(PropIdContext);
  //const [change, setChange] = useState('false');

  // only want to re-render whenever a new picture is selected for this product
  useEffect(() => {
    console.log('curPhoto: ', curPhoto);
    if (!Array.isArray(displayed) && curPhoto.length === 0) {
      setCurPhoto(displayed.photos[0])
    }
  }, [displayed, curPhoto])

  // conditionally render info if displayed is empty
  // when there's no data, consider what image/error page should be displayed
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
        <img src={curPhoto.url}></img>
        {displayed.photos.map((thumbnails, key) => {
          if (thumbnails !== curPhoto) {
            return <img key={key} src={thumbnails.thumbnail_url} onClick={() => {setCurPhoto(thumbnails)}}></img>
          }
        })}
      </div>
    )
  }
}

export default ProductPic;

/*
import React from 'react';
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {GalleryContext} from './Overview.jsx'

function ProductPic() {
  const {gallery, setGallery} = useContext(GalleryContext);
  const [curPhoto, setCurPhoto] = useState([]);


  useEffect(() => {
    setCurPhoto(gallery[0]);
  })

  // conditionally render info if gallery is empty
  // when there's no data, consider what image/error page should be displayed
  // show an image placeholder when there's no data

  if (!curPhoto) {
    return (
      <h1>Loading</h1>
    )
  } else {
    console.log(gallery)
    return (
      <div>
        <p>ProductPic here</p>
        <img src={curPhoto.thumbnail_url}></img>
        {gallery.map((pic, key) => {
        })}
      </div>
    )
  }
}

export default ProductPic;
*/
