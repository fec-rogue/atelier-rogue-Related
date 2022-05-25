import React from 'react';
import { useState, useEffect } from "react";
import OutfitCarousel from './OutfitCarousel.jsx';

const Outfits = () => {
  const [outfit, setOutfit] = useState([]);
  window.localStorage.setItem('users', JSON.stringify({name:'Jessica', food:'pizza', age: 29}))
  const localItems = { ...localStorage };
  // console.log('localItems', localItems);
  // console.log('localGetItems', JSON.parse(window.localStorage.getItem('user')));
  const localArr = [];
  // Object.keys(localItems).,,

  return (
    <div></div>
  )
}

export default Outfits;