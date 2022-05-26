import React from 'react';
import { useState, useEffect, useContext } from "react";
import {PropIdContext} from '../../App.jsx';
import axios from 'axios';
import styled from 'styled-components';
import OutfitCarousel from './OutfitCarousel.jsx';

const Outfits = () => {
  const {id, setId} = useContext(PropIdContext);
  const [overviewData, setOverviewData] = useState([]);
  const [overviewStyles, setOverviewStyles] = useState([]);
  const [outfit, setOutfit] = useState(() => {
    let saved = JSON.parse(localStorage.getItem('outfit'));
    return saved || [];
  });

  useEffect(() => {
    axios.get(`products/info?product_id=${id}`)
      .then((res) => {
        setOverviewData(res.data)
      })
      .catch((err) => {
        console.log('error while getting the data', err)
      })
  }, [])

  useEffect(() => {
    axios.get(`products/styles?product_id=${id}`)
      .then((res) => {
        setOverviewStyles(res.data.results[0].photos[0])
      })
      .catch((err) => {
        console.log('error while getting the data', err)
      })
  }, [])

  const addOutfit = () => {
    const imageNotFound = "http://placecorgi.com/260/180";
    let newOutfit = {};
    newOutfit.id = overviewData.id;
    newOutfit.name = overviewData.name;
    newOutfit.category = overviewData.category;
    newOutfit.default_price = overviewData.default_price;
    newOutfit.image = overviewStyles.url || imageNotFound;

    localStorage.setItem('outfit', JSON.stringify(newOutfit));
    setOutfit(outfit);

    // if(outfit.indexOf(`"id": ${newOutfit.id}`) === -1) {
    //   console.log('outfit', outfit)
    //   outfit = JSON.parse(outfit);
    //   outfit.push(newOutfit);
    //   localStorage.setItem('outfit', JSON.stringify(outfit));
    //   setOutfit(outfit);
    //   return;
    // }
  }

  let handleUpdate = () => {
    let outfit = JSON.parse(localStorage.getItem('outfit'));
    setOutfit([outfit]);
  }



   useEffect(() => {
     let outfit = JSON.parse(localStorage.getItem('outfit'));
     setOutfit([outfit]);
   }, []);

  //  console.log('outfit', outfit)
  return (
    <div>
      <h1>My Collection</h1>
      <div>
        <button onClick={addOutfit}>Add outfit</button>

      </div>

      {outfit.length > 0 ?
        outfit.map((item) => (
          <OutfitCarousel
            key={item.id}
            item={item}
            handleUpdate={handleUpdate} />
         ))
        : ''}
    </div>
  )
}

export default Outfits;