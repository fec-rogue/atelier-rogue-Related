import React from 'react';
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
//import {displayedProductContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';

function ProductDetails() {

  //const {displayed, setDisplayed} = useContext(displayedProductContext);
  const {id, setId} = useContext(PropIdContext);

  return(
    <div>
      <p>ProductDetails Here</p>
    </div>
  )
}

export default ProductDetails;

