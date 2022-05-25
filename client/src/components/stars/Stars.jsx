import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import StarDiv from './StarDiv.jsx';

// Expects a number
const Stars = (rating) => {
  return  (
    <StarDiv rating={rating}>★★★★★</StarDiv>
  )
}

export default Stars;