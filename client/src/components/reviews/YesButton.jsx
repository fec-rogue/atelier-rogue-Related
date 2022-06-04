import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PropIdContext } from '../App.jsx';




const YesTag = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;


const YesButton = ({id, count}) => {
  // const {id, setId} = useContext(PropIdContext);
  const [clicked, setClicked] = useState(false);
  const reviewId = id;
  let yesCount = count;



  const handleClick = (e, id) => {
    axios.put('/reviews/helpful', {}, {params: {review_id: id}})
      .then(() => {
        setClicked(true);
      })
      .catch((error) => {
        console.log('there was an error at yesclick');
      })
  };

  if (clicked === false) {
    return (
      <span>
      <YesTag onClick={(e) => {handleClick(e, reviewId)}}>Yes</YesTag>
      <span>  ({yesCount})</span>
    </span>
   )
 } else {
   return (
     <span>
       <span>Yes</span>
       <span>  ({yesCount + 1})</span>
     </span>
   )
 }
}

export default YesButton;