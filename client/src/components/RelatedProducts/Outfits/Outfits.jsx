import React from 'react';
import { useState, useEffect, useContext } from "react";
import {PropIdContext} from '../../App.jsx';
import axios from 'axios';
import styled from 'styled-components';
import AverageStars from '../../stars/AverageStars.jsx';
import OutfitEntry from './OutfitEntry.jsx';
import { FcPrevious,  FcNext } from "react-icons/fc";

const Outfits = () => {
  const {id, setId} = useContext(PropIdContext);
  const {allRatings, setAllRatings} = useContext(PropIdContext);
  const [overviewData, setOverviewData] = useState([]);
  const [overviewStyles, setOverviewStyles] = useState([]);

  const [outfit, setOutfit] = useState(JSON.parse(localStorage.getItem('outfit')) ?
  JSON.parse(localStorage.getItem('outfit')) : [])

  const [current, setCurrent] = useState(0);
  const length = outfit.length;
  const prevArrow = () => {
    setCurrent(current === 0 ? length -1 : current -1)
  };

  const nextArrow = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  };

  const max = current + 1;
  const min = current;

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
    var count = 0;
    for(var i = 0; i < outfit.length; i++) {
      if(outfit[i].url === overviewStyles.url) {
        count ++;
        return;
      }
    }
    if(count === 0) {
      const imageNotFound = "http://placecorgi.com/260/180";
      let newOutfit = {};
        newOutfit.id = overviewData.id;
        newOutfit.name = overviewData.name;
        newOutfit.category = overviewData.category;
        newOutfit.default_price = overviewData.default_price
        newOutfit.image = overviewStyles.url || imageNotFound;

      var currentOutfit = outfit.slice();
      currentOutfit.push(newOutfit);
      localStorage.setItem('outfit', JSON.stringify(currentOutfit));
      setOutfit(prev => [...prev, newOutfit])
    }
  }


  return (
    <OutfitsWrapper>
      <button onClick={addOutfit}>Add outfit</button>
      { current !== 0 ? <FcPrevious onClick={prevArrow}/> : null }
      { max !== length -1 ?  <FcNext onClick={nextArrow}/> : null }

      {outfit.length > 0 && allRatings ?
        outfit.map((item, index) => (
          index <= max && index >= min &&
          <OutfitEntry
            key={index}
            item={item}
            setOutfit={setOutfit}
            ratings = {AverageStars(allRatings.ratings)}
          />
         ))
        : ''}
    </OutfitsWrapper>
  )
}

const OutfitsWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: auto;
  position: relative;
`


const Outfitscontainer = styled.div`
position: relative;
width: 200px;
height: 415px;
margin: 0px;
padding: 0px;
transitions: .5s;
scroll-behavior: smooth;
`;

const PrevButton = styled.button`
position: absolute;
top: 0;
bottom: 0;
z-index: 1;
cursor:pointer;
user-select:none;
`

const NextButton = styled.button`
  right:32px;
  position: absolute;
  top: 50%;
  bottom: 0;
  z-index: 1;
  cursor:pointer;
  user-select:none;
`


export default Outfits;