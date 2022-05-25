import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stars from '../stars/Stars.jsx';
import PercentageBars from './PercentageBars.jsx';

const RatingsContainer = styled.div`
  width: 300px;
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

const AverageStars = styled.span`
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
`;

const Bars = styled.div`
  display: flex;
`;



const Ratings = () => {

  const [ratings, setRatings] = useState({});
  const [average, setAverage] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/meta', {params: {id: 40344}})
      .then((results) => {
        const recommends = results.data.recommended;
        const percentage = (Number(recommends.true) / (Number(recommends.false) + Number(recommends.true)) * 100)
        setRatings({ratings: results.data.ratings, percentage: Math.round(percentage) + '%'});
        return results.data.ratings
      })
      .then((ratings) => {
        let average = 0;
        let count = 0;
        const keys = Object.keys(ratings);
        keys.forEach((rating) => {
          average += Number(rating) * Number(ratings[rating]);
          count += Number(ratings[rating]);
        })

        average = (Math.round((average / count) * 4) / 4).toFixed(2);
        setAverage(average);
      })
  }, []);


  return (
    <RatingsContainer>
      <Title>Ratings & Reviews</Title>
      <AverageRating>{average}</AverageRating>
      <AverageStars>
        {Stars(average)}
      </AverageStars>
      <Recommendations>{ratings.percentage} of reviews recommend this product</Recommendations>
      <Bars>
        <StarsContainer>
          <Nstars>1 stars  </Nstars>
          <Nstars>2 stars  </Nstars>
          <Nstars>3 stars  </Nstars>
          <Nstars>4 stars  </Nstars>
          <Nstars>5 stars  </Nstars>
        </StarsContainer>
        <PercentageBars />
      </Bars>

    </RatingsContainer>
  )
}


export default Ratings;