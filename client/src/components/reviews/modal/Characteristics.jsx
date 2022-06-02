import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import RadioTemplate from './RadioTemplate.jsx';

const Container = styled.div`
  padding-top: 10px;
  `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Characteristics = ({allCharacteristics, setAllCharacteristics}) => {

  // const [properties, setProperties] = useState(['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'])
  const [properties, setProperties] = useState([
    {prop: 'Size', standard: ['Size too small', '1/2 size too small', 'Perfect', '1/2 size too big', 'Size too big']},
    {prop: 'Width', standard: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide']},
    {prop: 'Comfort', standard: ['Unformfortable', 'Slightly Uncomfortable', 'Ok', 'Comfortable', 'Perfect']},
    {prop: 'Quality', standard: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']},
    {prop: 'Length', standard: ['Short', 'Slightly short', 'Perfect', 'Slightly long', 'Long']},
    {prop: 'Fit', standard: ['Tight', 'Slightly tight', 'Perfect', 'Slightly long', 'Long']}
  ])


  const handleSizeClick = (e) => {
    setAllCharacteristics({ ...allCharacteristics, size: Number(e.target.value)})
  }

  return (
    <Container>
      {properties.map((property, index) =>
        <RadioTemplate allCharacteristics={allCharacteristics} setAllCharacteristics={setAllCharacteristics} subject={property} key={index}  />
      )}
    </Container>
  )
}

export default Characteristics;