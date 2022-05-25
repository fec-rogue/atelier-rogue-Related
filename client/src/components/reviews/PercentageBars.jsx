import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ComparisonBar from './ComparisonBar.jsx';


const BarContainer = styled.div`

`;


const PercentageBars = () => {

  const [ratings, setRatings] = useState([]);
  const [highest, setHighest] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/meta', {params: {id: 40344}})
      .then((results) => {
        let high = 0;
        let index = 0;
        let array = [];
        let copy = {...results.data.ratings}
        Object.keys(copy).forEach((rating, i) => {
          array.push(Number(copy[rating]));
          if (Number(copy[rating]) > high) {
            high = Number(copy[rating]);
            index = i;
          }
        })
        array.forEach((rating, i) => {
          let object = {}
          object.count = rating;
          array[i] = object;
          if (rating === high) {
            array[i].high = true;
          }
        })
        setRatings(array);
        return high;
      })
      .then((high) => {
        setHighest(high);
      })
  }, [])

  return (
    <BarContainer>
      {ratings.map((rating) => {
        if (rating.count === highest) {
          return (<ComparisonBar percent={100}>&nbsp;</ComparisonBar>)
        } else {
          return (<ComparisonBar percent={(rating.count / highest) * 100}>&nbsp;</ComparisonBar>)
        }
      }
      )}
    </BarContainer>
  )

}

export default PercentageBars;