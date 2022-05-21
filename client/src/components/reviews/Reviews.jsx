import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Test = styled.div`
  font-size: 16px;
  max-height: 600px;
  max-width: 650px;
  overflow: auto;
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
          <Title onClick={handleMore}>{review.summary === '' ? 'No Title' : review.summary}</Title>
          <Body>{review.body}</Body>
          {review.recommend ? <Recommend>&#10004; I recommend this product</Recommend> : null }
          {review.response ?
           <ResponseBlock>
             <ResponseWord>Response:</ResponseWord>
             <Response>{review.response}</Response>
           </ResponseBlock> :
            null
          }
          <Interactables>
            <HelpfulTag>Was this review helpful?  </HelpfulTag>
            <YesTag>Yes</YesTag>
            <Count>  ({review.helpfulness})</Count>
          </Interactables>
        </ReviewBox>
      )}
    </Test>
  )
}

export default Reviews;