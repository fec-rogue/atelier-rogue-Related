import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import DynamicSingleStar from './DynamicSingleStar.jsx';


const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ResetRating = styled.button`
  display: flex;
  justify-content: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const DynamicStars = ({setReviewStar, setReset}) => {

  const [ratingClicked, setRatingClicked] = useState(false);

  const [ratings, setRatings] = useState([
    {star: 1, rating: 0},
    {star: 2, rating: 0},
    {star: 3, rating: 0},
    {star: 4, rating: 0},
    {star: 5, rating: 0}
  ]);

  const handleMouseEnter = (e, currentStar) => {
    if (currentStar === 1) {
      setRatings([
        {star: 1, rating: 100},
        {star: 2, rating: 0},
        {star: 3, rating: 0},
        {star: 4, rating: 0},
        {star: 5, rating: 0}
      ])
    }
    if (currentStar === 2) {
      setRatings([
        {star: 1, rating: 100},
        {star: 2, rating: 100},
        {star: 3, rating: 0},
        {star: 4, rating: 0},
        {star: 5, rating: 0}
      ])
    }
    if (currentStar === 3) {
      setRatings([
        {star: 1, rating: 100},
        {star: 2, rating: 100},
        {star: 3, rating: 100},
        {star: 4, rating: 0},
        {star: 5, rating: 0}
      ])
    }
    if (currentStar === 4) {
      setRatings([
        {star: 1, rating: 100},
        {star: 2, rating: 100},
        {star: 3, rating: 100},
        {star: 4, rating: 100},
        {star: 5, rating: 0}
      ])
    }
    if (currentStar === 5) {
      setRatings([
        {star: 1, rating: 100},
        {star: 2, rating: 100},
        {star: 3, rating: 100},
        {star: 4, rating: 100},
        {star: 5, rating: 100}
      ])
    }
  }

  const handleMouseLeave = (e) => {
    setRatings([
      {star: 1, rating: 0},
      {star: 2, rating: 0},
      {star: 3, rating: 0},
      {star: 4, rating: 0},
      {star: 5, rating: 0}
    ])
  }

  const handleRatingReset = (e) => {
    setRatingClicked(false);
    setRatings([
      {star: 1, rating: 0},
      {star: 2, rating: 0},
      {star: 3, rating: 0},
      {star: 4, rating: 0},
      {star: 5, rating: 0}
    ])
    setReset(false);
  }

  const handleClick = (e, currentStar) => {
    setReviewStar(currentStar);
    setRatingClicked(true);
    setReset(true);
  }


  if (ratingClicked) {
    return (
      <div>
        <Container>
          {ratings.map((singleStar, index) =>
            <DynamicSingleStar rating={singleStar.rating} key={index}>
            ★
            </DynamicSingleStar>
          )}
        </Container>
        <ResetRating onClick={handleRatingReset}>Reset</ResetRating>
      </div>
    )
  } else {
    return(
      <div>
        <Container>
          {ratings.map((singleStar, index) =>
          <DynamicSingleStar rating={singleStar.rating} key={index} onMouseEnter={(e) => {handleMouseEnter(e, singleStar.star)}} onMouseLeave={handleMouseLeave} onClick={(e) => {handleClick(e, singleStar.star)}}>
          ★
          </DynamicSingleStar>
        )}
        </Container>
        <ResetRating onClick={handleRatingReset}>Reset</ResetRating>
      </div>
  )
}
}

export default DynamicStars;