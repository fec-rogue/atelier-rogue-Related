import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

const DisplayOverallRating = ({starRating}) => {
  if (starRating === 0) {
    return null
  }
  if (starRating === 1) {
    return (<div> - poor</div>)
  }
}

export default DisplayOverallRating;