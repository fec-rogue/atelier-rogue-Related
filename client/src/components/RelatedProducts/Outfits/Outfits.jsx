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
    let saved = localStorage.getItem('outfit');
    let initialVal = JSON.parse(saved);
    return initialVal || [];
  });

  useEffect(() => {
    axios.get(`products/info?product_id=${id}`)
      .then((res) => {
        // console.log('overview info', res.data)
        setOverviewData(res.data)
      })
      .catch((err) => {
        console.log('error while getting the data', err)
      })
  }, [])

  useEffect(() => {
    axios.get(`products/styles?product_id=${id}`)
      .then((res) => {
        // console.log('overview styles', res.data.results[0].photos[0])
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

    if(localStorage.getItem('outfit') === null) {
      let outfit = [];
      outfit.push(newOutfit);
      localStorage.setItem('outfit', JSON.stringify(outfit));
      setOutfit(outfit);
    }

    if(outfit.indexOf(`"id": ${newOutfit.id}`) === -1) {
      outfit = JSON.parse(outfit);
      outfit.push(newOutfit);
      localStorage.setItem('outfit', JSON.stringify(outfit));
      setOutfit(outfit);
      return;
    }
  }

  let handleUpdate = () => {
    let outfit = JSON.parse(localStorage.getItem('outfit'));
    setOutfit(outfit);
  }
   useEffect(() => {
     let outfit = JSON.parse(localStorage.getItem('outfit'));
     setOutfit(outfit);
   }, []);

  return (
    <div>
      <h1>My Collection</h1>
      <div>
        <button onClick={addOutfit}></button>
        <button onClick={addOutfit}></button>
          <strong></strong>
      </div>

      {outfit ? outfit.map((item) => (
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