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
  const [count, setCount] = useState(2);


  useEffect(() => {
    axios.get('http://localhost:3000/reviews', {params: {id: 40344, count: count}})
      .then((results) => {
        console.log(results.data.results);
        setReviews(results.data.results);
      })
  }, [count]);

  const handleMore = (e) => {
    console.log('clicked')
    setCount(count + 2);
  }


  return (
    <Test>
      {reviews.map((review) =>
        <ReviewBox>
          <StarDate>
            <section>{review.rating}</section>
            <section>{review.reviewer_name}, {review.date}></section>
          </StarDate>
          <Title onClick={handleMore}>{review.summary}</Title>
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