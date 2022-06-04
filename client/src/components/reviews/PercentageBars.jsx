import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ComparisonBar from './ComparisonBar.jsx';
import { PropIdContext } from '../App.jsx';



const BarContainer = styled.div`

`;


const PercentageBars = () => {

  const {id, setId} = useContext(PropIdContext);
  const [ratings, setRatings] = useState([]);
  const [highest, setHighest] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/reviews/meta', {params: {product_id: id}})
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
  }, [id])

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