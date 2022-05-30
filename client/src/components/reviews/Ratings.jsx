import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stars from '../stars/Stars.jsx';
import PercentageBars from './PercentageBars.jsx';
import {PropIdContext} from '../App.jsx';
import AverageStars from '../stars/AverageStars.jsx';

const RatingsContainer = styled.div`
  width: 300px;
  padding-right: 50px;
`;

const Title = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
`;

const AverageRating = styled.div`
  display: inline-block;
  font-size: 30px;
  padding-right: 10px;
`;

const AverageStar = styled.span`
  display: inline-block;
  position: relative;
  top: -5px;
`;

const Recommendations = styled.div`
  padding-top: 20px;
  font-size: 16px;
  padding-bottom: 20px;
`;

const StarsContainer = styled.div`
padding-right: 10px;
`;

const Nstars = styled.div`
  padding-bottom: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Bars = styled.div`
  display: flex;
`;

const RatingCount = styled.span`

`;

const Filter = styled.div`
padding-bottom: 10px;
`;

const FilterBy = styled.div`
padding-bototm: 7px;
`;


const Ratings = ({reviews, setReviews, filters, setFilters, filterState}) => {
  const {allRatings, setAllAverage} = useContext(PropIdContext);

  const average = (ratings) => {
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

  const displayAverage = (ratings) => {
    let average = 0;
    let count = 0;
    const keys = Object.keys(ratings);

    keys.forEach((rating) => {
      average += Number(rating) * Number(ratings[rating]);
      count += Number(ratings[rating]);
    })

    average = (Math.round((average / count) * 4) / 4).toFixed(1);

    return average;
  }

  const click1Star = (e) => {
    let newState = {...filters};
    newState['1'] = !newState['1'];
    setFilters(newState);
  };

  const click2Star = (e) => {
    let newState = {...filters};
    newState['2'] = !newState['2'];
    setFilters(newState);
  };

  const click3Star = (e) => {
    let newState = {...filters};
    newState['3'] = !newState['3'];
    setFilters(newState);
  };

  const click4Star = (e) => {
    let newState = {...filters};
    newState['4'] = !newState['4'];
    setFilters(newState);
  };

  const click5Star = (e) => {
    let newState = {...filters};
    newState['5'] = !newState['5'];
    setFilters(newState);
  };

  if (allRatings.ratings === undefined) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <RatingsContainer>
        <Title>Ratings & Reviews</Title>
        <AverageRating>{displayAverage(allRatings.ratings)}</AverageRating>
        <AverageStar>
          {AverageStars(allRatings.ratings)}
        </AverageStar>
        <Recommendations>{allRatings.percentage} of reviews recommend this product</Recommendations>
        <Bars>
          <StarsContainer>
            <Nstars onClick={click1Star}>1 stars  </Nstars>
            <Nstars onClick={click2Star}>2 stars  </Nstars>
            <Nstars onClick={click3Star}>3 stars  </Nstars>
            <Nstars onClick={click4Star}>4 stars  </Nstars>
            <Nstars onClick={click5Star}>5 stars  </Nstars>
          </StarsContainer>
          <PercentageBars />
        </Bars>
        {filterState.filterState ?
          <div>
            <Filter>Filtering reviews by :</Filter>
            {filterState.filterArray.map((value, index) =>
              <FilterBy key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{value} star reviews</FilterBy>
            )}
          </div>
          : null
        }
      </RatingsContainer>
    )
  }
}


export default Ratings;