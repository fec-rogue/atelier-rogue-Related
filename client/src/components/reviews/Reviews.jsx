import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Test = styled.div`
  font-size: 16px;
`;

const StarDate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0 20px 0;
`;

const ReviewBox = styled.div`
  border-bottom: 1px solid;
  width: 600px;
  height: 300px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Body = styled.div`

`;

const HelpfulTag = styled.span`

`;

const YesTag = styled.span`

`;

const Count = styled.span`

`;

const Reviews = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/?id=40344')
      .then((results) => {
        console.log(results.data.results);
        setReviews(results.data.results);
      })
  }, []);


  return (
    <Test>
      {reviews.map((review) =>
        <ReviewBox>
          <StarDate>
            <section>{review.rating}</section>
            <section>{review.reviewer_name}, {review.date}></section>
          </StarDate>
          <Title>{review.summary}</Title>
          <Body>{review.body}</Body>
          <HelpfulTag>Helpful? </HelpfulTag>
          <YesTag>Yes </YesTag>
          <Count>{review.helpfulness}</Count>
        </ReviewBox>
      )}
    </Test>
  )
}

export default Reviews;