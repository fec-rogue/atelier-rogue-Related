import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stars from '../stars/Stars.jsx';
import Ratings from './Ratings.jsx';

const Test = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  overflow: auto;
  max-height: 1000px;
  max-width: 1250px;
  `;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


const StarDate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0 20px 0;
`;

const ReviewBox = styled.div`
  border-bottom: 1px solid;
  width: 600px;
  max-height: 300px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 0 0 20px 0;
`;

const Body = styled.div`
padding: 0 0 20px 0;
`;

const Recommend = styled.div`
padding: 0 0 20px 0;
`;

const ResponseBlock = styled.div`

`;

const Response = styled.div`

`;

const ResponseWord = styled.div`

`;

const Interactables = styled.div`
  font-size: 13px;
  padding: 0 0 15px 0;
`;

const HelpfulTag = styled.span`

`;

const YesTag = styled.span`
  text-decoration: underline
`;

const Count = styled.span`

`;

const AddMore = styled.button`
  height: 50px;
  width: 100px;
  margin-left: 690px;
  margin-right: 10px;
  margin-top: 20px;
`;

const AddReview = styled.button`
  height: 50px;
  width: 100px;
  margin-top: 20px;
`;

const Container = styled.div`
  margin: auto;
  width: 60%;
`;



const Reviews = () => {

  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1000);
  const [displayCount, setDisplayCount] = useState(2);


  useEffect(() => {
    axios.get('http://localhost:3000/reviews', {params: {id: 40344, count: count}})
      .then((results) => {
        // console.log(results.data.results);
        setReviews(results.data.results);
      })
  }, [count]);

  const handleMore = (e) => {
    setDisplayCount(displayCount + 2);
  }


  return (
      <Container>
        <Test>
          <Ratings />
          <ReviewContainer>
            {reviews.map((review, index) => {
              if (index < displayCount) {
                return (
                  <ReviewBox key={index}>
                    <StarDate>
                      {Stars(review.rating)}
                      <section>{review.reviewer_name}, {review.date}></section>
                  </StarDate>
                  <Title>{review.summary === '' ? 'No Title' : review.summary}</Title>
                    <Body>{review.body}</Body>
                    {review.recommend ? <Recommend>&#10004; I recommend this product</Recommend> : null }
                    {review.response ?
                    <ResponseBlock>
                      <ResponseWord>Response:</ResponseWord>
                      <Response>{review.response}</Response>
                    </ResponseBlock>
                    : null}
                    <Interactables>
                      <HelpfulTag>Was this review helpful?  </HelpfulTag>
                      <YesTag>Yes</YesTag>
                      <Count>  ({review.helpfulness})</Count>
                    </Interactables>
                  </ReviewBox>
                )
              } else {
                return null;
              }
            })}
          </ReviewContainer>
        </Test>
        <AddMore onClick={handleMore}>See More</AddMore>
        <AddReview>Add a review</AddReview>
      </Container>
  )
}

export default Reviews;