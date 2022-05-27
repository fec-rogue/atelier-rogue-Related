import React from 'react';
import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {PropIdContext} from '../App.jsx';
import axios from 'axios';

const Container = styled.div`
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const SortBy = styled.span`
  display: flex;
`;


const Relevance = ({sort, setSort}) => {

  const {allRatings, setAllRatings} =  useContext(PropIdContext);

  const total = (ratings) => {
    const ratingArray = Object.keys(ratings);
    let count = 0;
    ratingArray.forEach((value) => {
      count += Number(ratings[value]);
    })
    return count;
  }

  const handleChange = (e) => {
    setSort(e.target.value);
  }

  if (allRatings.ratings === undefined) {
    return null;
  } else {
    return (
      <Container>
        {total(allRatings.ratings)} ratings
        <div>
          <span>Sort by</span>
          <select value={sort} onChange={handleChange}>
            <option value="Helpfulness">Helpfulness</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </Container>
    )
  }
}

export default Relevance;