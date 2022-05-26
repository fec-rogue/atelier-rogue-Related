import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Stars from './Stars.jsx';


// StaticStars expects an object
// Returns the average ratings of all reviews
const AverageStars = (ratings) => {

const currentStars = (ratings) => {

  let average = 0;
  let count = 0;
  const keys = Object.keys(ratings);

  keys.forEach((rating) => {
    average += Number(rating) * Number(ratings[rating]);
    count += Number(ratings[rating]);
  })

  average = (Math.round((average / count) * 4) / 4).toFixed(2);
  return average;
}


  return (
    <div>
      {Stars(currentStars(ratings))}
    </div>
    )
  }
  /*
  <Stars average={currentStars(ratings)} />
 */
export default AverageStars;