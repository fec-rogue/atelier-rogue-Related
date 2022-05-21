import React from 'react';
<<<<<<< HEAD
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
//import {displayedProductContext} from './Overview.jsx'
import {PropIdContext} from '../App.jsx';
=======
import { useEffect, useState } from "react";
import axios from 'axios';
>>>>>>> main

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

