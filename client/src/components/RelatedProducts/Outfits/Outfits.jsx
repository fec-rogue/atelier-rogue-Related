import React from 'react';
import { useState, useEffect } from "react";

const Outfits = () => {
  const [outfit, setOutfit] = useState([]);
  // window.localStorage.setItem('users', JSON.stringify({name:'Jessica', food:'pizza', age: 29}))
  const localItems = { ...localStorage };
  // console.log('localItems', localItems);
  // console.log('localGetItems', JSON.parse(window.localStorage.getItem('user')));
  const localArr = [];
  // console.log(Object.keys(localItems));

  return (
    <div>Hello from Outfits</div>
  )
}

export default Outfits;