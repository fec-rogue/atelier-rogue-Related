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
`;

const Bars = styled.div`
  display: flex;
`;

const RatingCount = styled.span`

`;



const Ratings = ({reviews, setReviews, filters, setFilters}) => {
  const [ratings, setRatings] = useState({});
  // const [average, setAverage] = useState(0);
  const {allRatings, setAllAverage} = useContext(PropIdContext);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/reviews/meta', {params: {product_id: 40344}})
  //     .then((results) => {
  //       const recommends = results.data.recommended;
  //       const percentage = (Number(recommends.true) / (Number(recommends.false) + Number(recommends.true)) * 100)
  //       setRatings({ratings: results.data.ratings, percentage: Math.round(percentage) + '%'});
  //       return results.data.ratings
  //     })
  // }, []);

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

    // if (allRatings.ratings['1'] === undefined) {
    //   return (<div>loading</div>)
    // } else {
    // }

    return (
    <RatingsContainer>
      <Title>Ratings & Reviews</Title>
      {/* <AverageRating>{average}</AverageRating> */}
      <AverageStar>
        {/* {Stars(average)} */}
        {AverageStars(allRatings.ratings)}
      </AverageStar>
      <Recommendations>{ratings.percentage} of reviews recommend this product</Recommendations>
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

    </RatingsContainer>
  )
}
}


export default Ratings;