import React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';


const RadioContainer = styled.div`
  display: flex;
  // justify-content: space-between;
  flex-direction: row;
  padding: 10px 10px 0 10px;
`;

const Subject = styled.span`
  display: flex;
  width: 10%;
  align-items: center;
  `;

const CheckContainer = styled.span`
display: flex;
flex-direction: column;
justify-content: center;
width: ${90 / 5}%;
`;

const Radio = styled.input`
  margin: auto;
  width: 100%;
`;

const RadioLabel = styled.label`
display: flex;
justify-content: center;
 margin: auto;
 font-size: 13px;
 width: 100%;
 `;
//  width: ${5 / 90}%;

const RadioTemplate = ({allCharacteristics, setAllCharacteristics, subject}) => {

  const handleClick = (e, subjectLine) => {
    // if (subjectLine === 'Size') {
    //   setAllCharacteristics({ ...allCharacteristics, size: Number(e.target.value)})
    // }
    // if (subjectLine === 'Width') {
    //   setAllCharacteristics({ ...allCharacteristics, width: Number(e.target.value)})
    // }
    // if (subjectLine === 'Comfort') {
    //   setAllCharacteristics({ ...allCharacteristics, comfort: Number(e.target.value)})
    // }
    // if (subjectLine === 'Quality') {
    //   setAllCharacteristics({ ...allCharacteristics, quality: Number(e.target.value)})
    // }
    // if (subjectLine === 'Length') {
    //   setAllCharacteristics({ ...allCharacteristics, length: Number(e.target.value)})
    // }
    // if (subjectLine === 'Fit') {
    //   setAllCharacteristics({ ...allCharacteristics, fit: Number(e.target.value)})
    // }
  }

  return (
    <RadioContainer>
    <Subject>{subject.prop}</Subject>
    <CheckContainer>
      <Radio type="radio" id="for1" value="1" name={subject.prop} onClick={(e) => {handleClick(e, subject.prop)}}></Radio>
      <RadioLabel htmlFor="for1">{subject.standard[0]}</RadioLabel>
    </CheckContainer>
    <CheckContainer>
      <Radio type="radio" id="for2" value="2" name={subject.prop} onClick={(e) => {handleClick(e, subject.prop)}}></Radio>
      <RadioLabel htmlFor="for2">{subject.standard[1]}</RadioLabel>
    </CheckContainer>
    <CheckContainer>
      <Radio type="radio" id="for3" value="3" name={subject.prop} onClick={(e) => {handleClick(e, subject.prop)}}></Radio>
      <RadioLabel htmlFor="for3">{subject.standard[2]}</RadioLabel>
    </CheckContainer>
    <CheckContainer>
      <Radio type="radio" id="for4" value="4" name={subject.prop} onClick={(e) => {handleClick(e, subject.prop)}}></Radio>
      <RadioLabel htmlFor="for4">{subject.standard[3]}</RadioLabel>
    </CheckContainer>
    <CheckContainer>
      <Radio type="radio" id="for5" value="5" name={subject.prop} onClick={(e) => {handleClick(e, subject.prop)}}></Radio>
      <RadioLabel htmlFor="for5">{subject.standard[4]}</RadioLabel>
    </CheckContainer>
  </RadioContainer>
  )
}

export default RadioTemplate;