import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stars from '../stars/Stars.jsx';
import Ratings from './Ratings.jsx';
import Relevance from './Relevance.jsx';
import YesButton from './YesButton.jsx';
import ReviewModal from './modal/ReviewModal.jsx';
import dateFormat from 'dateformat';
import { PropIdContext } from '../App.jsx';



const Test = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  overflow: auto;
  max-height: 600px;
  max-width: 1250px;
  margin-bottom: 200px;
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
  max-height: 500px;
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
  text-decoration: underline;
  cursor: pointer;
`;

const Count = styled.span`

`;

const AddMore = styled.button`
  height: 50px;
  width: 100px;
  margin-bottom: 10px;
  align-items: center;
  background-color: #008C75;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #FFF;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  &:hover {
  background: #F6F9FE;
  color: #008C75;
  }
  &:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
  }
  &:focus {
  outline: none;
  border: 2px solid #4285F4;
  }
  &:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  &:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }
  &:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  &:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }
  &:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
`;

const AddReview = styled.button`
  border-radius: 24px;
  background-color: #008C75;
  align-items: center;
  background-color: #008C75;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #FFF;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
  &:hover {
  background: #F6F9FE;
  color: #008C75;
  }
  &:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
  }
  &:focus {
  outline: none;
  border: 2px solid #4285F4;
  }
  &:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  &:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
  }
  &:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
  }
  &:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
  }
  &:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
`;

const Container = styled.div`
  display: flex;
  // justify-content: center;
  justify-content: space-between;
  flex-direction: row;
  margin: auto;
  width: 1400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 20px;
`;

const Pictures = styled.img`
  height: 50px;
  margin-right: 10px;
`;


const Reviews = () => {

  const {id, setId} = useContext(PropIdContext);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1000);
  const [displayCount, setDisplayCount] = useState(2);
  const [filters, setFilters] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false
  });
  const [filterState, setFilterState] = useState(false);
  const [sort, setSort] = useState("Helpfulness");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get('/reviews', {params: {id: id, count: count}})
      .then((results) => {
        if (sort === "Newest") {
          results.data.results.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        setReviews(results.data.results);
        return results.data.results
      })
      .then((result) => {
        const filter = Object.keys(filters);
        let filterExists = false;
        let filterArray = [];
        let results = [];
        let object = {};
        for (let value of filter) {
          if (filters[value] === true) {
            filterArray.push(value);
            filterExists = true;
          }
        }
        if (filterExists) {
          result.forEach((review) => {
            for (let value of filterArray) {
              if (review.rating === Number(value)) {
                results.push(review);
              }
            }
          })
          setReviews(results);
        }
        object.filterArray = filterArray;
        object.filterState= filterExists;
        return object;
      })
      .then((object) => {
        setFilterState(object);
      })
  }, [filters, sort, id]);

  const handleMore = (e) => {
    setDisplayCount(displayCount + 2);
  }

  const handleYesClick = (e, id) => {
    axios.put('/reviews/helpful', {}, {params: {review_id: id}})
      .then((response) => {

      })
      .catch((error) => {
        console.log('there was an error at yesclick');
      })
    // axios.put('http://localhost:3000/reviews/helpful', {params: {review_id: id}})
    //   .then(() => {
    //     console.log(this should work);
    //   })
  }

  const handleAdd = (e) => {
    setModal(true);
  }


  return (
    <Container>
      {modal ? <ReviewModal setModal={setModal} /> : null}
      <Ratings reviews={reviews} setReviews={setReviews} filters={filters} setFilters={setFilters} filterState={filterState} />
      <div>
        <Relevance sort={sort} setSort={setSort} />
        <Test>
          <ReviewContainer>
            {reviews.map((review, index) => {
              // console.log(review);
              if (index < displayCount) {
                return (
                  <ReviewBox key={index}>
                    <StarDate>
                    {Stars(review.rating)}
                    <section>{review.reviewer_name}&nbsp;&nbsp;{dateFormat(review.date, "mmmm, dS, yyyy")}</section>
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
                      {review.photos.map((photo, index) =>
                        <Pictures src={review.photos[index].url} key={index}></Pictures>
                      )}
                    <Interactables>
                      <HelpfulTag>Was this review helpful?  </HelpfulTag>
                      <YesButton id={review.review_id} count={review.helpfulness} />
                    </Interactables>
                  </ReviewBox>
                )
              }
            })}
          </ReviewContainer>
        </Test>
      </div>
      <ButtonContainer>
        <AddMore onClick={handleMore}>See More</AddMore>
        <AddReview onClick={handleAdd}>Add a review</AddReview>
      </ButtonContainer>
    </Container>
  )
}

export default Reviews;