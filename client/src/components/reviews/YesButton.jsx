import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const YesTag = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;


const YesButton = ({id, count}) => {
  const [clicked, setClicked] = useState(false);
  const reviewId = id;
  let yesCount = count;



  const handleClick = (e, id) => {
    axios.put('http://localhost:3000/reviews/helpful', {}, {params: {review_id: id}})
      .then(() => {
        setClicked(true);
      })
      .catch((error) => {
        console.log('there was an error at yesclick');
      })
  };

  if (clicked === false) {
    console.log('this should show up first')
    return (
      <span>
      <YesTag onClick={(e) => {handleClick(e, reviewId)}}>Yes</YesTag>
      <span>  ({yesCount})</span>
    </span>
   )
 } else {
   console.log('this should show up later')
   return (
     <span>
       <span>Yes</span>
       <span>  ({yesCount + 1})</span>
     </span>
   )
 }
}

export default YesButton;