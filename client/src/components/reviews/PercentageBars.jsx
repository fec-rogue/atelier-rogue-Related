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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews/meta', {params: {product_id: 40351}})
         .then((results) => {
           let total = 0;
           let array = [];
           let copy = {...results.data.ratings};
           Object.keys(copy).forEach((rating) => {
             total += Number(copy[rating]);
             array.push(Number(copy[rating]));
           })
           setRatings(array);
           return total;
         })
         .then((total) => {
           setTotal(total);
         })
  }, [])

  return (
    <BarContainer>
      {ratings.map((rating, index) => {
        return (
          <ComparisonBar percent={(rating/total) * 100} key={index}>&nbsp;</ComparisonBar>
        )
      }
      )}
    </BarContainer>
  )
}

export default PercentageBars;